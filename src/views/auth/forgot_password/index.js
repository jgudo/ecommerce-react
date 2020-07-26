import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useDidMount from 'hooks/useDidMount';
import Input from 'components/ui/Input';
import { resetPassword } from 'actions/authActions';

import CircularProgress from 'components/ui/CircularProgress';

const ForgotPassword = () => {
	const { authStatus, isAuthenticating } = useSelector(state => ({
		isAuthenticating: state.app.isAuthenticating,
		authStatus: state.app.authStatus
	}));
	const dispatch = useDispatch();
	const didMount = useDidMount();
	const [forgotPWStatus, setForgotPWStatus] = useState({});
	const [isSendingForgotPWRequest, setIsSending] = useState(false);
	const [field, setField] = useState({});

	useEffect(() => {
		if (didMount) {
			setForgotPWStatus(authStatus);
			setIsSending(isAuthenticating);
		}
	}, [authStatus, isAuthenticating]);

	const onEmailChange = (e, value, error) => {
		setField({ email: value, error });
	};

	const onSubmitEmail = () => {
		if (!!field.email && !field.error) {
			dispatch(resetPassword(field.email));
		}
	};

	return (
		<div className="forgot_password">
			{forgotPWStatus.message && (
				<h5 className={`text-center ${authStatus.success ? 'toast-success' : 'toast-error'}`}>
					{authStatus.message}
				</h5>
			)}
			<h3>Forgot Your Password?</h3>
			<p>Enter your email address and we will send you a password reset email.</p>
			<br />
			<Input
				field="email"
				isRequired
				label="* Email"
				maxLength={40}
				onInputChange={onEmailChange}
				placeholder="Enter your email"
				readOnly={isSendingForgotPWRequest || authStatus.success}
				type="email"
			/>
			<br />
			<button
				className="button w-100-mobile"
				disabled={isSendingForgotPWRequest || authStatus.success}
				onClick={onSubmitEmail}
				type="button"
			>
				<CircularProgress
					theme="light"
					visible={isSendingForgotPWRequest}
				/>
				{isSendingForgotPWRequest ? 'Sending Password Reset Email' : 'Send Password Reset Email'}
			</button>
		</div>
	);
};

export default ForgotPassword;
