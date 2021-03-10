import propTypes from 'prop-types';
import React from 'react';

const CustomInput = ({ field, form: { touched, errors }, label, inputRef, ...props }) => (
    <div className="input-group">
        {touched[field.name] && errors[field.name] ? (
            <span className="label-input label-error">{errors[field.name]}</span>
        ) : (
            <label className="label-input" htmlFor={field.name}>{label}</label>
        )}
        <input
            type="text"
            id={field.name}
            className={`input-form ${touched[field.name] && errors[field.name] && 'input-error'}`}
            ref={inputRef}
            {...field}
            {...props}
        />
    </div>
);

CustomInput.propTypes = {
    label: propTypes.string
}

export default CustomInput