import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import api from '../axios';

const SessionMonitor = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) return;

    const checkSession = async () => {
      try {
        await api.get('/auth/check-session', {
          _silentRefresh: true,
        });
      } catch (err) {
        // Let axios handle 401 and token refresh, do not logout here
        console.warn("Session check failed:", err.message);
      }
    };

    const interval = setInterval(checkSession, 240000); // Every 4 minutes
    return () => clearInterval(interval);
  }, [isAuthenticated]);

  return null;
};

export default SessionMonitor;
