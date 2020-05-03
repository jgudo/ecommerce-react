import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'; 
import useFieldHandler from 'hooks/useFieldHandler';
import { signUp, setAuthStatus, isAuthenticating as authenticating } from 'actions/authActions';

import CircularProgress from 'components/ui/CircularProgress';

const SignUp = (props) => {
  const [passwordHidden, setPasswordHidden] = useState(true);
  const { isAuthenticating, authStatus } = useSelector(state => ({
    isAuthenticating: state.app.isAuthenticating,
    authStatus: state.app.authStatus
  }));
   const { field, setField, onFieldChange, errorField } = useFieldHandler({
    email: '',
    password: ''
  });
  const dispatch = useDispatch();
  const passwordField = useRef(null);

  useEffect(() => {
    return () => {
      dispatch(setAuthStatus(null));
      dispatch(authenticating(false));
    }
  }, []);
  
  const onEmailInput = (e) => onFieldChange(e, 'email', false);

  const onFullnameInput = (e) => onFieldChange(e, 'fullname', false);

  const onPasswordInput = (e) => onFieldChange(e, 'password', false);

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (field.fullname && field.email && field.password) {
      dispatch(signUp({ ...field }));
    } 
  };

  const onTogglePasswordVisibility = () => setPasswordHidden(!passwordHidden);

  const onClickSignIn = () => props.history.push('/signin');

  const errorClassName = (key) => {
    return errorField[key] ? 'input-error' : '';
  };

  return (
    <div className="signup">
      {authStatus && (
        <h5 className={`text-center ${authStatus.success ? 'toast-success' : 'toast-error'}`}>
          {authStatus.message}
        </h5>
      )}
      <div className={`signup-wrapper ${authStatus && (!authStatus.success && 'input-error')}`}>
        <h3>Sign up to Salinaka</h3>
        <form onSubmit={onFormSubmit}>
          <div className="signup-field">
            {errorField.fullname ? <span className="input-message">{errorField.fullname}</span> : (
              <span className="d-block padding-s">Full Name</span>
            )}
            <input 
                className={`input-form d-block ${errorClassName('fullname')}`}
                maxLength={40}
                onKeyUp={onFullnameInput}
                placeholder="John Doe"
                readOnly={isAuthenticating}
                style={{ textTransform: 'capitalize' }}
                type="text" 
            />
          </div>
          <div className="signup-field">
            {errorField.email ? <span className="input-message">{errorField.email}</span> : (
              <span className="d-block padding-s">Email</span>
            )}
            <input 
                className={`input-form d-block ${errorClassName('email')}`}
                maxLength={40}
                onInput={onEmailInput}
                placeholder="test@example.com"
                readOnly={isAuthenticating}
                type="email" 
            />
          </div>
          <div className="signup-field">
            {errorField.password ? <span className="input-message">{errorField.password}</span> : (
              <span className="d-block padding-s">Password</span>
            )}
            <div className="d-flex">
              <input
                  className={`input-form d-block margin-0 ${errorClassName('password')}`}
                  maxLength={40}
                  onInput={onPasswordInput}
                  placeholder="Password" 
                  readOnly={isAuthenticating}
                  ref={passwordField}
                  type={passwordHidden ? 'password' : 'text'}
              />
              <button 
                  className="button button-small button-muted"
                  disabled={isAuthenticating}
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

export default SignUp;
