import React from 'react';
import { useDispatch } from 'react-redux';
import { signInWithFacebook, signInWithGithub, signInWithGoogle } from 'redux/actions/authActions';

const SocialLogin = ({ isLoading, providerSelected }) => {
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
            >
                <i className="fab fa-facebook" />
                <span>Continue with Facebook</span>
            </button>
            <button
                className="button auth-provider-button provider-google"
                disabled={isLoading}
                onClick={onSignInWithGoogle}
            >
                <i className="fab fa-google" />
                <span>Continue with Google</span>
            </button>
            <button
                className="button auth-provider-button provider-github"
                disabled={isLoading}
                onClick={onSignInWithGithub}
            >
                <i className="fab fa-github" />
                <span>Continue with GitHub</span>
            </button>
        </div>
    )
};

export default SocialLogin;
