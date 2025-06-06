import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, registerUser } from '../../features/auth/authSlice';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

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
  }, [dispatch]);

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
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="bg-green-600 text-white py-2 px-4 w-full"
        disabled={loading}
      >
        {loading ? 'Registering...' : 'Register'}
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
