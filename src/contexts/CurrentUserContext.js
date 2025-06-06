import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
  } from "react";
  import { axiosReq, axiosRes } from "../api/axiosDefaults";
  import { useNavigate } from "react-router-dom";
  import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";
  import { jwtDecode } from "jwt-decode"; // Make sure this is installed
  
  // Contexts and hooks
  export const currentUserContext = createContext();
  export const setCurrentUserContext = createContext();
  export const useCurrentUser = () => useContext(currentUserContext);
  export const useSetCurrentUser = () => useContext(setCurrentUserContext);
  
  export const CurrentUserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState(null);
  
    // Fetch current user on mount
    const handleMount = async () => {
      try {
        const { data } = await axiosRes.get("/dj-rest-auth/user/");
        setCurrentUser(data);
      } catch (err) {
        // Do nothing — user not authenticated
      }
    };
  
    useEffect(() => {
      handleMount();
    }, []);
  
    // Axios interceptors for token refresh
    useMemo(() => {
      // Request interceptor: refresh token if it's expired or close to expiry
      axiosReq.interceptors.request.use(
        async (config) => {
          if (shouldRefreshToken()) {
            try {
              const { data } = await axiosReq.post("/dj-rest-auth/token/refresh/", {
                refresh: localStorage.getItem("refresh"),
              });
  
              localStorage.setItem("access", data.access);
  
              // Optionally update refresh timestamp
              const decoded = jwtDecode(data.access);
              const exp = decoded.exp;
              const now = Math.floor(Date.now() / 1000);
              const buffer = 60;
              localStorage.setItem("tokenTimestamp", now + buffer);
            } catch (err) {
              setCurrentUser((prevUser) => {
                if (prevUser) navigate("/signin");
                return null;
              });
              removeTokenTimestamp();
              return config;
            }
          }
          return config;
        },
        (error) => Promise.reject(error)
      );
  
      // Response interceptor: retry failed requests on 401 by refreshing token
      axiosRes.interceptors.response.use(
        (response) => response,
        async (error) => {
          if (error.response?.status === 401) {
            try {
              const { data } = await axiosReq.post("/dj-rest-auth/token/refresh/", {
                refresh: localStorage.getItem("refresh"),
              });
  
              localStorage.setItem("access", data.access);
  
              // Retry original request with new access token
              error.config.headers.Authorization = `Bearer ${data.access}`;
              return axiosReq(error.config);
            } catch (refreshError) {
              setCurrentUser((prevUser) => {
                if (prevUser) navigate("/signin");
                return null;
              });
              removeTokenTimestamp();
              return Promise.reject(refreshError);
            }
          }
          return Promise.reject(error);
        }
      );
    }, [navigate]);
  
    return (
      <currentUserContext.Provider value={currentUser}>
        <setCurrentUserContext.Provider value={setCurrentUser}>
          {children}
        </setCurrentUserContext.Provider>
      </currentUserContext.Provider>
    );
  };
  