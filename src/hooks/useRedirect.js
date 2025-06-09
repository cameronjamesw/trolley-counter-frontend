import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useRedirect = (userAuthStatus) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (userAuthStatus === "loggedIn") {
      console.log("User is logged in — redirecting from sign-in page");
      navigate("/"); // or wherever you want logged-in users to go
    }
  }, [navigate, userAuthStatus]);
};