import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useFieldHandler from 'hooks/useFieldHandler';
import { resetPassword, setAuthStatus, isAuthenticating as authenticating } from 'actions/authActions';

import CircularProgress from 'components/ui/CircularProgress';

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { field, setField, onFieldChange, errorField } = useFieldHandler({ email: '' });

  useEffect(() => {
    return () => {
      dispatch(setAuthStatus(null));
      dispatch(authenticating(false));
    }
  }, []);
  
  const { authStatus, isAuthenticating } = useSelector(state => ({
    isAuthenticating: state.app.isAuthenticating,
    authStatus: state.app.authStatus
  }));

  const onEmailChange = (e) => onFieldChange(e, 'email', false);

  const onSubmitEmail = () => {
    (field.email && !errorField.email) && dispatch(resetPassword(field.email));
  };

  return (
    <div className="forgot_password">
      {authStatus && ( 
        <h5 className={`text-center ${authStatus.success ? 'toast-success' : 'toast-error'}`}>
          {authStatus.message}
        </h5>
      )}
      <h3>Forgot Your Password?</h3>
      <p>Enter your email address and we will send you a password reset email.</p>
      <br/>
      <br/>
      {errorField.email && <span className="input-message">{errorField.email}</span>}
      <br/>
      <input 
          className={`input-form d-block ${errorField.email ? 'input-error' : ''}`}
          onChange={onEmailChange}
          placeholder="Enter your email"
          readOnly={isAuthenticating}
          type="text"
      />
      <br />
      <button
          className="button w-100-mobile"
          disabled={isAuthenticating}
          onClick={onSubmitEmail}
          type="button"
      >
        <CircularProgress 
            theme="light" 
            visible={isAuthenticating} 
        />
        {isAuthenticating ? 'Sending Password Reset Email' : 'Send Password Reset Email'}
      </button>
    </div>
  );
};

export default ForgotPassword;
