import React, { useState, useMemo } from 'react';
import { Eye, EyeOff, Lock, CheckCircle, XCircle, } from 'lucide-react';
import {  useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import { useParams } from 'react-router-dom';
import { clientResetPassword, clientResetPasswordEmail, clientVerifyResetPasswordToken } from '../../api/passwordAuth';

const requirements = [
  { test: (pw) => pw.length >= 8, label: 'At least 8 characters' },
  { test: (pw) => /[A-Z]/.test(pw), label: 'Contains uppercase letter' },
  { test: (pw) => /[a-z]/.test(pw), label: 'Contains lowercase letter' },
  { test: (pw) => /\d/.test(pw), label: 'Contains a number' },
  { test: (pw) => !/\s/.test(pw), label: 'No spaces' },
  {
    test: (pw) => !['Passw0rd', 'Password123'].includes(pw),
    label: 'Avoids common passwords',
  },
  
];

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const user = useSelector(selectUser);
  const params = useParams();
 

  const results = useMemo(() => {
    return requirements.map((rule) => ({
      ...rule,
      passed: rule.test(newPassword),
    }));
  }, [newPassword]);



  const handleReset = async () => {

    setError('')

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }


    if(!user) {
      try {

      
        const {token} = params;
       const verifyResetCode = await clientVerifyResetPasswordToken(token);
       
       if(verifyResetCode.status === 200){

        try {
         const response = await clientResetPassword({token, password: newPassword });

         console.log(response);
           
         if(response.status === 200){
          setSuccess(true);
          setError('');
          return;
         }
          
        } catch (error) {
          console.log(error.message);
          setError(error.message);
          return;
        }

       }else {
        setSuccess(false);
        setError('Invalid token');
        return;
       }


      } catch (error) {
        console.log(error.message);
        setError(error.message);
        return;
      }
    }


    try {

        const response = await clientResetPassword({id: user?.id, password: newPassword });
        if(response.status === 200){
          setSuccess(true);
          setError('')

        }
    } catch (error) {

        setError('An error occured while resetting password. Please try again')
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-12 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <Lock size={20} /> Reset Your Password
      </h2>

      {success ? (
        <div className="text-green-600 font-medium">
          ✅ Your password has been reset. You can now log in with your new password.
        </div>
      ) : (
        <>
          <div className="mb-4">
            <label className="text-sm text-gray-700 font-medium">New Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full border rounded px-3 py-2 pr-10"
                placeholder="Enter new password"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm text-gray-700 font-medium">Confirm Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="Confirm your password"
            />
          </div>

          <div className="mb-3">
            <h4 className="text-sm font-medium text-gray-600 mb-1">Password Requirements:</h4>
            <ul className="space-y-1 text-sm">
              {results.map(({ label, passed }, idx) => (
                <li key={idx} className={`flex items-center gap-2 ${passed ? 'text-green-600' : 'text-gray-500'}`}>
                  {passed ? <CheckCircle size={16} /> : <XCircle size={16} />} {label}
                </li>
              ))}
            </ul>
          </div>

          {error && (
            <div className="text-red-600 text-sm mb-3">
              ⚠ {error}
            </div>
          )}

<button
  onClick={handleReset}
  disabled={
    !newPassword ||
    !confirmPassword ||
    results.some(({ passed }) => !passed)
  }
  className={`w-full py-2 rounded transition font-medium text-white 
    ${!newPassword || !confirmPassword || results.some(({ passed }) => !passed)
      ? 'bg-gray-300 cursor-not-allowed'
      : 'bg-blue-600 hover:bg-blue-700'}`}
>
  Reset Password
</button>
        </>
      )}
    </div>
  );
};

export default ResetPassword;
