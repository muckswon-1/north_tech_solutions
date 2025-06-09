import axios from 'axios';
import { checkAuthStatus, logoutUser, newAccessToken } from '../features/auth/authSlice';
import store from '../app/store';
const SERVER_URL = `${import.meta.env.VITE_BACKEND_URL}/sokoni-api`;


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

    if(error.response?.status === 401 && !originalRequest._retry ){

       originalRequest._retry = true;

    try {
      await store.dispatch(newAccessToken()).unwrap();
      
      return sokoniApi(originalRequest);
    } catch (error) {
      console.log('An error occured and was caught')
      console.log(error);

     store.dispatch(logoutUser());
    
    }
   }
   
   const defaultMessage = 'Something went wrong. Please try again later.';

    const customError = new Error(
      error?.response?.data?.message || error?.message || defaultMessage,
    );

    customError.status = error?.response?.status || 500;

    return Promise.reject(customError);
}
)



export default sokoniApi;
