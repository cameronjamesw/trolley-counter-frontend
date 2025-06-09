import axios from "axios";

const baseURL = "https://trolley-counter-backend-3f175e45a111.herokuapp.com";

// Helper to get the current access token from localStorage
const getAccessToken = () => localStorage.getItem("access");

// Request config function to dynamically include token
const authHeaders = () => ({
  "Content-Type": "multipart/form-data",
  ...(getAccessToken() && {
    Authorization: `Bearer ${getAccessToken()}`,
  }),
});

export const axiosReq = axios.create({
  baseURL,
  headers: authHeaders(),
  withCredentials: true,
});

export const axiosRes = axios.create({
  baseURL,
  headers: authHeaders(),
  withCredentials: true,
});