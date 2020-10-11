import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import useDidMount from 'hooks/useDidMount';
import useDocumentTitle from 'hooks/useDocumentTitle';
import {
	signIn,
	signInWithGoogle,
	signInWithFacebook,
	signInWithGithub
} from 'redux/actions/authActions';
import Input from 'components/ui/Input';
import { Route } from 'constants/routes';
import CircularProgress from 'components/ui/CircularProgress';
import { RootState } from 'types/types';

const SignIn: React.FC<RouteComponentProps> = (props) => {
	const { authStatus, isAuthenticating } = useSelector((state: RootState) => ({
		authStatus: state.app.authStatus,
		isAuthenticating: state.app.isAuthenticating
	}));
	const [providerSelected, setProviderSelected] = useState('');

	/* separate states so that when user navigates to signup or forgot password,
	the authStatus message won't display to other routes.
  */
	const [signInStatus, setSignInStatus] = useState<any>({});
	const [isSigningIn, setIsSigningIn] = useState(false);
	const [field, setField] = useState<any>({});
	// --- 
	const dispatch = useDispatch();
	const didMount = useDidMount();

	useDocumentTitle('Sign In | Salinaka');
	useEffect(() => {
		if (didMount) {
			setSignInStatus(authStatus);
			setIsSigningIn(isAuthenticating);
		}
	}, [authStatus, isAuthenticating]);

<<<<<<< HEAD:src/views/auth/signin/index.tsx
=======

>>>>>>> 8577603228250acd4278f07b4a77199e7a391d5f:src/views/auth/signin/index.js
	const onEmailInput = (value, error) => {
		setField({ ...field, email: { value, error } });
	};

	const onPasswordInput = (value, error) => {
		setField({ ...field, password: { value, error } });
	};

	const onSignUp = () => props.history.push('/signup');

	const onSignInWithGoogle = () => {
		dispatch(signInWithGoogle());
		setProviderSelected('google');
	};

	const onSignInWithFacebook = () => {
		dispatch(signInWithFacebook());
		setProviderSelected('facebook');
	};

	const onSignInWithGithub = () => {
		dispatch(signInWithGithub());
		setProviderSelected('github');
	};

	const onSubmitForm = (e) => {
		e.preventDefault();
		const noError = Object.keys(field).every(key => !!field[key].value && !field[key].error);

		if (noError) {
			dispatch(signIn({ email: field.email.value, password: field.password.value }));
			setProviderSelected('signin');
		}
	};

	const onClickLink = (e) => {
		if (isSigningIn) e.preventDefault();
	};

	const isSuccess = !!authStatus.success && authStatus.type === 'auth';

	return (
		<div className="signin-content">
			{isSuccess && (
				<div className="loader">
					<h3 className="toast-success signin-success">
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
					<div className={`signin ${signInStatus.message && (!authStatus.success && 'input-error')}`}>
						<div className="signin-main">
							<h3>Sign in to Salinaka</h3>
							<br />
							<div className="signin-wrapper">
								<form onSubmit={onSubmitForm}>
									<div className="signin-field">
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
									<div className="signin-field">
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
									<div className="signin-field signin-action">
										<Link
											onClick={onClickLink}
											style={{ textDecoration: 'underline' }}
											to={Route.FORGOT_PASSWORD}
										>
											<span>Forgot password?</span>
										</Link>
										<button
											className="button signin-button"
											disabled={isSigningIn}
											type="submit"
										>
											<CircularProgress
												theme="light"
												visible={isSigningIn && providerSelected === 'signin'}
											/>
											{isSigningIn && providerSelected === 'signin' ? 'Signing In' : 'Sign In'}
										</button>
									</div>
								</form>
							</div>
						</div>
						<div className="signin-divider">
							<h6>OR</h6>
						</div>
						<div className="signin-provider">
							<button
								className="button signin-provider-button provider-facebook"
								disabled={isSigningIn}
								onClick={onSignInWithFacebook}
							>
								{isSigningIn && providerSelected === 'facebook' ? (
									<CircularProgress theme="light" />
								) : (
										<i className="fab fa-facebook" />
									)}
								<span>Sign in with Facebook</span>
							</button>
							<button
								className="button signin-provider-button provider-google"
								disabled={isSigningIn}
								onClick={onSignInWithGoogle}
							>
								{isSigningIn && providerSelected === 'google' ? (
									<CircularProgress theme="dark" />
								) : (
										<i className="fab fa-google" />
									)}
								<span>Sign in with Google</span>
							</button>
							<button
								className="button signin-provider-button provider-github"
								disabled={isSigningIn}
								onClick={onSignInWithGithub}
							>
								{isSigningIn && providerSelected === 'github' ? (
									<CircularProgress theme="light" />
								) : (
										<i className="fab fa-github" />
									)}
								<span>Sign in with GitHub</span>
							</button>
						</div>
					</div>
					<div className="signin-message">
						<span className="signin-info">
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
