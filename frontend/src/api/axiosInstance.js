
import axios from 'axios';
const SERVER_URL = `${import.meta.env.VITE_BACKEND_URL}/sokoni-api`;


const sokoniApi = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true,
});


// sokoniApi.interceptors.request.use(
//     async (config) => {
//          const store = (await import('../app/store')).default;
//     // No need to manually add Authorization header for cookie-based auth
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
//)

// export const setAccessToken = (token) => {
//     sokoniApi.interceptors.request.use((config) => {
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     });
// };



export default sokoniApi;