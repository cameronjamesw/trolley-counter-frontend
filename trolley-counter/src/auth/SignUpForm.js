import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const SignUpForm = () => {
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password1: "",
    password2: ""
  });

  const {username, email, password1, password2} = signUpData

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(signUpData)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <Form.Group className="mb-3" controlId="username">
        <Form.Label className="d-none">Username</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter username"
          name="username"
          value={username}
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label className="d-none">Email address</Form.Label>
        <Form.Control 
        type="email" 
        placeholder="Enter email" 
        name="email"
        value={email}
        onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="password1">
        <Form.Label className="d-none">Password</Form.Label>
        <Form.Control 
        type="password" 
        placeholder="Password" 
        name="password1"
        value={password1}
        onChange={handleChange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="password2">
        <Form.Label className="d-none">Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Confirm Password"
          name="password2"
          value={password2}
          onChange={handleChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default SignUpForm;
