import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError,  selectAuthError, selectAuthIsLoading, selectIsAuthenticated, selectUser } from '../../features/auth/authSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchUserById } from '../../features/users/usersThunks';
import { setCurrentUser, setIsCompleteUserInfo } from '../../features/users/usersSlice';
import { Eye, EyeOff } from 'lucide-react';
import { fetchCurrentUser } from '../../api/passwordAuth';
import { loginUser } from '../../features/auth/AuthThunks';


const LoginForm = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const loading = useSelector(selectAuthIsLoading);
  const  error = useSelector(selectAuthError);


  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const from = useLocation().state?.from?.pathname || '/';
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await dispatch(loginUser(form)).unwrap();
      const userInfo = await dispatch(fetchUserById(response.user.id)).unwrap();
      dispatch(setCurrentUser(userInfo));
      dispatch(setIsCompleteUserInfo(userInfo));
    } catch (err) {
   
      toast.error('Login failed');
    }
  };

  useEffect(() => {
   
    if (isAuthenticated && user) {
      navigate(from, { replace: true });
    }
  }, [dispatch, user, isAuthenticated]);



  useEffect(() => {
    dispatch(clearAuthError());
  }, [location.pathname]);




  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 mt-12 bg-white rounded shadow space-y-5">
      <h2 className="text-2xl font-bold text-gray-800">Login</h2>

      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full border p-2 rounded"
      />

      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full border p-2 rounded pr-10"
        />
        <span
          className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </span>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 rounded text-white transition ${
          loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>

      <div className="flex justify-between items-center text-sm text-gray-600 mt-2">
        <Link to="/register" className="text-blue-600 hover:underline">
          Don't have an account?
        </Link>
        <Link to="/forgot-password" className="text-blue-600 hover:underline">
          Forgot password?
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
