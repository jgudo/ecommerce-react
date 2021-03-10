import { CircularProgress, SocialLogin } from 'components/common';
import { CustomInput } from 'components/formik';
import { Field, Form, Formik } from 'formik';
import { useDidMount, useDocumentTitle, useScrollTop } from 'hooks';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUp } from 'redux/actions/authActions';
import * as Yup from 'yup';

const SignInSchema = Yup.object().shape({
	email: Yup.string()
		.email('Email is not valid.')
		.required('Email is required.'),
	password: Yup.string()
		.required('Password is required.')
		.min(8, 'Password length should be at least 8 characters.')
		.matches(/[A-Z\W]/g, 'Password should contain at least 1 uppercase letter.'),
	fullname: Yup.string()
		.required('Full name is required.')
		.min(4, 'Name should be at least 4 characters.')
});

const SignUp = (props) => {
	/* separate states so that when user navigates to signin or forgot password,
	the authStatus message won't display to other routes.
  */
	const [signUpStatus, setSignUpStatus] = useState({});
	const [isSigningUp, setIsSigningUp] = useState(false);
	// ---
	const { isAuthenticating, authStatus } = useSelector(state => ({
		isAuthenticating: state.app.isAuthenticating,
		authStatus: state.app.authStatus
	}));
	const didMount = useDidMount();
	const dispatch = useDispatch();
	const passwordField = useRef(null);

	useScrollTop();
	useDocumentTitle('Sign Up | Salinaka');
	useEffect(() => {
		if (didMount) {
			setSignUpStatus(authStatus);
			setIsSigningUp(isAuthenticating);
		}
	}, [authStatus, isAuthenticating]);

	const onClickSignIn = () => props.history.push('/signin');

	const onFormSubmit = (form) => {
		dispatch(signUp({
			fullname: form.fullname.trim(),
			email: form.email.trim().toLowerCase(),
			password: form.password.trim()
		}));
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
			{signUpStatus.message && (
				<h5 className="text-center toast-error">
					{authStatus.message}
				</h5>
			)}
			{!isSuccess && (
				<>
					<div className={`auth ${signUpStatus.message && (!authStatus.success && 'input-error')}`}>
						<div className="auth-main">
							<h3>Sign up to Salinaka</h3>
							<Formik
								initialValues={{
									fullname: '',
									email: '',
									password: '',
								}}
								validateOnChange
								validationSchema={SignInSchema}
								onSubmit={onFormSubmit}
							>
								{() => (
									<Form>
										<div className="auth-field">
											<Field
												disabled={isSigningUp}
												name="fullname"
												type="text"
												label="* Full Name"
												placeholder="John Doe"
												style={{ textTransform: 'capitalize' }}
												component={CustomInput}
											/>
										</div>
										<div className="auth-field">
											<Field
												disabled={isSigningUp}
												name="email"
												type="email"
												label="* Email"
												placeholder="test@example.com"
												component={CustomInput}
											/>
										</div>
										<div className="auth-field">
											<Field
												disabled={isSigningUp}
												name="password"
												type="password"
												label="* Password"
												placeholder="Your Password"
												component={CustomInput}
											/>
										</div>
										<br />
										<div className="auth-field auth-action auth-action-signup">
											<button
												className="button auth-button"
												disabled={isSigningUp}
												type="submit"
											>
												<CircularProgress visible={isSigningUp} theme="light" />
												{isSigningUp ? 'Signing Up' : 'Sign Up'}
											</button>
										</div>
									</Form>
								)}
							</Formik>
						</div>
						<div className="auth-divider">
							<h6>OR</h6>
						</div>
						<SocialLogin isLoading={isSigningUp} />
					</div>
					<div className="auth-message">
						<span className="auth-info">
							<strong>Already have an account?</strong>
						</span>
						<button
							className="button button-small button-border button-border-gray"
							disabled={isSigningUp}
							onClick={onClickSignIn}
						>
							Sign In
						</button>
					</div>
				</>
			)}
		</div>
	);
};

export default SignUp;
