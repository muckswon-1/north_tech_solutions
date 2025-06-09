import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './app/store';
import { checkAuthStatus, newAccessToken, selectIsAuthenticated } from './features/auth/authSlice'; // Import the new thunk
import Layout from './components/Layout/Layout';

// Import your page components
import FeaturesSection from './components/Layout/FeaturesSection';
import ScheduleMeetingSection from './components/ScheduleMeeting/ScheduleMeetingSection';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProductCatalogPage from './pages/ProductCatalogPage';
import InquiryPage from './pages/InquiryPage';
import LoginForm from './components/user/LoginForm';
import RegisterForm from './components/user/RegisterForm';
import RequireAuth from './components/user/RequireAuth';
import { Toaster } from 'react-hot-toast';
import { useLocation } from 'react-router-dom';


function App() {
  // Create a component to wrap routes and dispatch the auth check
  const AppContent = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

  // useEffect(() => {
   
  //     dispatch(checkAuthStatus());
    
  // }, [dispatch, isAuthenticated]);

  

  
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
              path="/inquiry"
              element={
                <RequireAuth>
                  <InquiryPage />
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
