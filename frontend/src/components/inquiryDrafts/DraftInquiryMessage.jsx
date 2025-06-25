import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import { clearDraftInquiries, fetchUserInquiryDrafts, submitInquiry } from '../../features/userInquiryDrafts/userInquiryDraftThunks';
import toast from 'react-hot-toast';
import { removeAllDraftInquiries } from '../../features/userInquiryDrafts/userInquiryDraftSlice';

const DraftInquiryMessage = ( {inquiryDrafts}) => {
     const [message, setMessage] = useState('');
     const dispatch = useDispatch();
     const authUser = useSelector(selectUser);
    

      const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(submitInquiry({ inquiryDrafts, message, userId: authUser.id }));
        dispatch(removeAllDraftInquiries());
        setMessage('');
        toast.success("Inquiry submitted!");
      };

    
    return (
        <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Message (optional)</label>
          <textarea
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Additional message or notes"
            rows={4}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Inquiry
          </button>
          <button
            type="button"
            onClick={() => dispatch(clearDraftInquiries(authUser?.id))}
            className="bg-yellow-500 text-white px-5 py-2 rounded hover:bg-yellow-600 transition"
          >
            Clear List
          </button>
        </div>
      </form>
    );
}

export default DraftInquiryMessage;
