import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../features/auth/authSlice';
import { Phone, CheckCircle, AlertTriangle } from 'lucide-react';
import { selectCompany } from '../../features/company/companySlice';

const PhoneVerification = () => {
  const user = useSelector(selectUser);
  const company = useSelector(selectCompany);
  const navigate = useNavigate();
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const handleSendVerification = () => {
    setStatus('sending');
    // Simulate sending SMS
    setTimeout(() => {
      setStatus('sent');
    }, 1500);
  };

  const handleEditPhone = () => {
    navigate(`/${user.id}/profile`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <Phone size={20} /> Phone Number Verification
      </h2>

      <div className="mb-4">
        <label className="text-sm font-medium text-gray-600">Phone Number</label>
        <input
          type="text"
          value={company?.phone || ''}
          disabled
          className="w-full mt-1 p-2 border rounded bg-gray-100 cursor-not-allowed"
        />
        <p className="text-xs text-gray-500 mt-1">
          To update your phone number, go to your{' '}
          <button
            onClick={handleEditPhone}
            className="text-blue-600 underline hover:text-blue-800"
          >
            profile settings
          </button>.
        </p>
      </div>

      {status === 'sent' ? (
        <div className="flex items-center text-green-600 mt-4 gap-2 text-sm">
          <CheckCircle size={18} /> A verification code has been sent via SMS.
        </div>
      ) : status === 'error' ? (
        <div className="flex items-center text-red-600 mt-4 gap-2 text-sm">
          <AlertTriangle size={18} /> Failed to send verification code. Please try again.
        </div>
      ) : (
        <button
          onClick={handleSendVerification}
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
        >
          {status === 'sending' ? 'Sending...' : 'Send Verification Code'}
        </button>
      )}
    </div>
  );
};

export default PhoneVerification;
