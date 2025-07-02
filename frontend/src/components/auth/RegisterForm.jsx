import React, { useState, useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearAuthError,
 
  selectAuthError,
 
  selectAuthIsLoading,
 
  selectUser
} from '../../features/auth/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import passwordSchema from '../../lib/utils'; // adjust path as needed
import { Eye, EyeOff } from 'lucide-react';
import { registerUser } from '../../features/auth/AuthThunks';



const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthLoading = useSelector(selectAuthIsLoading);
  const authError = useSelector(selectAuthError);
  const user = useSelector(selectUser);

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validationResults = useMemo(() => {
    const { details = [] } = passwordSchema.validate(form.password || '', { details: true }) || {};
    const failedKeys = details.map(d => d.context?.key || d.message);
    return [
      { label: 'At least 8 characters', passed: form.password.length >= 8 },
      { label: 'No more than 100 characters', passed: form.password.length <= 100 },
      { label: 'Contains an uppercase letter', passed: /[A-Z]/.test(form.password) },
      { label: 'Contains a lowercase letter', passed: /[a-z]/.test(form.password) },
      { label: 'Contains a number', passed: /\d/.test(form.password) },
      { label: 'No spaces', passed: !/\s/.test(form.password) },
      { label: 'Avoid common passwords', passed: !failedKeys.includes('oneOf') }
    ];
  }, [form.password]);

  const allPassed = validationResults.every(rule => rule.passed);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allPassed) return;

    try {
      await dispatch(registerUser(form)).unwrap();
      setForm({ email: '', password: '' });
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) {
      navigate('/login');
    }
  }, [user]);

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

      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="w-full border p-2 pr-10"
        />
        <span
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </span>
      </div>

      <ul className="text-sm space-y-1">
        {validationResults.map(({ label, passed }, index) => (
          <li key={index} className={passed ? 'text-green-600' : 'text-red-500'}>
            {passed ? '✔' : '✖'} {label}
          </li>
        ))}
      </ul>

      {authError && <p className="text-red-500">{authError}</p>}

      <button
        type="submit"
        className={`w-full py-2 px-4 text-white rounded ${
          allPassed ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
        }`}
        disabled={!allPassed || isAuthLoading}
      >
        {isAuthLoading ? 'Registering...' : 'Register'}
      </button>

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
