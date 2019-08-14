import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { signIn } from '../../actions/authActions';

import CircularProgress from '../ui/CircularProgress';

const SignIn = (props) => {
  const { dispatchSignIn, status, loading } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorField, setErrorField] = useState({});

  const onEmailInput = (e) => {
    const val = e.target.value.trim();
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    
    if (val === '') {
      setErrorField({ ...errorField, email: 'Email is required' });
    } else if (!regex.test(val)) {
      setErrorField({ ...errorField, email: 'Email is invalid' });
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

  const onSubmitForm = (e) => {
    e.preventDefault();
    const noError = (!!email && !!password) && !errorField.email && !errorField.password;

    if (noError) {
      dispatchSignIn(email, password);
    }
  };

  const onSignUp = () => {
    props.history.push('/signup');
  };

  const errorClassName = (field) => {
    return errorField[field] ? 'input-error' : '';
  };

  return (
    <div className="signin">
      {status && <strong><span className="input-message text-center padding-s">{status}</span></strong>}
      <div className="signin-wrapper">
        <h3>Sign in to Salinaka</h3>
        {errorField.auth && <span className="input-message">{errorField.auth}</span>}
        <form onSubmit={onSubmitForm}>
          <div className="signin-field">
            {errorField.email && <span className="input-message">{errorField.email}</span>}
            <span className="d-block padding-s">Email</span>
            <input 
                className={`input-form d-block ${errorClassName('email')}`}
                onChange={onEmailInput}
                placeholder="test@example.com"
                readOnly={loading}
                type="email"
            />
          </div>
          <div className="signin-field">
            {errorField.password && <span className="input-message">{errorField.password}</span>}
            <span className="d-block padding-s">Password</span>
            <input 
                className={`input-form d-block ${errorClassName('password')}`}
                onChange={onPasswordInput}
                placeholder="Your Password"
                readOnly={loading}
                type="password"
            />
          </div>
          <br/>
          <div className="signin-field signin-action">
            <button
                className="button"
                disabled={loading}
                type="submit"
            >
              <CircularProgress visible={loading} theme="light" />
              Sign In
            </button>
          </div>
        </form>
      </div>
      <div className="signin-message">
        <span className="signin-info">
          <strong>Don't have an account?</strong>
        </span>
        <button 
            className="button button-border button-border-gray"
            disabled={loading}
            onClick={onSignUp}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth, app }) => ({
  status: auth.authStatus,
  loading: app.loading
});

const mapDispatchToProps = dispatch => ({
  dispatchSignIn: (email, password) => dispatch(signIn(email, password))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
