import React, { useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import { signUp, setAuthStatus } from '../../actions/authActions';

import CircularProgress from '../../components/ui/CircularProgress';

const SignUp = (props) => {
  const dispatch = useDispatch();
  const [error, setError] = useState({});
  const [field, setField] = useState({});
  const [passwordHidden, setPasswordHidden] = useState(true);
  const { isAuthenticating, authStatus } = useSelector(state => ({
    isAuthenticating: state.app.isAuthenticating,
    authStatus: state.app.authStatus
  }));
  const passwordField = useRef(null);

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

  const onFullnameInput = (e) => {
    const val = e.target.value;
    const regex = /[^a-zA-Z\s]/g;

    if (val === '') {
      setError({ ...error, fullname: 'Full name is required.' });
    } else if (regex.test(val)) {
      setError({ ...error, fullname: 'Full name must not include special characters.' });
    } else if (val.length < 5) {
      setError({ ...error, fullname: 'Full name must be at least 5 letters.' });
    } else {
      setField({ ...field, fullname: val.trim() });
      setError({ ...error, fullname: '' });
    }
  };

  const onPasswordInput = (e) => {
    const val = e.target.value.trim();
    const regex = /[A-Z\W]/g;

    if (val === '') {
      setError({ ...error, password: 'Password is required.' });
    } else if (val.length < 8) {
      setError({ ...error, password: 'Password should be 8 characters long.' });
    } else if (!regex.test(val)) {
      setError({ ...error, password: 'Password should contain uppercase or special character.' });
    } else {
      setField({ ...field, password: val });
      setError({ ...error, password: '' });
    }
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (field.fullname && field.email && field.password) {
      dispatch(signUp({ ...field }));
    } 
  };

  const onTogglePasswordVisibility = () => {
    setPasswordHidden(!passwordHidden);
  };

  const onClickSignIn = () => {
    props.history.push('/signin');
  };

  const errorClassName = (key) => {
    return error[key] ? 'input-error' : '';
  };

  return (
    <div className="signup">
      {authStatus && <strong><span className="input-message text-center padding-s">{authStatus.message}</span></strong>}
      <div className={`signup-wrapper ${authStatus && (!authStatus.success && 'input-error')}`}>
        <h3>Sign up to Salinaka</h3>
        <form onSubmit={onFormSubmit}>
          <div className="signup-field">
            {error.fullname && <span className="input-message">{error.fullname}</span>}
            <span className="d-block padding-s">Full Name</span>
            <input 
                className={`input-form d-block ${errorClassName('fullname')}`}
                maxLength={30}
                onKeyUp={onFullnameInput}
                placeholder="Full name"
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
            <div className="d-flex">
              <input
                  className={`input-form d-block margin-0 ${errorClassName('password')}`}
                  onInput={onPasswordInput}
                  placeholder="Password" 
                  readOnly={isAuthenticating}
                  ref={passwordField}
                  type={passwordHidden ? 'password' : 'text'}
              />
              <button 
                  className="button button-small button-muted"
                  onClick={onTogglePasswordVisibility}
                  type="button"
              >
                {passwordHidden ? 'Peek' : 'Hide'}
              </button>
            </div>
          </div>
          <br/>
          <br/>
          <div className="signup-field signup-action">
            <button
                className="button signup-button"
                disabled={isAuthenticating}
                type="submit"
            >
              <CircularProgress visible={isAuthenticating} theme="light" />
              {isAuthenticating ? 'Signing Up' : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
      <div className="signin-message">
        <span className="signin-info">
          <strong>Already have an account?</strong>
        </span>
        <button 
            className="button button-small button-border button-border-gray"
            disabled={isAuthenticating}
            onClick={onClickSignIn}
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default withRouter(SignUp);
