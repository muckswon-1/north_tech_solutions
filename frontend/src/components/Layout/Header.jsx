import React from 'react';
import { Link } from 'react-router-dom';


const Header = () => {
    return (
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">Mucks Won B2B</h1>
          <nav>
            <Link to="/" className="px-4 hover:underline">Home</Link>
            <Link to="/products" className="px-4 hover:underline">Products</Link>
            {/* Add more links as needed */}
          </nav>
        </div>
      </header>
    );
  };
  
  export default Header;
  
