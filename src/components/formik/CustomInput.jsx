/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
import PropType from 'prop-types';
import React from 'react';

const CustomInput = ({
  field, form: { touched, errors }, label, inputRef, ...props
}) => (
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

CustomInput.defaultProps = {
  inputRef: undefined
};

CustomInput.propTypes = {
  label: PropType.string.isRequired,
  field: PropType.object.isRequired,
  form: PropType.object.isRequired,
  inputRef: PropType.oneOfType([
    PropType.func,
    PropType.shape({ current: PropType.instanceOf(Element) })
  ])
};

export default CustomInput;
