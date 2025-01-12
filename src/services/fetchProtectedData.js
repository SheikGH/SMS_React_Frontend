
const fetchProtectedData = async (apiPath) => {
  
  const apiUrl = process.env.REACT_APP_API_URL;
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.get(apiUrl + apiPath, {
          headers: { Authorization: token }
        });
        console.log('Protected data:', response.data);
        return response.data;
      } catch (error) {
        console.error('Error fetching protected data', error);
      }
    }
  };