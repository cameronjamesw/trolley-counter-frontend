import { axiosReq, axiosRes } from "../../api/axiosDefaults";
import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSetCurrentUser } from "../../contexts/CurrentUserContext";
import { setTokenTimestamp } from "../../utils/utils";

const SignInForm = () => {
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const setCurrentUser = useSetCurrentUser();

  const { username, password } = signInData;
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors({}); // clear previous errors
  
    try {
      const { data } = await axiosReq.post("/api/token/", signInData);
      console.log("Login response data:", data);
  
      // Defensive: Check tokens presence before anything else
      if (!data.access || !data.refresh) {
        console.error("Tokens missing in login response", data);
        setErrors({ non_field_errors: ["Login failed: Tokens missing from response"] });
        return;
      }
  
      localStorage.setItem("access", data.access);
      localStorage.setItem("refresh", data.refresh);
  
      // Defensive token timestamp setting
      try {
        setTokenTimestamp(data.access);
      } catch (error) {
        console.error("Error setting token timestamp:", error);
        // Continue anyway, token timestamp not critical
      }
  
      // Fetch user info
      try {
        const userResponse = await axiosReq.get("/dj-rest-auth/user/");
        console.log("User fetched:", userResponse.data);
        setCurrentUser(userResponse.data);
      } catch (userError) {
        console.error("Failed to fetch user after login:", userError);
        setErrors({ non_field_errors: ["Failed to fetch user data"] });
      }
    } catch (err) {
      // Handle login errors here
      console.error("Login error caught:", err);
  
      if (err.response?.data) {
        setErrors(err.response.data);
      } else if (err.message) {
        setErrors({ non_field_errors: [err.message] });
      } else {
        setErrors({ non_field_errors: ["An unknown error occurred"] });
      }
    }
  };
  

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text-white my-4">Sign In</h1>

      {Array.isArray(errors?.non_field_errors) &&
        errors.non_field_errors.map((msg, idx) => (
          <Alert key={idx} variant="danger">
            {msg}
          </Alert>
        ))}

      <Form.Group className="mt-4" controlId="username">
        <Form.Label className="d-none">Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          name="username"
          value={username}
          onChange={handleChange}
        />
      </Form.Group>
      {Array.isArray(errors?.username) &&
        errors.username.map((msg, idx) => (
          <Alert key={idx} variant="danger">
            {msg}
          </Alert>
        ))}

      <Form.Group className="mt-4" controlId="password">
        <Form.Label className="d-none">Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </Form.Group>
      {Array.isArray(errors?.password) &&
        errors.password.map((msg, idx) => (
          <Alert key={idx} variant="danger">
            {msg}
          </Alert>
        ))}

      <Button variant="success" className="mt-4" type="submit">
        Submit
      </Button>

      <div className="mt-4">
        <Link className="text-white" to="/sign-up/">
          Don't have an account? Sign Up
        </Link>
      </div>
    </Form>
  );
};

export default SignInForm;
