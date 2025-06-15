import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useNavigate } from "react-router-dom";
import { removeTokenTimestamp, setTokenTimestamp } from "../utils/utils";

export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  const handleMount = async () => {
    const access = localStorage.getItem("access");
    if (!access) return;
  
    try {
      const { data } = await axiosReq.get("/dj-rest-auth/user/", {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      setCurrentUser(data);
    } catch (err) {
      console.error("User fetch failed on mount:", err);
      setCurrentUser(null);
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useEffect(() => {
    // ✅ Request interceptor — dynamically attach access token
    const requestInterceptor = axiosReq.interceptors.request.use(
      (config) => {
        const access = localStorage.getItem("access");
        if (access) {
          config.headers.Authorization = `Bearer ${access}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // ✅ Response interceptor — refresh token on 401
    const responseInterceptor = axiosRes.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        const refresh = localStorage.getItem("refresh");

        if (
          error.response?.status === 401 &&
          refresh &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          try {
            const { data } = await axiosReq.post("/api/api/token/refresh/", {
              refresh,
            });

            localStorage.setItem("access", data.access);
            setTokenTimestamp(data.access);

            // ✅ Retry original request with new token
            originalRequest.headers.Authorization = `Bearer ${data.access}`;
            return axiosReq(originalRequest);
          } catch (refreshError) {
            setCurrentUser((prev) => {
              if (prev) navigate("/sign-in");
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
  }, [navigate]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
