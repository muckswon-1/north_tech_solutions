import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import inquiryReducer from '../features/inquiry/inquirySlice';
import productsReducer from '../features/products/productSlice'
import usersReducer from '../features/users/usersSlice';
import uploadsReducer from '../features/upload/uploadSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    inquiry: inquiryReducer,
    products: productsReducer,
    uploads: uploadsReducer
  },
});
