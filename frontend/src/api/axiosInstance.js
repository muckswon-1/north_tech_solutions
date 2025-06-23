import axios from 'axios';
import { checkAuthStatus, logoutUser, newAccessToken } from '../features/auth/authSlice';
import store from '../app/store';
const SERVER_URL = `${import.meta.env.VITE_BACKEND_URL}/api`;


const sokoniApi = axios.create({
  baseURL: SERVER_URL,
  //timeout: 10000,
  withCredentials: true,
  maxBodyLength: 3000,
  
   //validateStatus: (status) => status >= 200 && status <= 500,
  
});





sokoniApi.interceptors.response.use(
  response => {
    return response
  },
  async (error) => {
  
    const originalRequest = error.config;
    
    console.log(originalRequest.url.includes('/refresh'));

     if(error?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/refresh') &&
       !originalRequest.url.includes('/login') &&
       !originalRequest.url.includes('/admin-login')
    ){

       originalRequest._retry = true;

    try {
      
      await store.dispatch(newAccessToken()).unwrap();
      

       return sokoniApi(originalRequest);
    } catch (refreshError) {
       console.log(refreshError);
     
     await store.dispatch(logoutUser()).unwrap();
     window.location.href = "/login"
     return Promise.reject(refreshError);
    }
   }
   
   console.log(error?.response?.data)

   const defaultError = 'Something went wrong. Please refresh and try again.'

   const customError = new Error (
    error?.response?.data?.message || defaultError
   )



   customError.status = error?.status || 500;

   console.log(customError);

    return Promise.reject(customError);
}
)



export default sokoniApi;
