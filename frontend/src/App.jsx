import './App.css';
import FeaturesSection from './components/Layout/FeaturesSection';
import ScheduleMeetingSection from './components/ScheduleMeeting/ScheduleMeetingSection';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetailsPage from './pages/ProductDetailsPage';
import ProductCatalogPage from './pages/ProductCatalogPage';
import Layout from './components/Layout/Layout';
import { InquiryProvider, InquiryContext } from './context/InquiryContext';
import InquiryPage from './pages/InquiryPage';
import { Toaster } from 'react-hot-toast';

function App() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  return (
    <InquiryProvider>
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

            <Route path="/products" element={<ProductCatalogPage />} />
            <Route path="/products/:id" element={<ProductDetailsPage />} />
            <Route path="/inquiry" element={<InquiryPage />} />
          </Routes>
        </Layout>
      </Router>
      <Toaster position="top-right" reverseOrder={false} />
    </InquiryProvider>
  );
}

export default App;
