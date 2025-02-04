import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyLoginToken } from '../redux/authSlice';

const VerifyLogin = () => {
  const { token } = useParams(); // Extract token from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(state => state.auth);

  console.log('Frontend token:', token); // Log the token for debugging

  useEffect(() => {
    const verifyToken = async () => {
      const result = await dispatch(verifyLoginToken(token)); // Dispatch the token verification action
      if (verifyLoginToken.fulfilled.match(result)) {
        navigate('/dashboard'); // Redirect to dashboard on success
      } else {
        setTimeout(() => navigate('/login'), 3000); // Redirect to login on failure
      }
    };

    if (token) {
      verifyToken(); // Call the verification function if token exists
    }
  }, [token, dispatch, navigate]);

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        {error ? (
          <div className="text-red-600">
            <p>{error}</p>
            <p className="mt-2 text-sm">Redirecting to login page...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Verifying your login...</h2>
            {loading && (
              <div className="flex justify-center">
                <div className="w-6 h-6 border-2 border-t-blue-500 border-blue-200 rounded-full animate-spin"></div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyLogin;