import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import productsReducer from '../features/products/productSlice'
import usersReducer from '../features/users/usersSlice';
import uploadsReducer from '../features/upload/uploadSlice'
import companyReducer from '../features/company/companySlice'
import userInquiryDraftsReducer from '../features/userInquiryDrafts/userInquiryDraftSlice'



export default configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    products: productsReducer,
    uploads: uploadsReducer,
    company: companyReducer,
    userInquiryDrafts: userInquiryDraftsReducer,
  },
});
