import { Link, useLocation, useNavigate } from 'react-router-dom';
import {  useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, selectIsAuthenticated, selectUser } from '../../features/auth/authSlice'; // Import the async thunk
import sokoniLogo from '../../assets/logo.png';


const NavBar = () => {
  //use redux toolkit to access inquiry items
  const { inquiryItems } = useSelector((state) => state.inquiry);
  const currentPath = useLocation().pathname;
  const [isSticky, setIsSticky] = useState(false);
  const navbarRef = useRef(null);
  const [navbarBottom, setNavbarBottom] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
const sessionUser = useSelector(selectUser);
  const [showLogoutButton, setShowLogoutButton] = useState(false);

  
  const handleLogoutButtonClick = async () => {
    

    try {

      dispatch(logoutUser()).unwrap();
      navigate('/login');
      setIsMenuOpen(false); // Close mobile menu if open
    
    } catch (error) {
      console.log('Login failed',error);
    }
     
  };

  useEffect(() => {
    
     if(sessionUser && isAuthenticated) {
      setShowLogoutButton(isAuthenticated);
     }else{
      navigate('/login');
      setShowLogoutButton(false);
     }
   
  }, [isAuthenticated, sessionUser]);


  useEffect(() => {
    const navbar = navbarRef.current;

    if (navbar) {
      const rect = navbar.getBoundingClientRect();
      const scrollTop = window.screenY || window.pageYOffset;
      setNavbarBottom(rect.bottom + scrollTop);
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition >= navbarBottom) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav
        ref={navbarRef}
        className={`flex justify-between p-4 bg-blue-600 text-white transition-all duration-300 ${isSticky ? 'fixed top-0 left-0 w-full bg-blue-600 shadow-md z-50' : ''}`}
      >
        <div className="font-bold">
          {currentPath === '/' ? '' : <Link to="/">Sokoni</Link>}
        </div>
        {/* Desttop links */}
        <div className="hidden md:flex flex text-white items-center gap-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/products" className="hover:underline">
            Products
          </Link>
          <Link to={`${sessionUser?.id}/my-inquiries`} className="hover:underline">
            My Inquiries
            {inquiryItems.length > 0 && (
              <span className="ml-1 bg-red-600 text-white rounded-full px-2 py-0.5 text-xs">
                {inquiryItems.length}
              </span>
            )}
          </Link>
          {showLogoutButton ? (
            <button
              onClick={handleLogoutButtonClick}
              className="hover:underline"
            >
              Logout
            </button>
          ) : (
            <Link to={'/login'} className="hover:underline">
              Login
            </Link>
          )}
           <Link
                to={`${sessionUser?.id}/profile`}
                className="hover-underline"
              >
                Profile
              </Link>
        </div>
        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </nav>

      {/* Overlay Menu for Mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-all duration-300 ${
          isMenuOpen ? 'block' : 'hidden'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className="bg-white w-3/4 h-full p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="mb-4 text-black"
            onClick={() => setIsMenuOpen(false)}
          >
            ❌
          </button>

          <ul className="flex flex-col gap-6 text-lg text-black">
            <li>
              <Link
                to="/"
                className="font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/products"
                className="font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
            </li>
            <li className="relative">
              <Link
                to={`${sessionUser?.id}/my-inquiries`}
                className="font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                My Inquiries
              </Link>
              {inquiryItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 py-0.5 text-xs">
                  {inquiryItems.length}
                </span>
              )}
            </li>
            <li>
              {showLogoutButton ? (
                <button className="font-bold" onClick={handleLogoutButtonClick}>
                  Logout
                </button>
              ) : (
                <Link
                  to={'/login'}
                  className="font-bold"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </li>
            <li>
            <Link
                to={`${sessionUser?.id}/profile`}
                className="font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default NavBar;
