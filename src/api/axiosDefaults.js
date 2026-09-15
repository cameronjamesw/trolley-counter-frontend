import axios from "axios";

const baseURL = "https://trolley-counter-backend.onrender.com/";

export const axiosReq = axios.create({ baseURL, withCredentials: true });
export const axiosRes = axios.create({ baseURL, withCredentials: true });

axiosReq.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);