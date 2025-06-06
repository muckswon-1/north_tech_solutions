import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import inquiryReducer from '../features/inquiry/inquirySlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    inquiry: inquiryReducer,
  },
});
