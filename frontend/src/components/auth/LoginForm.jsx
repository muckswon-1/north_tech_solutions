import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, loginUser, newAccessToken } from '../../features/auth/authSlice';
import { useState } from 'react';
import { use } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { fetchUserById } from '../../features/users/usersThunks';
import { setCurrentUser, setIsCompleteUserInfo } from '../../features/users/usersSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, user } = useSelector(
    (state) => state.auth,
  );
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const from = useLocation().state?.from?.pathname || '/';
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     try {
      const response = await dispatch(loginUser(form)).unwrap();
      const userInfo = await dispatch(fetchUserById(response.user.id)).unwrap();
      dispatch(setCurrentUser(userInfo));
      dispatch(setIsCompleteUserInfo(userInfo));
     } catch (error) {
      console.error(error);
      toast.error("Login failed");
     }
  };


  // ⏩ redirect user after successful login
  useEffect(() => {
    if(isAuthenticated && user){
      navigate(from, {replace: true});
    }
  }, [isAuthenticated]);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [location.pathname]);

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold">Login</h2>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full border p-2"
      />
      <input
        type="password"
        name="password"
        value={form.password}
        onChange={handleChange}
        placeholder="Password"
        required
        className="w-full border p-2"
      />
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 px-4 w-full"
        disabled={loading}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
      {/* Register if you don't have an account */}
      <p className="text-center mt-4">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
