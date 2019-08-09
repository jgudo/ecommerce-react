import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
  return (
    <div className="signin">
      <div>
        <div className="signin-wrapper">
          <h3>Sign in to Salinaka</h3>
          <form>
            <div className="signin-field">
              <span className="d-block padding-s">Email</span>
              <input 
                  className="input-form d-block"
                  placeholder="test@example.com"
                  required
                  type="email"
              />
            </div>
            <div className="signin-field">
              <span className="d-block padding-s">Password</span>
              <input 
                  className="input-form d-block"
                  placeholder="Your Password"
                  required
                  type="password"
              />
            </div>
            <br/>
            <div className="signin-field signin-action">
              <button
                  className="button"
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
        <div className="signin-message">
          <span className="signin-info">
            <strong>Don't have an account?</strong>
          </span>
          <Link 
              className="button button-border button-border-gray button-small"
              to="/signup" 
          >
            Sign Up
          </Link>
        </div>
      </div>  
    </div>
  );
};

export default SignIn;
