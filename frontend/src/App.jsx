import './App.css';
import FeaturesSection from './components/Layout/FeaturesSection';
import ScheduleMeetingSection from './components/ScheduleMeeting/ScheduleMeetingSection';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductDetailsPage from './components/ProductCatalog/ProductDetailsPage';
import ProductCatalogPage from './components/ProductCatalog/ProductCatalogPage';
import Layout from './components/Layout/Layout';

function App() {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  console.log(backendUrl);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={
            <>
             <FeaturesSection />
             <ScheduleMeetingSection />
            
            </>
          } />

          <Route path="/products" element={<ProductCatalogPage />} />
          <Route path="/products/:id" element={<ProductDetailsPage />} />
          
        </Routes>
      </Layout>
    </Router>

  );
}

export default App;
