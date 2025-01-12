import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  //baseURL: 'http://localhost:5000/api/auth',
});

// export const fetchData = async (endpoint) => {
//   const response = await api.get(endpoint);
//   return response.data;
// };

export default api;
