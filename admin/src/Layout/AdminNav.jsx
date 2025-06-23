import { Link, NavLink, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logoutUser, selectIsAuthenticated, loginUser } from '../../features/auth/authSlice';
import { useEffect } from 'react';

const AdminNav = () => {
  const { pathname } = useLocation();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Only show if on /admin route and user is admin


  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {

  },[])


  return (
    <nav className="bg-purple-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="text-xl font-bold tracking-wide">SOKONI Admin</div>
      <ul className="flex space-x-6">
        <li>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive ? 'text-red-400 font-bold' : 'hover:text-red-400'
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive ? 'text-red-400 font-bold' : 'hover:text-red-400'
            }
          >
            Users
          </NavLink>
        </li>
        <li>
         {
            isAuthenticated ? (
                <>
                  <button onClick={handleLogout} className="hover:text-red-400">
            Logout
          </button>
                </>
            ) : (
                <>
                  <NavLink to="/unauthorized"  className={({ isActive }) =>
              isActive ? 'text-red-400 font-bold' : 'hover:text-red-400'
            }>
            Login
          </NavLink>
                </>
            )
         }
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
