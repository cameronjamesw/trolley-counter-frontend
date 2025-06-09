import { jwtDecode } from "jwt-decode";

export const setTokenTimestamp = (access) => {
  try {
    const decoded = jwtDecode(access);
    localStorage.setItem("tokenTimestamp", decoded.exp);
  } catch (err) {
    console.error("Failed to decode token:", err);
  }
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("tokenTimestamp");
};

export const shouldRefreshToken = () => {
  const timestamp = localStorage.getItem("tokenTimestamp");
  if (!timestamp) return false;

  const buffer = 60; // seconds before actual expiry
  const now = Math.floor(Date.now() / 1000);
  return now >= timestamp - buffer;
};