import { jwtDecode } from "jwt-decode";

export const setTokenTimestamp = (accessToken) => {
  try {
    const decoded = jwtDecode(accessToken);
    const now = Math.floor(Date.now() / 1000);
    const buffer = 60;

    localStorage.setItem("tokenTimestamp", now + buffer);
  } catch (error) {
    console.error("Failed to decode access token:", error);
  }
};

export const removeTokenTimestamp = () => {
  localStorage.removeItem("tokenTimestamp");
};

export const shouldRefreshToken = () => {
  const timestamp = localStorage.getItem("tokenTimestamp");
  return timestamp && parseInt(timestamp, 10) < Math.floor(Date.now() / 1000);
};
