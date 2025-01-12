import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// // Request Interceptor
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // Modify request config before sending request
//     // const token = localStorage.getItem('token');
//     // if (token) {
//     //   config.headers.Authorization = `Bearer ${token}`;
//     // }
//     return config;
//   },
//   (error) => {
//     // Handle request error
//     console.log('error:',error);
//     return Promise.reject(error);
//   }
// );

// // Response Interceptor
// axiosInstance.interceptors.response.use(
//   (response) => {
//     // Modify response data
//     return response;
//   },
//   (error) => {
//     // const navigate = useNavigate();
//     // // Handle response error
//     // if (error.response.status === 401) {
//     //   // handle unauthorized access (e.g., redirect to login)
//     //   navigate("/");
//     // }
//     console.log('error:',error);
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
