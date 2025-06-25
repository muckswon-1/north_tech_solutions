import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector, } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './app/store';

import Layout from './components/Layout/Layout';

// Import your page components
import FeaturesSection from './components/Layout/FeaturesSection';
import ScheduleMeetingSection from './components/google-meeting/ScheduleMeetingSection';
import ProductDetailsPage from './components/products/ProductDetailsPage';
import ProductCatalogPage from './components/products/ProductCatalogPage';

import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import RequireAuth from './components/auth/RequireAuth';
import { Toaster } from 'react-hot-toast';
import UserDashboard from './components/profile/UserDashboard';
import InquiryDraftsPage from './components/inquiryDrafts/InquiryDraftsPage';
import { selectUserInquiryDrafts, setUserInquiryDrafts } from './features/userInquiryDrafts/userInquiryDraftSlice';
import { selectUser } from './features/auth/authSlice';
import { fetchUserInquiryDrafts } from './features/userInquiryDrafts/userInquiryDraftThunks';



function App() {
  // Create a component to wrap routes and dispatch the auth check
  

  const AppContent = () => {

    const userInquiryDrafts = useSelector(selectUserInquiryDrafts);
  const authUser = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserInquiryDrafts(authUser?.id))
    dispatch(setUserInquiryDrafts(userInquiryDrafts));
  },[dispatch]);
  

    return (
      <Router>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <FeaturesSection />
                  <ScheduleMeetingSection />
                </>
              }
            />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/products" element={<ProductCatalogPage />} />
            <Route path="/products/:id" element={<ProductDetailsPage />} />
            <Route
              path="/:id/my-inquiries"
              element={
                <RequireAuth>
                  <InquiryDraftsPage />
                </RequireAuth>
              } />
          
            <Route path='/:id/profile' element={
              <RequireAuth>
                <UserDashboard />
              </RequireAuth>
            } />
          </Routes>
        </Layout>
      </Router>
    );
  };

  return (
    <Provider store={store}>
     
      <AppContent /> {/* Render the new wrapper component */}
     
      <Toaster position="top-right" reverseOrder={false} />
    </Provider>
  );
}

export default App;
