import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../firebase/firebase';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorField, setErrorField] = useState({});

  const onSubmitForm = (e) => {
    e.preventDefault();
    const noError = (!!email && !!password) && !errorField.email && !errorField.password;
    console.log(noError);
    if (noError) {
      firebase.signIn(email, password)
        .then((auth) => {
          console.log(auth);
        })
        .catch((e) => {
          setErrorField({ ...errorField, auth: 'Email or password is invalid' });
        });
    }
  };

  const onEmailInput = (e) => {
    const val = e.target.value;
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (!regex.test(val)) {
      setErrorField({ ...errorField, email: 'Email is invalid' });
    } else if (val === '') {
      setErrorField({ ...errorField, email: 'Email is required' });
    } else {
      setEmail(val);
      setErrorField({ ...errorField, email: '' });
    }
  };

  const onPasswordInput = (e) => {
    const val = e.target.value.trim();

    if (val === '') {
      setErrorField({ ...errorField, password: 'Password is required' });
    } else if (val.length < 6) {
      setErrorField({ ...errorField, password: 'Password length must be greater than 6' });
    } else {
      setPassword(val);
      setErrorField({ ...errorField, password: '' });
    }
  };

  const errorClassName = (field) => {
    return errorField[field] ? 'input-error' : '';
  };

  return (
    <div className="signin">
      <div>
        <div className="signin-wrapper">
          <h3>Sign in to Salinaka</h3>
          {errorField.auth && <span className="input-message">{errorField.auth}</span>}
          <form onSubmit={onSubmitForm}>
            <div className="signin-field">
              {errorField.email && <span className="input-message">{errorField.email}</span>}
              <input 
                  className={`input-form d-block ${errorClassName('email')}`}
                  onChange={onEmailInput}
                  placeholder="test@example.com"
                  type="email"
              />
            </div>
            <div className="signin-field">
              {errorField.password && <span className="input-message">{errorField.password}</span>}
              <input 
                  className={`input-form d-block ${errorClassName('password')}`}
                  onChange={onPasswordInput}
                  placeholder="Your Password"
                  type="password"
              />
            </div>
            <br/>
            <div className="signin-field signin-action">
              <button
                  className="button"
                  type="submit"
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
