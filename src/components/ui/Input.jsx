import React, { useState } from 'react';

const InputField = React.forwardRef(({
	className,
	type,
	field,
	label,
	showError,
	showLabel,
	isRequired,
	onInputChange,
	validate,
	...rest
}, ref) => {
	const [value, setValue] = useState('');
	const [errorField, setErrorField] = useState('');

	const onFieldChange = (e) => {
		let val = e.target.value;
		let error = '';
		const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
		const nameRegex = /[^a-zA-Z\s]/g;
		const passwordRegex = /[A-Z\W]/g;
		const key = field.substr(0, 1).toUpperCase().concat(field.substr(1));

		if (validate) {
			const testResult = validate(val, e);

			if (testResult) {
				setErrorField(testResult);
				error = testResult;
			} else {
				setErrorField('');
				error = testResult;
			}
		} else if ((type === 'email' || field === 'email') && !regex.test(val)) {
			setErrorField(`${key} is invalid`);
			error = `${key} is invalid`;
		} else if ((type === 'password' || field === 'password') && showError) {
			if (val.length < 8) {
				setErrorField(`${key} should be 8 characters long.`);
				error = `${key} should be 8 characters long.`;
			} else if (!passwordRegex.test(val)) {
				setErrorField(`${key} should contain uppercase or special character.`);
				error = `${key} should contain uppercase or special character.`;
			} else {
				setErrorField('');
				error = '';
			}
		} else if (field === 'fullname') {
			val = val.replace(/[^a-zA-Z\s]/g, '').trimStart();

			if (val.length < 5) {
				setErrorField(`${key} must be at least 5 letters`);
				error = `${key} must be at least 5 letters`
			} else if (nameRegex.test(val)) {
				setErrorField(`${key} must not include special characters`);
				error = `${key} must not include special characters`;
			} else {
				setErrorField('');
				error = '';
			}
		} else {
			setErrorField('');
			error = '';
		}

		if (val.length === 0 && isRequired) {
			setErrorField(`${key} is required`);
			error = `${key} is required`;
		}

		onInputChange(e, val, error);
		setValue(val);
	};

	return (
		<>
			{(errorField && showLabel) ? <span className="input-message">{errorField}</span>
				: (
					<span className="d-block padding-s">{label}</span>
				)}
			{type === 'textarea' ? (
				<textarea
					{...rest}
					className={`${className} ${errorField ? 'input-error' : ''}`}
					required={isRequired}
					onChange={onFieldChange}
					ref={ref}
				/>
			) : (
					<input
						{...rest}
						className={`${className} ${errorField ? 'input-error' : ''}`}
						required={isRequired}
						onChange={onFieldChange}
						type={type}
						ref={ref}
					/>
				)}
		</>
	);
});

InputField.defaultProps = {
	className: 'input-form d-block',
	type: 'text',
	showLabel: true,
	showError: true,
	isRequired: false,
	onInputChange: () => { }
};

export default InputField;
