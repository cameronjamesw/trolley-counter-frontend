import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "https://trolley-counter-91842d1b0f5e.herokuapp.com",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });
  
  export default axiosInstance;