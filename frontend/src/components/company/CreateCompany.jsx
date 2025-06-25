import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { selectUser } from '../../features/auth/authSlice';
import { createCompany } from '../../features/company/companyThunks';



const CreateCompany = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectUser);

  const [form, setForm] = useState({
    name: '',
    businessType: '',
    phone: '',
    userId: currentUser?.id || '',
    profileComplete: false,
    verifiedEmail: false,
    verifiedPhone: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('form in submit',form);
    try {
      await dispatch(createCompany({userId:currentUser.id,company: form})).unwrap();

      toast.success("Company created successfully!");

      setForm({
        name: '',
        businessType: '',
        phone: '',
        userId: currentUser?.id || '',
        profileComplete: false,
        verifiedEmail: false,
        verifiedPhone: false
      });
    } catch (err) {
      toast.error("Failed to create company");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

 
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Create Company</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Company Name"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="businessType"
          value={form.businessType}
          onChange={handleChange}
          placeholder="Business Type"
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-2 rounded text-white transition ${
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? 'Creating...' : 'Create Company'}
        </button>
      </form>
    </div>
  );
};

export default CreateCompany;
