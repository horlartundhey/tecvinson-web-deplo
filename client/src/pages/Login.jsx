import React, { useState } from 'react';
import axios from 'axios';
import { store } from '../redux/store';

const Login = () => {
  const [email, setEmail] = useState('');
  const [uniqueCode, setUniqueCode] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

   const state = store.getState().auth;
    console.log({state});

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      const response = await axios.post('https://tecvinson-web-server.vercel.app/api/initiate', {
        email,
        uniqueCode
      });
      
      setMessage('If your email and code are valid, you will receive a login link shortly.');
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="bg-white p-8 rounded-2xl shadow-[0px_4px_15px_4px_rgba(0,0,0,0.06)] w-full max-w-lg">
        <h2 className="text-[32px] font-semibold mb-4 text-center">Welcome!</h2>
        <p className='text-[16px] mb-10 text-center'>Enter your email and unique code.</p>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            {message}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="uniqueCode" className="block font-medium mb-2">
              Unique Code
            </label>
            <input
              type="text"
              id="uniqueCode"
              value={uniqueCode}
              onChange={(e) => setUniqueCode(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 w-full"
          >
            Send Login Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;