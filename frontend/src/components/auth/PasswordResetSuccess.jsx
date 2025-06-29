import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PasswordResetSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle size={48} className="text-green-600" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          Password Reset Email Sent
        </h1>
        <p className="text-gray-600 mb-6">
          We've sent you an email with instructions to reset your password. Please check your inbox and follow the link to continue.
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Didn’t get the email? Check your spam folder or{' '}
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            try again
          </Link>.
        </p>
        <Link
          to="/login"
          className="inline-block bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default PasswordResetSuccess;
