import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-10 px-4 sm:px-6 lg:px-4">
      <NavBar />
    </header>
  );
};

export default Header;
