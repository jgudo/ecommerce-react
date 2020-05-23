import React from 'react';

const InputField = React.forwardRef(({
	className, 
	type, 
	field, 
	errorField,
	label,
	showLabel,
	...rest
}, ref) => {
	const errorClassName = () =>  errorField[field] ? 'input-error' : '';

	return (
		<>
			{(errorField[field] && showLabel) ? <span className="input-message">{errorField[field]}</span>
			 : (
        <span className="d-block padding-s">{label}</span>
      )}
      <input 
					{...rest}
	        className={`${className} ${errorClassName()}`}
	        type={type}
	        ref={ref}
	    />
		</>
	);
});

InputField.defaultProps = {
	className: 'input-form d-block',
	type: 'text',
	showLabel: true,
	errorField: {}
}

export default InputField;
