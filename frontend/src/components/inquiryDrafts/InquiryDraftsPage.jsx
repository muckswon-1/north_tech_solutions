import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInquiryDrafts, setUserInquiryDrafts } from '../../features/userInquiryDrafts/userInquiryDraftSlice';
import { fetchUserInquiryDrafts } from '../../features/userInquiryDrafts/userInquiryDraftThunks';
import { selectUser } from '../../features/auth/authSlice';
import InquiryDraft from './InquiryDraft';
import { selectUserLoading } from '../../features/users/usersSlice';
import { selectCompanyProfileComplete, setCompanyProfileComplete } from '../../features/company/companySlice';
import DraftInquiryMessage from './DraftInquiryMessage';


const InquiryDraftsPage = () => {
  const inquiryDrafts = useSelector(selectUserInquiryDrafts);


  const authUser = useSelector(selectUser);
  const isCompanyProfileComplete = true;
  const dispatch = useDispatch();
  const isLoading = useSelector(selectUserLoading);


 useEffect(() => {
  dispatch(fetchUserInquiryDrafts(authUser.id));
  dispatch(setUserInquiryDrafts(inquiryDrafts));
  dispatch(setCompanyProfileComplete());

 },[dispatch])



  if (!inquiryDrafts.length) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">My Inquiry List</h1>
        <p className="text-gray-600">No inquiries found.</p>
        <Link
          to="/products"
          className="mt-6 inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Inquiry List</h1>

      {isLoading && (
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}

      {inquiryDrafts && inquiryDrafts.length > 0 && (
        <div className="space-y-4 mb-8">
          {
            inquiryDrafts.map((inquiry) => (
              <InquiryDraft
                key={inquiry.id}
                draft={inquiry}
              />
            ))
          }

        </div>

      )}

      

      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-xl font-semibold mb-4">Submit Your Inquiry</h2>

        {!isCompanyProfileComplete ? (
          <div className="text-red-600 font-medium bg-red-50 p-4 rounded border border-red-200">
            You must complete your company profile before submitting an inquiry.
            <Link
              to="/dashboard/profile#company"
              className="ml-2 text-blue-600 underline hover:text-blue-800"
            >
              Update Company Profile
            </Link>
          </div>
        ) : (
         <DraftInquiryMessage inquiryDrafts={inquiryDrafts} />
        )}
      </div>
    </div>
  );
};

export default InquiryDraftsPage;
