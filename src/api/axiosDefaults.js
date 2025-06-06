import axios from "axios";

const baseURL = "https://trolley-counter-backend-3f175e45a111.herokuapp.com";

export const axiosReq = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});

export const axiosRes = axios.create({
  baseURL,
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});