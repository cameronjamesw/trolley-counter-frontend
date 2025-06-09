import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useNavigate } from "react-router-dom";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";
import { jwtDecode } from "jwt-decode"; // Make sure this is installed

export const currentUserContext = createContext();
export const setCurrentUserContext = createContext();
export const useCurrentUser = () => useContext(currentUserContext);
export const useSetCurrentUser = () => useContext(setCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  // Fetch current user on mount
  const handleMount = async () => {
    const access = localStorage.getItem("access");
    if (!access) return;
  
    try {
      const { data } = await axiosRes.get("/dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      // Not logged in or token expired
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useEffect(() => {
    const requestInterceptor = axiosReq.interceptors.request.use(
      async (config) => {
        const refresh = localStorage.getItem("refresh");
        if (shouldRefreshToken() && refresh) {
          try {
            const { data } = await axiosReq.post("/dj-rest-auth/token/refresh/", {
              refresh,
            });
  
            localStorage.setItem("access", data.access);
            config.headers.Authorization = `Bearer ${data.access}`;
  
            const now = Math.floor(Date.now() / 1000);
            localStorage.setItem("tokenTimestamp", now + 60); // update timestamp
          } catch (err) {
            setCurrentUser((prev) => {
              if (prev) navigate("/signin");
              return null;
            });
            removeTokenTimestamp();
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  
    const responseInterceptor = axiosRes.interceptors.response.use(
      (response) => response,
      async (error) => {
        const refresh = localStorage.getItem("refresh");
        if (error.response?.status === 401 && refresh) {
          try {
            const { data } = await axiosReq.post("/dj-rest-auth/token/refresh/", {
              refresh,
            });
  
            localStorage.setItem("access", data.access);
            error.config.headers.Authorization = `Bearer ${data.access}`;
            return axiosReq(error.config);
          } catch (refreshError) {
            setCurrentUser((prev) => {
              if (prev) navigate("/signin");
              return null;
            });
            removeTokenTimestamp();
          }
        }
        return Promise.reject(error);
      }
    );
  
    return () => {
      axiosReq.interceptors.request.eject(requestInterceptor);
      axiosRes.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate, setCurrentUser]);

  return (
    <currentUserContext.Provider value={currentUser}>
      <setCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </setCurrentUserContext.Provider>
    </currentUserContext.Provider>
  );
};
