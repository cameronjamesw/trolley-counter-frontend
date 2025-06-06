import React, { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import { Button } from 'react-bootstrap';

function SignInSignUp() {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => setIsSignUp(prev => !prev);

  return (
    <div className="auth-container">
      {isSignUp ? <SignUpForm /> : <SignInForm />}
      <Button variant="link" className='text-white' onClick={toggleForm}>
        {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
      </Button>
    </div>
  );
}

export default SignInSignUp;