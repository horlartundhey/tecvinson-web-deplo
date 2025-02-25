import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from './authSlice';

export const useInactivityCheck = () => {
  const dispatch = useDispatch();
  const lastActivity = useSelector(state => state.auth.lastActivity);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) return;

    const checkInactivity = () => {
      const now = Date.now();
      const inactiveTime = now - lastActivity;
      const twoHours = 2 * 60 * 60 * 1000;

      if (inactiveTime > twoHours) {
        dispatch(logoutUser());
      }
    };

    const interval = setInterval(checkInactivity, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [lastActivity, isAuthenticated, dispatch]);
};