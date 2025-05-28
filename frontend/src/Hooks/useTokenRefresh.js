import { useEffect } from 'react';
import api from '../axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from "../Store/authSlice";

const useTokenRefresh = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.isAuthenticated || !auth.user) return; 


    return () => {
    };
  }, [auth.isAuthenticated, auth.user, dispatch, navigate]);
};

export default useTokenRefresh;