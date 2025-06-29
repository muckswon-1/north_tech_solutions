import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../features/auth/authSlice';
import { CheckCircle, Mail, AlertTriangle } from 'lucide-react';
import { clientSendVerificationEmail } from '../../api/verificationCenter';
import { selectCompany, selectCompanyError } from '../../features/company/companySlice';
import { getMyCompany, verifyCompanyEmail } from '../../features/company/companyThunks';

const EmailVerification = () => {
  const user = useSelector(selectUser);
  const company = useSelector(selectCompany);
  const navigate = useNavigate();
  const [status, setStatus] = useState('idle'); // idle | sending | sent | verifying | verified | error
  const [verificationCode, setVerificationCode] = useState('');
  const dispatch = useDispatch();
  const error = useSelector(selectCompanyError);



  const handleSendVerification = async () => {
    setStatus('sending');
    try {
        const response = await clientSendVerificationEmail({userId: user.id, email: user.email});
       
        if(response.status === 200){
            setStatus('sent');
        } else {
            setStatus('error');
        }
        
    } catch (error) {
        console.error(error);
        setStatus('error');
    }
  };

 

  const handleVerifyCode =  async () => {
    if (!verificationCode.trim()) return;
    setStatus('verifying');
    try {
        const response =  await dispatch(verifyCompanyEmail({userId: user.id, verificationCode})).unwrap();
        const message = response?.message;

        if(message){
            setStatus('verified');
        }
        setVerificationCode('')
    
        
    } catch (error) {
        console.error(error);
        setStatus('error');
    }
  };

  const handleEditEmail = () => {
    navigate(`/${user.id}/profile`);
  };


  useEffect(() => {
    dispatch(getMyCompany(user.id)).unwrap()
    .then(companyInfo => {
        
        if(companyInfo.verifiedEmail){
            setStatus('verified');
        }
    })
    .catch(err => {
        console.error(err)
    })
 
  
  }, [status])

  return (
    <div className="bg-white p-6 rounded-lg shadow max-w-xl mx-auto mt-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <Mail size={20} /> Email Verification
      </h2>

      <div className="mb-4">
        <label className="text-sm font-medium text-gray-600">Email Address</label>
        <input
          type="email"
          value={user?.email || ''}
          disabled
          className="w-full mt-1 p-2 border rounded bg-gray-100 cursor-not-allowed"
        />
        <p className="text-xs text-gray-500 mt-1">
          To update your email, go to your{' '}
          <button
            onClick={handleEditEmail}
            className="text-blue-600 underline hover:text-blue-800"
          >
            profile settings
          </button>.
        </p>
      </div>

      {status === 'verified' ? (
        <div className="flex items-center text-green-600 mt-4 gap-2 text-sm">
          <CheckCircle size={18} /> Your email has been successfully verified!
        </div>

      ) : (
        <>
          {status === 'sent' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Enter Verification Code
              </label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter code"
                className="w-full mt-1 p-2 border rounded"
              />

          <div className="flex flex-wrap  gap-4 mt-3">
          <button
                onClick={handleVerifyCode}
                className="mt-3 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded transition"
              >
                {status === 'verifying' ? 'Verifying...' : 'Verify Email'}
              </button>
              <button className="text-gray-500 hover:underline" onClick={() => setStatus('idle')}>
    Cancel
  </button> </div>

            </div>
          )}

{status === 'error' && (
  <div className="mt-4 text-sm text-red-600">
    <div className="flex items-center gap-2 mb-2">
      <AlertTriangle size={18} />
      <span>{error}</span>
    </div>

    {error.toLowerCase().includes('invalid') && (
      <>
        <label className="block text-sm font-medium text-gray-700 mt-2">
          Try Again
        </label>
        <input
          type="text"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          placeholder="Enter code"
          className="w-full mt-1 p-2 border rounded"
        />
        <div className="flex flex-wrap  gap-4 mt-3">
          <button
            onClick={handleVerifyCode}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded transition"
          >
            Try Again
          </button>
          <button
            onClick={handleSendVerification}
            className="text-blue-600 underline hover:text-blue-800"
          >
            Send New Code
          </button>
          <button className="text-gray-500 hover:underline" onClick={() => setStatus('idle')}>
    Cancel
  </button>

        </div>
      </>
    )}

    {error.toLowerCase().includes('expired') && (
      <button
        onClick={handleSendVerification}
        className="mt-2 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
      >
        Send New Code
      </button>
    )}
  </div>
)}


{(status === 'idle' || status === 'sending') && (
  <button
    onClick={handleSendVerification}
    disabled={status === 'sending'}
    className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
  >
    {status === 'sending' ? 'Sending...' : 'Send Verification Email'}
  </button>
)}
        </>
      )}
    </div>
  );
};

export default EmailVerification;
