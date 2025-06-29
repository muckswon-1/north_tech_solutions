import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { clientResetPasswordEmail } from '../../api/passwordAuth';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      // TODO: Replace with real API call
     const response = await clientResetPasswordEmail(email);

     if(response.status === 200){
        toast.success('Password reset email sent!');
      setSubmitted(true);
     }
     
      // await clientSendResetPasswordEmail(email); // placeholder
      
    } catch (err) {
      console.error(err);
      toast.error('Failed to send reset email.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-md w-full space-y-5"
      >
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          <Mail size={22} /> Reset Your Password
        </h2>

        {submitted ? (
          <p className="text-green-600 text-sm">
            ✅ If an account with that email exists, you’ll receive a password reset email shortly.
          </p>
        ) : (
          <>
            <label className="block text-sm font-medium text-gray-700">
              Enter your email address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full border px-3 py-2 rounded shadow-sm"
            />
            <button
              type="submit"
              disabled={sending}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              {sending ? 'Sending...' : 'Send Reset Link'}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
