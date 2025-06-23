import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, registerUser, selectAuthError, selectAuthLoading, selectUser } from '../../features/auth/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);
  const user = useSelector(selectUser);

 

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(registerUser(form));
    setForm({
      email: '',
      password: '',
    });
  };

  useEffect(() => {
    if (user) {
      navigate('/login');
    }
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(clearAuthError());
  }, [location.pathname]);

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold">Register</h2>
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
      {authError && <p className="text-red-500">{authError}</p>}
      <button
        type="submit"
        className="bg-green-600 text-white py-2 px-4 w-full"
        disabled={isAuthLoading}
      >
        {isAuthLoading ? 'Registering...' : 'Register'}
      </button>

      {/* Login if you laready have an account */}
      <p className="text-center mt-4">
        Already have an account?{' '}
        <a href="/login" className="text-blue-600 hover:underline">
          Login
        </a>
      </p>
    </form>
  );
};

export default RegisterForm;
