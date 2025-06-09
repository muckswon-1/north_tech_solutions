import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { checkAuthStatus, selectIsAuthenticated, selectUser } from '../../features/auth/authSlice';

const RequireAuth = ({ children }) => {
  
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  
  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
