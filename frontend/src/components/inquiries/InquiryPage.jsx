import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromInquiry,  clearInquiry, selectInquiryItems, } from '../../features/inquiry/inquirySlice';
import { selectIsAuthenticated } from '../../features/auth/authSlice'; 
import { submitInquiry } from '../../features/inquiry/inquiriesThunk';

//Suggested improvement - customer to opt to schedule a google meet on inquiry submission

const InquiryPage = () => {
  const inquiryItems = useSelector(selectInquiryItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();

 
  const [formData, setFormData] = useState({
    companyName: '',
    businessType: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };



  //validate form
  const validateForm = () => {
    if (
      !formData.companyName ||
      !formData.businessType ||
      !formData.contactName ||
      !formData.contactEmail
    ) {
      toast.error('Please fill in all fields');
      return false;
    }

    if (!validator.isEmail(formData.contactEmail)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    // if(!validator.isMobilePhone(formData.contactPhone,['KE'])){
    //   toast.error("Please enter a valid phone number");
    //   return false;
    // }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    dispatch(submitInquiry(formData));
    setFormData({
      companyName: '',
      businessType: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      message: '',
    });
  };

  if (!inquiryItems.length) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">My Inquiry List</h1>
        <p>No inquiries found.</p>
        <Link
          to="/products"
          className="mt-4 inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Go to Products
        </Link>
      </div>
    );
  }




  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Inquiry List</h1>

      <div className="border rounded p-4 mb-4">
        {inquiryItems.map((item) => {
          return (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-2"
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <button
                onClick={() => dispatch(removeFromInquiry(item.id))}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Submit Your Inquiry</h2>

        <label className="block mb-1">
          Company Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleInputChange}
          className="w-full border p-2 mb-2 rounded"
        />

        <label className="block mb-1">
          Business Type <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="businessType"
          placeholder="Business Type"
          value={formData.businessType}
          onChange={handleInputChange}
          className="w-full border p-2 mb-2 rounded"
        />

        <label className="block mb-1">
          Contact Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="contactName"
          placeholder="Contact Name"
          value={formData.contactName}
          onChange={handleInputChange}
          className="w-full border p-2 mb-2 rounded"
        />

        <label className="block mb-1">Contact Phone</label>
        <input
          type="text"
          name="contactPhone"
          placeholder="Phone Number"
          value={formData.contactPhone}
          onChange={handleInputChange}
          className="w-full border p-2 mb-2 rounded"
        />

        <label className="block mb-1">
          Contact Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="contactEmail"
          placeholder="Email"
          value={formData.contactEmail}
          onChange={handleInputChange}
          className="w-full border p-2 mb-2 rounded"
        />

        <label className="block mb-1">Message</label>
        <textarea
          name="message"
          placeholder="Additional message"
          value={formData.message}
          onChange={handleInputChange}
          className="w-full border p-2 mb-2 rounded"
          rows="4"
        ></textarea>

        <div className="flex gap-2">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Submit Inquiry
          </button>
          <button
            onClick={() => dispatch(clearInquiry())}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Clear Inquiry
          </button>
        </div>
      </div>
    </div>
  );
};

export default InquiryPage;
