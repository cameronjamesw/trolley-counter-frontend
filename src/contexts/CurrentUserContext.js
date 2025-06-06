import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useNavigate } from "react-router-dom";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";

// Contexts and hooks
export const currentUserContext = createContext();
export const setCurrentUserContext = createContext();
export const useCurrentUser = () => useContext(currentUserContext);
export const useSetCurrentUser = () => useContext(setCurrentUserContext);

export const CurrentUserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  const handleMount = async () => {
    try {
      const { data } = await axiosRes.get("/dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      // silent fail if user not logged in
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
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
      (err) => Promise.reject(err)
    );

    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
            return axios(err.config); // retry original request
          } catch (refreshErr) {
            setCurrentUser((prevUser) => {
              if (prevUser) navigate("/signin");
              return null;
            });
            return Promise.reject(refreshErr);
          }
        }
        return Promise.reject(err);
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