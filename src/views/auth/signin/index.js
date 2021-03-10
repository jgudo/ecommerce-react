import { ArrowRightOutlined, LoadingOutlined } from '@ant-design/icons';
import { CircularProgress, SocialLogin } from 'components/common';
import { CustomInput } from 'components/formik';
import { FORGOT_PASSWORD } from 'constants/routes';
import { Field, Form, Formik } from "formik";
import { useDidMount, useDocumentTitle, useScrollTop } from 'hooks';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signIn } from 'redux/actions/authActions';
import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
	email: Yup.string()
		.email('Email is not valid.')
		.required('Email is required.'),
	password: Yup.string()
		.required('Password is required.')
});

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

	const onSignUp = () => props.history.push('/signup');

	const onSubmitForm = (form) => {
		dispatch(signIn(form.email, form.password));
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
								<Formik
									initialValues={{
										email: '',
										password: '',
									}}
									validateOnChange
									validationSchema={SignInSchema}
									onSubmit={onSubmitForm}
								>
									{() => (
										<Form>
											<div className="auth-field">
												<Field
													disabled={isSigningIn}
													name="email"
													type="email"
													label="Email"
													placeholder="test@example.com"
													component={CustomInput}
												/>
											</div>
											<div className="auth-field">
												<Field
													disabled={isSigningIn}
													name="password"
													type="password"
													label="Password"
													placeholder="Your Password"
													component={CustomInput}
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
													{isSigningIn ? 'Signing In' : 'Sign In'}
													&nbsp;
													{isSigningIn ? <LoadingOutlined /> : <ArrowRightOutlined />}
												</button>
											</div>
										</Form>
									)}
								</Formik>
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
							className="button button-small button-border button-border-gray button-icon"
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
