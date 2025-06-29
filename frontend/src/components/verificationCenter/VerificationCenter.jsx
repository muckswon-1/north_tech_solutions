import React, { useState } from 'react';
import { CheckCircle, AlertTriangle,ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import { selectCompanyVerifiedEmail, selectCompanyVerifiedPhone } from '../../features/company/companySlice';
import EmailVerification from './EmailVerification';
import PhoneVerification from './PhoneVerification';

const VerificationCenter = () => {
  const navigate = useNavigate();
  const authUser = useSelector(selectUser);
  const emailVerified = useSelector(selectCompanyVerifiedEmail);
  const phoneVerified = useSelector(selectCompanyVerifiedPhone)
 
  
 
  

  


  const handleBack = () => {
    navigate(`/${authUser?.id}/profile`);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Verification Center</h1>

      {/* Overall Status */}
      <div className="mb-6 text-center">
        {emailVerified && phoneVerified ? (
          <div className="flex items-center justify-center gap-2 text-green-600">
            <CheckCircle size={20} />
            <span className="font-medium">Your company is fully verified!</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 text-yellow-600">
            <AlertTriangle size={20} />
            <span>Please complete the steps below to verify your company.</span>
          </div>
        )}
      </div>

    <EmailVerification />
    <PhoneVerification />

      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition"
      >
        <ArrowLeft size={16} /> Back to Company Profile
      </button>
    </div>
  );
};

export default VerificationCenter;
