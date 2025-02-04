import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      console.log('Retrieved token:', token); // Log the token retrieved from localStorage

      if (token) {
        try {
          // Decode the token to check its validity
          const payload = JSON.parse(atob(token.split('.')[1]));
          console.log('Decoded token payload:', payload);

          const expirationTime = payload.exp * 1000; // Convert to milliseconds
          console.log('Token expiration time:', new Date(expirationTime));

          if (Date.now() >= expirationTime) {
            // Token has expired
            console.warn('Token has expired');
            localStorage.removeItem('token');
            setIsAuthenticated(false);
            navigate('/login');
          } else {
            setIsAuthenticated(true);
          }
        } catch (error) {
          console.error('Invalid token format:', error);
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          navigate('/login');
        }
      } else {
        console.warn('No token found');
        setIsAuthenticated(false);
        navigate('/login');
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const login = (token) => {
    console.log('Storing token:', token); // Log the token being stored
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    console.log('Logging out. Removing token.'); // Log logout action
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
