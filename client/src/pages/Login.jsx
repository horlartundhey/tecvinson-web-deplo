import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendOTP, verifyOTP, clearError, resetOtpState } from '../redux/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get state from Redux
  const { loading, error, isAuthenticated, otpSent, otpEmail } = useSelector(state => state.auth);
  
  // Local state for form inputs
  const [email, setEmail] = useState(otpEmail || '');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');

  // If user is already authenticated, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const isTecvinsonEmail = (email) => {
    const domain = email.split('@')[1];
    return ['tecvinsonacademy.com', 'tecvinson.com'].includes(domain);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setMessage('');
    dispatch(clearError());

    if (!isTecvinsonEmail(email)) {
      dispatch({ 
        type: 'auth/sendOTP/rejected', 
        payload: { message: 'OTP is only available for Tecvinson email domains' } 
      });
      return;
    }

    dispatch(sendOTP(email))
      .unwrap()
      .then(() => {
        setMessage('OTP has been sent to your email');
      })
      .catch(() => {
        // Error is handled by the reducer
      });
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setMessage('');
    dispatch(clearError());

    dispatch(verifyOTP({ email, otp }))
      .unwrap()
      .then(() => {
        setMessage('Login successful');
        // Redirect happens automatically via the useEffect
      })
      .catch(() => {
        // Error is handled by the reducer
      });
  };

  const handleChangeEmail = () => {
    setOtp('');
    setMessage('');
    dispatch(clearError());
    dispatch(resetOtpState());
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="bg-white p-8 rounded-2xl shadow-[0px_4px_15px_4px_rgba(0,0,0,0.06)] w-full max-w-lg">
        <h2 className="text-[32px] font-semibold mb-4 text-center">Welcome!</h2>
        <p className='text-[16px] mb-10 text-center'>
          {!otpSent ? 'Enter Your Email' : 'Enter OTP'}
        </p>
        
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

        <form onSubmit={!otpSent ? handleSendOtp : handleVerifyOtp}>
          {!otpSent ? (
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
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>
          ) : (
            <div className="mb-4">
              <label htmlFor="otp" className="block font-medium mb-2">
                OTP
              </label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                required
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                disabled={loading}
              />
            </div>
          )}

          <button
            type="submit"
            className={`bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 w-full ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading 
              ? 'Please wait...' 
              : !otpSent 
                ? 'Send OTP' 
                : 'Verify OTP'
            }
          </button>

          {otpSent && (
            <button
              type="button"
              onClick={handleChangeEmail}
              className="mt-4 text-blue-500 hover:underline w-full text-center"
              disabled={loading}
            >
              Change Email
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;