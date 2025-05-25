//import { google } from "googleapis";
import React, { useEffect, useState } from "react";
import axios from "axios";





const ScheduleMeetingSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessType: "",
    meetingDate: "",
    meetingTime: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsauthenticated] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setIsSuccess(false);

    try {
      // Fetch access token using refresh token
      const refreshToken = localStorage.getItem("google_refresh_token");

      if(!refreshToken){
        throw new Error("No refresh token found");
        
      }

      // call the back end to fetch a new access token
      const response = await axios.post ("http://localhost:2070/mucks/schedule-meeting",{...formData});

      if(response.status === 200){
        
        setIsSuccess(true);
        setIsLoading(false);

      }

    



    } catch (error) {
      
    }

    };


    const initiateOAuthFlow = () => {
        const oauthUrl = `https://northtechsolutions.muckswon.com/mucks/auth/google`;
        window.location.href = oauthUrl;
    }

    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const checkAuth = urlParams.get("authenticated");

      if(checkAuth === "true"){
        setIsauthenticated(true);
      }

      window.history.replaceState({}, document.title, '/');

    },[])


  return (
    <section id="schedule-meeting" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Schedule a Meeting</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {!isAuthenticated ? (
        <div className="text-center">
          <p className="text-gray-700 mb-4">
            To schedule a meeting, you need to authenticate with Google.
          </p>
          <button
             onClick={initiateOAuthFlow}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Authenticate with Google
          </button>
        </div>
      ) : isSuccess ? (
        <p className="text-green-600 text-center text-lg">
          Your meeting has been scheduled successfully! Check your email for the Google Meet link.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="businessType" className="block text-sm font-medium text-gray-700">
                Business Type
              </label>
              <input
                type="text"
                id="businessType"
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="meetingDate" className="block text-sm font-medium text-gray-700">
                Meeting Date
              </label>
              <input
                type="date"
                id="meetingDate"
                name="meetingDate"
                value={formData.meetingDate}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="meetingTime" className="block text-sm font-medium text-gray-700">
                Meeting Time
              </label>
              <input
                type="time"
                id="meetingTime"
                name="meetingTime"
                value={formData.meetingTime}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? "Scheduling..." : "Schedule Meeting"}
            </button>
          </div>
        </form>
      )}
    </div>
  </section>
  );
};

export default ScheduleMeetingSection;