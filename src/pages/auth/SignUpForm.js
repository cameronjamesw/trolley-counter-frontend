import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { useRedirect } from "../../hooks/useRedirect";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: "",
  });

  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  useRedirect(currentUser ? "loggedIn" : "loggedOut");

  if (currentUser === undefined) {
    return null; // or loading spinner
  }

  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});

  const { username, email, password1, password2 } = signUpData;

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axiosReq.post(
        "/dj-rest-auth/registration/",
        signUpData
      );
      navigate('/sign-in/');
      if (response.status === 201 || response.status === 200) {
        setSuccessMessage("Account created successfully!");
        setErrors({});
        setSignUpData({
          username: "",
          email: "",
          password1: "",
          password2: "",
        });
      }
    } catch (err) {
      console.log("Signup error response:", err.response?.data);
      setSuccessMessage("");
      setErrors(err.response?.data || {});
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className="text-white my-3">Sign Up</h1>
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
          <Alert variant="danger" key={idx}>
            {msg}
          </Alert>
        ))}

      <Form.Group className="mt-4" controlId="email">
        <Form.Label className="d-none">Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        {Array.isArray(errors?.email) &&
          errors.email.map((msg, idx) => (
            <Alert variant="danger" key={idx}>
              {msg}
            </Alert>
          ))}
      </Form.Group>
      <Form.Group className="mt-4" controlId="password1">
        <Form.Label className="d-none">Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password1"
          value={password1}
          onChange={handleChange}
        />
      </Form.Group>
      {Array.isArray(errors?.password1) &&
        errors.password1.map((msg, idx) => (
          <Alert variant="danger" key={idx}>
            {msg}
          </Alert>
        ))}

      <Form.Group className="mt-4" controlId="password2">
        <Form.Label className="d-none">Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          name="password2"
          value={password2}
          onChange={handleChange}
        />
      </Form.Group>
      {Array.isArray(errors?.password2) &&
        errors.password2.map((msg, idx) => (
          <Alert variant="danger" key={idx}>
            {msg}
          </Alert>
        ))}

      <Button variant="success" className="mt-4" type="submit">
        Submit
      </Button>
      {successMessage && (
        <Alert variant="success" className="mt-4">
          {successMessage}
        </Alert>
      )}

      <div className="mt-4">
        <Link className="text-white" to="/sign-in/">
          Already have an account? Sign In
        </Link>
      </div>
    </Form>
  );
};

export default SignUpForm;
