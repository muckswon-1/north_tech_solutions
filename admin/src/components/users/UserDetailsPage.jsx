// src/pages/admin/UserDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { adminResetPassword, fetchUserById, selectUserError, selectUserLoading, updateUser } from '../../features/users/usersSlice';



const UserDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editableUser, setEditableUser] = useState(null);

  
  

  useEffect(() => {
   
       dispatch(fetchUserById(id)).unwrap().then((user) => {
        setCurrentUser(user);
        setEditableUser({ ...user });
      });
    
  }, [id]);


  const handleBack = () => navigate('/admin/users');

  const handleChange = (e) => {
  
    setEditableUser({
      ...editableUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdminResetPassword =  async () => {
    try {
      const response = await dispatch(adminResetPassword(id)).unwrap();

      console.log(response);
    } catch (error) {
      
    }
  }




  const handleSave = () => {

    console.log(editableUser);
   dispatch(updateUser({...editableUser}));
    
    
      setIsEditing(false);

  }

  if (isLoading) return <div className="p-4">Loading user...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!currentUser) return <div className="p-4">User not found.</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-white rounded-lg shadow-md">
      <Link
        to="/admin/users"
        className="text-sm text-purple-700 hover:underline mb-4 inline-block"
      >
        ← Back to Users
      </Link>
  
      <h1 className="text-3xl font-bold mb-8 text-gray-800">User Details</h1>
  
      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={`${editableUser.firstName}` || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-4 py-2 rounded border border-gray-300 disabled:bg-gray-100"
          />

        </div>


        <div>
          <label className="block text-gray-700 font-semibold mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={`${editableUser.lastName}` || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-4 py-2 rounded border border-gray-300 disabled:bg-gray-100"
          />

        </div>

  
        {/* Email */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={editableUser.email || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-4 py-2 rounded border border-gray-300 disabled:bg-gray-100"
          />
        </div>
  
        {/* Role */}
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Role</label>
          <input
            type="text"
            name="role"
            value={editableUser.role || ""}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full px-4 py-2 rounded border border-gray-300 disabled:bg-gray-100"
          />
        </div>
  
        {/* Company */}
        {editableUser.companyId ? (
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Company</label>
            <input
              type="text"
              value={editableUser.companyId}
              className="w-full px-4 py-2 rounded border border-gray-300 bg-gray-100 cursor-not-allowed"
              disabled
            />
          </div>
        ): <p>{editableUser.role === 'admin' ? 'Employee' : 'No company assigned.'}</p>
    }
  
        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          {!isEditing ? (
            <button
              className="px-5 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 transition"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          ) : (
            <>
              <button
                className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                onClick={handleSave}
              >
                Save
              </button>
              <button
                className="px-5 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          )}
        </div>
  
        {/* Management Actions (Future Implementation) */}
        <div className="pt-10 border-t mt-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">User Management</h2>
          <div className="flex flex-wrap gap-4">
            <button
              className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
              onClick={() => console.log('Send Warning')}
            >
              Send Warning
            </button>
            <button
              className="px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition"
              onClick={() => console.log('Suspend User')}
            >
              Suspend
            </button>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              onClick={() => console.log('Block User')}
            >
              Block
            </button>
            <button
              onClick={handleAdminResetPassword}
              className="inline-block px-4 py-2 border border-purple-700 text-purple-700 rounded hover:bg-purple-50 cursor-pointer transition"
            >
              Reset Password
            </button>
          </div>
        </div>
  
        {/* Links */}
        <div className="pt-10 space-y-2 border-t mt-6">
           
          {editableUser.companyId  &&  (
            <Link
              to={`/admin/companies/${editableUser.companyId}`}
              className="text-purple-700 hover:underline block"
            >
              View Company
            </Link>
          )}
         {
            editableUser.role !== 'admin' && (
                <Link
                to={`/admin/inquiries?userId=${id}`}
                className="text-purple-700 hover:underline block"
              >
                View Inquiries
              </Link>
            )
         }
        </div>
      </div>
    </div>
  );
  
};

export default UserDetailsPage;
