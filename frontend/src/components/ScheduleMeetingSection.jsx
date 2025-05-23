//import { google } from "googleapis";
import React, { useEffect, useState } from "react";
const client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const client_secret = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
const redirect_uri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;



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
  const [accessToken, setAccessToken] = useState(null);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");
//     setIsSuccess(false);

    // try {
    //   // Simulate Google Meet link generation
    //   // const googleMeetLink = `https://meet.google.com/abc- ${Math.random().toString(36).substring(7)}`;

    //   // Simulate sending an email with the meeting link
    // //   setTimeout(() => {
    // //     console.log(`Meeting scheduled for ${formData.meetingDate} at ${formData.meetingTime}`);
    // //     console.log(`Meeting link: ${googleMeetLink}`);
    // //     console.log(`Email sent to ${formData.email}`);
    // //     setIsLoading(false);
    // //     setIsSuccess(true);
    // //   }, 1500);

    // const oauth2Client  = new google.auth.OAuth2(client_id, client_secret, redirect_uri);
    
    // } catch (err) {
    //   setError("An error occurred while scheduling the meeting. Please try again.");
    //   setIsLoading(false);
    // }
  //};

//   const fetchTokens = async (authCode) => {
//     try {
//         const response = await fetch('https://oauth2.googleapis.com/token', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//             },
//             body: JSON.stringify({
//                 code: authCode,
//                 client_id: client_id,
//                 client_secret: client_secret,
//                 redirect_uri: redirect_uri,
//                 grant_type: 'authorization_code',
//             }),
//         });

//         const tokes = await response.json();

//         if(tokes.error) {
//             throw new Error(tokes.error_description || "Failed to fetch tokens");
//         }

//         console.log(`Access Token: ${tokes.access_token}`);
//         console.log(`Refresh Token: ${tokes.refresh_token}`);

//         setAccessToken(tokes.access_token);

//         localStorage.setItem('refresh_token', tokes.refresh_token);


//     } catch (error) {
//         console.error('Error fetching tokens:', error);
//         setError('Failed to authenticate with Google. Please try again.');
//     }
//   }

//   useEffect(() => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const authCode = urlParams.get('code');

//     if (authCode) {
//       fetchTokens(authCode);
//     }
//   }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setIsSuccess(false);


    try {
        const oauth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uri);

        const refresh_token = localStorage.getItem('refresh_token');

        if(!refresh_token) {
            throw new Error('No refresh token found');
        }

      const tokens = await oauth2Client.refreshAccessToken({refresh_token});
      oauth2Client.setCredentials(tokens.credentials);


     const calendar = google.calendar({version: 'v3', auth: oauth2Client});

     const startTime = new Date(formData.meetingDate + 'T' + formData.meetingTime + ':00');
     const endTime = new Date(startTime.getTime() + 30 * 60000);

     const event = {
        summary: `Meeting with ${formData.name}`,
        description: `Business Type: ${formData.businessType}`,
        start: {
            dateTime: startTime.toISOString(),
            timeZone: 'Asia/Kolkata',
        },
        end: {
            dateTime: endTime.toISOString(),
            timeZone: 'Asia/Kolkata',
        },
        attendies: [
            {email: formData.email},
        ],
        reminders: {
            useDefault: false,
            overrides: [
                {method: 'email', minutes: 24 * 60},
                {method: 'popup', minutes: 10},
            ],
        },
     };

     const response = await calendar.events.insert({
        calendarId: 'primary',
        resource: event,
     });

     //Confirm success
     console.log("Event created", response.data.htmlLink);
     setIsLoading(false);
     setIsSuccess(true);


      


    }catch(err){
        console.error("Error scheduling meeting: ", err);
        setError("An error occurred while scheduling the meeting. Please try again.");
        setIsLoading(false);
        setIsSuccess(false);
    }

    };


    const initiateOAuthFlow = () => {
        const oauthUrl = `https://accounts.google.com/o/oauth2/auth?scope=https ://www.googleapis.com/auth/calendar&access_type=offline&include_granted_scopes=true&response_type=code&state=security_token&redirect_uri=${encodeURIComponent(redirect_uri)}&client_id=${encodeURIComponent(client_id)}`;
        window.location.href = oauthUrl;
    }

  return (
    <section id="schedule-meeting" className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-100">
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Schedule a Meeting</h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {!accessToken ? (
        <div className="text-center">
          <p className="text-gray-700 mb-4">
            To schedule a meeting, you need to authenticate with Google.
          </p>
          <button
            // onClick={initiateOAuthFlow}
            onClick={() => {}}
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