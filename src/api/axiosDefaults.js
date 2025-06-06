import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://trolley-counter-backend-3f175e45a111.herokuapp.com",
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

export default axiosInstance;

export const axiosReq = axios.create();
export const axiosRes = axios.create();