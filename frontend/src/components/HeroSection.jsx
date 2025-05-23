const HeroSection = () => {
    return (
      <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Logo and Company Name */}
          <div className="flex flex-col items-center justify-center mb-8">
            {/* Placeholder Logo */}
            <svg
              className="w-16 h-16 mx-auto mb-4"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24" r="20" fill="white" />
              <path
                d="M14 24C14 28.4183 17.5817 32 22 32C26.4183 32 30 28.4183 30 24C30 19.5817 26.4183 16 22 16C17.5817 16 14 19.5817 14 24Z"
                fill="#007BFF"
              />
              <path
                d="M22 28C23.6569 28 25 26.6569 25 25C25 23.3431 23.6569 22 22 22C20.3431 22 19 23.3431 19 25C19 26.6569 20.3431 28 22 28Z"
                fill="#FFC107"
              />
            </svg>
            {/* Company Name */}
            <h2 className="text-2xl font-bold text-white">NorthTechSolutions</h2>
          </div>
  
          {/* Main Content */}
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Your Trusted B2B Wholesale Partner</h1>
          <p className="text-lg sm:text-xl mb-8">
            From phones to transformers, we adapt to your business needs. Schedule a meeting today!
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