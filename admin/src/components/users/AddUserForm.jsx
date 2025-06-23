import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {  addNewUser, selectUserError, selectUserLoading } from '../../features/users/usersSlice'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
//import { createUser } from '@/redux/usersSlice'

const AddUserForm = () => {
  const dispatch = useDispatch()
  const error = useSelector(selectUserError);
  const isLoading = useSelector(selectUserLoading);
  const navigate = useNavigate();


console.log(error);


  const [form, setForm] = useState({
    email: '',
    role: 'user',
    firstName: '',
    lastName: ''
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!isLoading){
     try {

      await dispatch(addNewUser({...form})).unwrap();
      toast.success('User added successfully')
      setForm({
        email: '',
        role: 'user',
        firstName: '',
        lastName: ''
      })
      navigate('/admin/users');

       
     } catch (error) {
      toast.error(error);
     }
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto mt-6 border border-gray-200"
    >
       <Link
              to="/admin/users"
              className="text-sm text-purple-700 hover:underline mb-4 inline-block"
            >
              ← Back to Users
            </Link>
        
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Add a new User</h1>

      <input
        name="firstName"
        placeholder="First Name"
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        value={form.firstName}
      />
      <input
        name="lastName"
        placeholder="Last Name"
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        value={form.lastName}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        value={form.email}
      />
      <select
        name="role"
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
        value={form.role}
      >
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button
        type="submit"
        className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-md font-medium transition duration-200"
      >
        Add User
      </button>
    </form>
  )
}

export default AddUserForm
