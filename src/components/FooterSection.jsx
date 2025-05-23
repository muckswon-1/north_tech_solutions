const FooterSection = () => {
    return (
      <footer className="bg-gray-800 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Copyright Information */}
          <p className="text-sm">
            &copy; {new Date().getFullYear()} NorthTechSolutions. All rights reserved.
          </p>
        </div>
      </footer>
    );
  };
  
  export default FooterSection;