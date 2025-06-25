import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UpdateInfoReminder from "./UpdateInfoReminder";
import { selectCurrentUser, selectIsCompleteUserInfo, setCurrentUser, setIsCompleteUserInfo, updateUserInfo } from "../../../features/users/usersSlice";
import { fetchUserById, updateUser } from "../../../features/users/usersThunks";
import toast from "react-hot-toast";
import { Link, useNavigate } from 'react-router-dom'
import { selectUser } from "../../../features/auth/authSlice";


export default function UserAccount() {
  const user = useSelector(selectCurrentUser);
  const authUser = useSelector(selectUser);
  const isCompleteUserInfo = useSelector(selectIsCompleteUserInfo);
  const dispatch = useDispatch();
  
  const [isEditing, setIsEditing] = useState(false);

  const [initialFormData, setInitialFormData] = useState({
    companyId: user?.companyId || '',
    createdAt: user?.createdAt || '',
    updatedAt: user?.updatedAt || '',
    id: user?.id || '',
    role: user?.role || '',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
  })

  const [form, setForm] = useState(initialFormData);
  const [isDirty, setIsDirty] = useState(false);
 

  const handleChange = (e) => {
    dispatch(updateUserInfo({field: e.target.name, value: e.target.value}));
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUser(user)).unwrap();
      dispatch(setCurrentUser(user));
      dispatch(setIsCompleteUserInfo(user));
      setInitialFormData(form);
      setIsDirty(false);
      setIsEditing(false);
      toast.success("User info updated!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user info");
    }
  };

  const handleCancel = () => {
    dispatch(setCurrentUser(initialFormData));
    setIsEditing(false);
    setIsDirty(false);
    
  }

  useEffect(() => {
    if(!user && authUser){
      dispatch(fetchUserById(authUser.id))
      .unwrap()
      .then((userInfo) => {
        dispatch(setCurrentUser(userInfo));
        dispatch(setIsCompleteUserInfo(userInfo));
        setInitialFormData({
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          email: userInfo.email,
          companyId: userInfo.companyId,
          createdAt: userInfo.createdAt,
          updatedAt: userInfo.updatedAt,
          id: userInfo.id,
          role: userInfo.role
        });
      })
      .catch((error) => {
        console.error(error);
      }); 
    }
  },[user, authUser, dispatch, isEditing]);


  useEffect(() => {
    const dirty = 
      form.firstName !== initialFormData.firstName ||
      form.lastName !== initialFormData.lastName ||
      form.email !== initialFormData.email;
    setIsDirty(dirty);

  },[authUser,form])


console.log(isCompleteUserInfo);


  return (
  
    <div className="bg-white rounded-lg shadow p-6">
      {!isCompleteUserInfo && <UpdateInfoReminder />}
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Info</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
    <input
      name="firstName"
      value={user?.firstName || ''}
      onChange={handleChange}
      disabled={!isEditing}
      placeholder="First Name"
      className="w-full p-2 border rounded disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <input
      name="lastName"
      value={user?.lastName || ''}
      onChange={handleChange}
      disabled={!isEditing}
      placeholder="Last Name"
      className="w-full p-2 border rounded disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    <input
      type="email"
      name="email"
      value={user?.email || ''}
      onChange={handleChange}
      disabled={!isEditing}
      placeholder="Email"
      className="w-full p-2 border rounded disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </form>
  <div className="pt-4 flex gap-3">
    {
      !isEditing ? (
        <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow transition"
          >
            Edit Info
          
          </button>
      ):(
        <>
       <button
  type="submit"
  onClick={handleSubmit}
  disabled={!isDirty}
  className={`px-4 py-2 rounded shadow transition ${
    isDirty
      ? "bg-green-600 hover:bg-green-700 text-white cursor-pointer"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }`}
>
  Save Changes
</button>
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded shadow transition"
        >
          Cancel
        </button>
      </>
      )
       
    }

<Link
          to="/reset-password"
          className="ml-auto text-blue-600 hover:underline self-center text-sm"
        >
          Reset Password
        </Link>


  </div>

  </div>
  );

}
