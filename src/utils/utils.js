import {jwtDecode} from "jwt-decode";

/**
 * Decode refresh token from API and save in local storage
 * @param {object} data Data returned from the API when the user logs in
 */
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