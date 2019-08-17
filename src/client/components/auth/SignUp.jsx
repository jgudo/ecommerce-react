import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import { signUp } from '../../actions/authActions';

import CircularProgress from '../ui/CircularProgress';

const SignUp = (props) => {
  const [error, setError] = useState({});
  const [field, setField] = useState({});
  const { isAuthenticating, authStatus } = useSelector(state => ({
    isAuthenticating: state.app.isAuthenticating,
    authStatus: state.authStatus
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(undefined, 0);
  }, []);

  const onEmailInput = (e) => {
    const val = e.target.value.trim();
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (val === '') {
      setError({ ...error, email: 'Email is required' });
    } else if (!regex.test(val)) {
      setError({ ...error, email: 'Email is invalid' });
    } else {
      setField({ ...field, email: val });
      setError({ ...error, email: '' });
    }
  };

  const onFirstnameInput = (e) => {
    const val = e.target.value.trim();
    const regex = /[a-zA-Z]{2,}/;

    if (val === '') {
      setError({ ...error, firstname: 'First name is required' });
    } else if (!regex.test(val)) {
      setError({ ...error, firstname: 'First name must be at least 2 letters' });
    } else {
      setField({ ...field, firstname: val });
      setError({ ...error, firstname: '' });
    }
  };

  const onLastNameInput = (e) => {
    const val = e.target.value.trim();
    const regex = /[a-zA-Z]/g;

    if (val === '') {
      setError({ ...error, lastname: 'Last name is required' });
    } else if (!regex.test(val)) {
      setError({ ...error, lastname: 'Last name should only contain letters' });
    } else {
      setField({ ...field, lastname: val });
      setError({ ...error, lastname: '' });
    }
  };

  const onPasswordInput = (e) => {
    const val = e.target.value.trim();
    const regex = /[A-Z\W]/;

    if (val === '') {
      setError({ ...error, password: 'Password is required' });
    } else if (val.length < 8) {
      setError({ ...error, password: 'Password should be 8 characters long' });
    } else if (!regex.test(val)) {
      setError({ ...error, password: 'Password should contain uppercase or alphanumeric character' });
    } else {
      setField({ ...field, password: val });
      setError({ ...error, password: '' });
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const { firstname, lastname, email, password } = field;
    const isError = Object.keys(error).some(key => error[key] !== '') 
      || Object.keys(field).some(key => field[key] === '');

    if (!isError) {
      dispatch(signUp({ firstname, lastname, email, password }));
    } 
  };

  const errorClassName = (key) => {
    return error[key] ? 'input-error' : '';
  };

  return (
    <div className="signup">
      {authStatus && <strong><span className="input-message text-center padding-s">{authStatus}</span></strong>}
      <div className="signup-wrapper">
        <h3>Sign up to Salinaka</h3>
        <form onSubmit={onFormSubmit}>
          <div className="signup-field">
            {error.firstname && <span className="input-message">{error.firstname}</span>}
            <span className="d-block padding-s">First Name</span>
            <input 
                className={`input-form d-block ${errorClassName('firstname')}`}
                onKeyUp={onFirstnameInput}
                placeholder="First Name"
                readOnly={isAuthenticating}
                style={{ textTransform: 'capitalize' }}
                type="text" 
            />
          </div>
          <div className="signup-field">
            {error.lastname && <span className="input-message">{error.lastname}</span>}
            <span className="d-block padding-s">Last Name</span>
            <input
                className={`input-form d-block ${errorClassName('lastname')}`}
                onInput={onLastNameInput}
                placeholder="Last Name" 
                readOnly={isAuthenticating}
                style={{ textTransform: 'capitalize' }}
                type="text"
            />
          </div>
          <div className="signup-field">
            {error.email && <span className="input-message">{error.email}</span>}
            <span className="d-block padding-s">Email</span>
            <input 
                className={`input-form d-block ${errorClassName('email')}`}
                onInput={onEmailInput}
                placeholder="Your Email"
                readOnly={isAuthenticating}
                type="email" 
            />
          </div>
          <div className="signup-field">
            {error.password && <span className="input-message">{error.password}</span>}
            <span className="d-block padding-s">Password</span>
            <input
                className={`input-form d-block ${errorClassName('password')}`}
                onInput={onPasswordInput}
                placeholder="Password" 
                readOnly={isAuthenticating}
                type="password"
            />
          </div>
          <br/>
          <div className="signup-field signup-action">
            <button
                className="button"
                disabled={isAuthenticating}
            >
              <CircularProgress visible={isAuthenticating} theme="light" />
              {isAuthenticating ? 'Signing Up' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
