import React from 'react'
import { Button, Form } from 'react-bootstrap'

const SignInForm = () => {
  return (
    <Form>
        <h1 className='text-white my-4'>Sign In Form</h1>
      <Form.Group className="mt-4" controlId="formBasicEmail">
        <Form.Label className='d-none'>Username</Form.Label>
        <Form.Control type="email" placeholder="Enter username" />
      </Form.Group>

      <Form.Group className="mt-4" controlId="formBasicPassword">
        <Form.Label className='d-none'>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Button variant="success" className='mt-4' type="submit">
        Submit
      </Button>
    </Form>
  )
}

export default SignInForm
