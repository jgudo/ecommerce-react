import propTypes from 'prop-types';
import React from 'react';

const CustomTextarea = ({ field, form: { touched, errors }, label, ...props }) => (
    <div className="input-group">
        {touched[field.name] && errors[field.name] ? (
            <span className="label-input label-error">{errors[field.name]}</span>
        ) : (
            <label className="label-input" htmlFor={field.name}>{label}</label>
        )}
        <textarea
            name={field.name}
            cols={30}
            rows={4}
            id={field.name}
            className={`input-form ${touched[field.name] && errors[field.name] && 'input-error'}`}
            {...field}
            {...props}
        />
    </div>
);

CustomTextarea.propTypes = {
    label: propTypes.string
}

export default CustomTextarea