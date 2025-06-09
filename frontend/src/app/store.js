import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import inquiryReducer from '../features/inquiry/inquirySlice';
import productsReducer from '../features/products/productSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
    inquiry: inquiryReducer,
    products: productsReducer
  },
});
