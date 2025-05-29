const FeaturesSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Why Choose Us?
        </h2>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1: Wide Range of Products */}
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <svg
              className="w-12 h-12 mx-auto text-blue-600 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            <h3 className="text-xl font-semibold mb-2">
              Wide Range of Products
            </h3>
            <p className="text-gray-600">
              From electronics to industrial equipment, we have you covered.
            </p>
          </div>

          {/* Feature 2: Flexible Solutions */}
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <svg
              className="w-12 h-12 mx-auto text-blue-600 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <h3 className="text-xl font-semibold mb-2">Flexible Solutions</h3>
            <p className="text-gray-600">
              Tailored services to meet your unique business requirements.
            </p>
          </div>

          {/* Feature 3: Expert Support */}
          <div className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300">
            <svg
              className="w-12 h-12 mx-auto text-blue-600 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
            <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
            <p className="text-gray-600">
              Dedicated team to assist you every step of the way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
