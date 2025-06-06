import axios from "../../api/axiosDefaults";
import React, { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";

const SignInForm = () => {
  const [signInData, setSignInData] = useState({
    username: "",
    password: ""
  });

  const { username, password } = signInData;
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data, status } = await axios.post('/dj-rest-auth/login/', signInData);
      if (status === 200) {
        console.log("Login successful!", data);
        // Handle redirect or auth state update here
      }
    } catch (err) {
      console.log("Full error response:", err.response?.data);
      setErrors(err.response?.data || {});
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1 className='text-white my-4'>Sign In</h1>

      {Array.isArray(errors?.non_field_errors) &&
        errors.non_field_errors.map((msg, idx) => (
          <Alert key={idx} variant="danger">
            {msg}
          </Alert>
        ))}

      <Form.Group className="mt-4" controlId="username">
        <Form.Label className='d-none'>Username</Form.Label>
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
        <Form.Label className='d-none'>Password</Form.Label>
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

      <Button variant="success" className='mt-4' type="submit">
        Submit
      </Button>

      <div className="mt-4">
      <Link className='text-white' to="/sign-up/">
        Don't have an account? Sign Up
      </Link>
    </div>
    </Form>
  );
};

export default SignInForm;