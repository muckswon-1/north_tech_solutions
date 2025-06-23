import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAdmin, logoutUser, selectAuthError, selectUser } from "../../features/auth/authSlice";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Unauthorized = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector(selectAuthError) || 'user exists but they are not admin'
  const user = useSelector(selectUser);

  console.log(error);


  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  
  useEffect(() => {
    if(user && user.role !== 'admin') {
      navigate('/')
    }

  },[navigate])

  

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
   
        //const res = await dispatch(loginUser({ email: credentials.email, password: credentials.password})).unwrap();

        try {
          
       const res =  await dispatch(loginAdmin({ email: credentials.email, password: credentials.password})).unwrap();
       if(res.user.role === 'admin') {
        navigate('/admin');
       }

        }catch(err) {
          setErrorMessage(err);
        }
   
  };

  console.log(errorMessage);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-800 to-purple-800 px-4">
      <div className="bg-black text-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-500">Admin Access Only</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Admin Email"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
            value={credentials.email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded bg-gray-800 text-white focus:outline-none"
            value={credentials.password}
            onChange={handleChange}
          />
          {error && <p className="text-red-400 text-sm">{errorMessage}</p>}
          <button
            type="submit"
            className="w-full py-2 bg-purple-700 hover:bg-purple-600 rounded text-white font-semibold"
          >
            Login as Admin
          </button>
        </form>
      </div>
    </div>
  );
};

export default Unauthorized;
