import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { selectUser } from '../../features/auth/authSlice';



const RequireAdmin = ({children}) => {
   const location = useLocation();
   const user = useSelector(selectUser);


   const isAdmin = user?.role === 'admin';

   if(!user || !isAdmin) {
    return <Navigate to="/unauthorized" state={{from: location}} replace />
   }


   return children
}

export default RequireAdmin;
