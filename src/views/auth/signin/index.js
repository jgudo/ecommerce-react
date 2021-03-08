import { CircularProgress, Input, SocialLogin } from 'components/common';
import { FORGOT_PASSWORD } from 'constants/routes';
import { useDidMount, useDocumentTitle, useScrollTop } from 'hooks';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signIn } from 'redux/actions/authActions';

const SignIn = (props) => {
	const { authStatus, isAuthenticating } = useSelector(state => ({
		authStatus: state.app.authStatus,
		isAuthenticating: state.app.isAuthenticating
	}));

	/* separate states so that when user navigates to signup or forgot password,
	the authStatus message won't display to other routes.
  */
	const [signInStatus, setSignInStatus] = useState({});
	const [isSigningIn, setIsSigningIn] = useState(false);
	const [field, setField] = useState({});
	// --- 
	const dispatch = useDispatch();
	const didMount = useDidMount();

	useScrollTop();
	useDocumentTitle('Sign In | Salinaka');
	useEffect(() => {
		if (didMount) {
			setSignInStatus(authStatus);
			setIsSigningIn(isAuthenticating);
		}
	}, [authStatus, isAuthenticating]);


	const onEmailInput = (value, error) => {
		setField({ ...field, email: { value, error } });
	};

	const onPasswordInput = (value, error) => {
		setField({ ...field, password: { value, error } });
	};

	const onSignUp = () => props.history.push('/signup');

	const onSubmitForm = (e) => {
		e.preventDefault();
		const noError = Object.keys(field).every(key => !!field[key].value && !field[key].error);

		if (noError) {
			dispatch(signIn(field.email.value, field.password.value));
		}
	};

	const onClickLink = (e) => {
		if (isSigningIn) e.preventDefault();
	};

	const isSuccess = !!authStatus.success && authStatus.type === 'auth';

	return (
		<div className="auth-content">
			{isSuccess && (
				<div className="loader">
					<h3 className="toast-success auth-success">
						{authStatus.message}
						<CircularProgress />
					</h3>
				</div>
			)}
			{signInStatus.message && (
				<h5 className="text-center toast-error">
					{authStatus.message}
				</h5>
			)}
			{!isSuccess && (
				<>
					<div className={`auth ${signInStatus.message && (!authStatus.success && 'input-error')}`}>
						<div className="auth-main">
							<h3>Sign in to Salinaka</h3>
							<br />
							<div className="auth-wrapper">
								<form onSubmit={onSubmitForm}>
									<div className="auth-field">
										<Input
											label="Email"
											readOnly={isSigningIn}
											placeholder="text@example.com"
											onInputChange={onEmailInput}
											isRequired={true}
											field="email"
											type="email"
										/>
									</div>
									<div className="auth-field">
										<Input
											label="Password"
											readOnly={isSigningIn}
											placeholder="Your Password"
											onInputChange={onPasswordInput}
											isRequired={true}
											showError={false}
											field="password"
											type="password"
										/>
									</div>
									<br />
									<div className="auth-field auth-action">
										<Link
											onClick={onClickLink}
											style={{ textDecoration: 'underline' }}
											to={FORGOT_PASSWORD}
										>
											<span>Forgot password?</span>
										</Link>
										<button
											className="button auth-button"
											disabled={isSigningIn}
											type="submit"
										>
											<CircularProgress
												theme="light"
												visible={isSigningIn}
											/>
											{isSigningIn ? 'Signing In' : 'Sign In'}
										</button>
									</div>
								</form>
							</div>
						</div>
						<div className="auth-divider">
							<h6>OR</h6>
						</div>
						<SocialLogin isLoading={isSigningIn} />
					</div>
					<div className="auth-message">
						<span className="auth-info">
							<strong>Don't have an account?</strong>
						</span>
						<button
							className="button button-small button-border button-border-gray"
							disabled={isSigningIn}
							onClick={onSignUp}
						>
							Sign Up
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default SignIn;
