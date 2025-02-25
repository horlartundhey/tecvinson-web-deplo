import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, verifyLoginToken } from '../redux/authSlice';
import { store } from '../redux/store';

const VerifyLogin = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const state = store.getState().auth;
  console.log({state});

  
  useEffect(() => {

    if (token) {
      dispatch(setToken(token)); // Save token to Redux state
    }

    const verifyToken = async () => {
      try {
        const result = await dispatch(verifyLoginToken(token)).unwrap();
        if (result) {
          navigate('/dashboard');
        }
      } catch (error) {
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    verifyToken();
  }, [token, dispatch, navigate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        {error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <>
            <h2 className="text-xl mb-4">Verifying your login...</h2>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyLogin;