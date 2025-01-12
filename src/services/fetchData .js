import axiosInstance from './axiosConfig';

const fetchData = async () => {
  try {
    const response = await axiosInstance.get('/data');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};
