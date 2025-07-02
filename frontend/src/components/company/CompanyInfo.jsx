import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { selectCompany, selectCompanyVerifiedEmail, selectCompanyVerifiedPhone, setCurrentCompany, updateCompanyField } from '../../features/company/companySlice';
import { getMyCompany, updateCompany } from '../../features/company/companyThunks';
import { selectUser } from '../../features/auth/authSlice';
import { Link } from 'react-router-dom';




const CompanyInfo = () => {
    const dispatch = useDispatch();
    const company = useSelector(selectCompany);
    const authUser = useSelector(selectUser);
    const [isEditing, setIsEditing] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const isVerifiedEmail = useSelector(selectCompanyVerifiedEmail);
    



    const [initialFormData, setInitialFormData] = useState({
       name: company?.name || '',
       businessType: company?.businessType || '',
       phone: company?.phone || '',
    })

    const [form, setForm] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });
        dispatch(updateCompanyField({ field: name, value }));
    };

    const handleSave = async() => {
        try {
           const updatedCompany = await dispatch(updateCompany({userId:authUser.id,updatedCompany: form})).unwrap();
           dispatch(setCurrentCompany(updatedCompany));
           setInitialFormData(form);
           setIsDirty(false);
           setIsEditing(false);
           toast.success("Company info updated!")

        } catch (error) {
            console.error(error);
            toast.error("Failed to update company info"); 
        }
    }

    const handleCancel = () => {
        dispatch(setCurrentCompany(initialFormData));
        setForm(initialFormData);
        setIsEditing(false);
    }



    useEffect(() => {
       const isDirty = 
       form.name !== initialFormData.name ||
       form.businessType !== initialFormData.businessType ||
       form.phone !== initialFormData.phone;
       setIsDirty(isDirty);
    },[form, initialFormData]);

    useEffect(() => {
        if(!company){
            dispatch(getMyCompany(authUser.id))
            .unwrap()
            .then((companyInfo) => {
                dispatch(setCurrentCompany(companyInfo));
                setInitialFormData(companyInfo);
            })
            .catch((error) => {
                console.error(error);
            });
        }
    },[dispatch, company, authUser ])
    
    
    
   

  
    if (!company) return <p>Loading company info...</p>;

    return (
        <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Company Info</h2>
  
        <form className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Company Name"
            className="w-full p-2 border rounded disabled:bg-gray-100"
          />
          <input
            name="businessType"
            value={form.businessType}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Business Type"
            className="w-full p-2 border rounded disabled:bg-gray-100"
          />
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Phone"
            className="w-full p-2 border rounded disabled:bg-gray-100"
          />

        {/* Verification Summary */}
<div className="mt-4 space-y-2">
  {isVerifiedEmail ? (
    <div className="flex items-center text-green-700 bg-green-50 p-3 rounded border border-green-300">
      <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
      <span className="font-medium">Your company is fully verified and ready to list products.</span>
    </div>
  ) : (
    <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 p-3 rounded">
      <div className="flex items-start gap-2">
        <AlertTriangle className="w-5 h-5 mt-0.5" />
        <div>
          <p className="font-semibold">Verification Required:</p>
          <ul className="list-disc list-inside text-sm mt-1 space-y-1">
            {!isVerifiedEmail && 
            <li>Email address is not verified.</li>
           
            }
          </ul>
          <Link to={`/${authUser.id}/verification-center`} className="text-blue-600 hover:underline">Please verify these details in your profile settings to unlock full features.</Link>
        </div>
      </div>
    </div>
  )}
</div>

        </form>
  
        <div className="flex gap-3 pt-4">
          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Edit Info
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                disabled={!isDirty}
                className={`px-4 py-2 rounded shadow transition ${
                  isDirty
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    );
}

export default CompanyInfo;
