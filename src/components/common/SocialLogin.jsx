import { FacebookOutlined, GithubFilled, GoogleOutlined } from '@ant-design/icons';
import PropType from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { signInWithFacebook, signInWithGithub, signInWithGoogle } from 'redux/actions/authActions';

const SocialLogin = ({ isLoading }) => {
  const dispatch = useDispatch();

  const onSignInWithGoogle = () => {
    dispatch(signInWithGoogle());
  };

  const onSignInWithFacebook = () => {
    dispatch(signInWithFacebook());
  };

  const onSignInWithGithub = () => {
    dispatch(signInWithGithub());
  };

  return (
    <div className="auth-provider">
      <button
        className="button auth-provider-button provider-facebook"
        disabled={isLoading}
        onClick={onSignInWithFacebook}
        type="button"
      >
        {/* <i className="fab fa-facebook" /> */}
        <FacebookOutlined />
        Continue with Facebook
      </button>
      <button
        className="button auth-provider-button provider-google"
        disabled={isLoading}
        onClick={onSignInWithGoogle}
        type="button"
      >
        <GoogleOutlined />
        Continue with Google
      </button>
      <button
        className="button auth-provider-button provider-github"
        disabled={isLoading}
        onClick={onSignInWithGithub}
        type="button"
      >
        <GithubFilled />
        Continue with GitHub
      </button>
    </div>
  );
};

SocialLogin.propTypes = {
  isLoading: PropType.bool.isRequired
};

export default SocialLogin;
