import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import sokoniLogo from '../../assets/logo.png';

const HeroSection = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 px-4 sm:px-6 lg:px-8">
      {/* Navigation */}
      <NavBar />

      {/* Hero Content */}

      <div className="max-w-7xl mx-auto text-center">
        {/* Logo and Company Name */}
        <div className="flex flex-col items-center justify-center mb-8">
          {/* Placeholder Logo */}
          <div className="flex justify-center items-center mt-4">
            <Link to="/">
              <img
                src={sokoniLogo}
                alt="Sokoni Logo"
                className="h-20 w-20 md:h-24 md:w-24 rounded-full object-cover shadow-lg hover:opacity-90 transition-opacity"
              />
            </Link>
          </div>
        </div>

        {/* Main Content */}
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Your Trusted B2B Wholesale Partner
        </h1>
        <p className="text-lg sm:text-xl mb-8">
          From phones to transformers, we adapt to your business needs. Schedule
          a meeting today!
        </p>
        <a
          href="#schedule-meeting"
          className="inline-block bg-white text-blue-600 font-semibold py-3 px-6 rounded-full shadow-md hover:bg-gray-100 transition duration-300"
        >
          Schedule a Meeting
        </a>
      </div>
    </header>
  );
};

export default HeroSection;
