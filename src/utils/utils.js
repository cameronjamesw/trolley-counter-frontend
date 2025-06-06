import { jwtDecode } from "jwt-decode";

export const setTokenTimestamp = (data) => {
    const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
    localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
  };
  
  /**
   * Check if there is a refresh token
   * @returns boolean
   */
  export const shouldRefreshToken = () => {
    return !!localStorage.getItem("refreshTokenTimestamp");
  };
  
  /**
   * Clean up local storage
   */
  export const removeTokenTimestamp = () => {
    localStorage.removeItem("refreshTokenTimestamp");
  };