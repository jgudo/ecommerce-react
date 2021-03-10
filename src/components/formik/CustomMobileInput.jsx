import { useField } from 'formik';
import propTypes from 'prop-types';
import React from 'react';
import PhoneInput from 'react-phone-input-2';

const CustomMobileInput = (props) => {
    const [field, meta, helpers] = useField(props);
    const { label, placeholder, defaultValue } = props;
    const { touched, error, value } = meta;
    const { setValue } = helpers;

    const handleChange = (value, data) => {
        const mob = {
            dialCode: data.dialCode,
            countryCode: data.countryCode,
            country: data.name,
            value,
        };

        setValue(mob);
    };

    return (
        <div className="input-group">
            {touched && error ? (
                <span className="label-input label-error">{error?.value || error?.dialCode}</span>
            ) : (
                <label className="label-input" htmlFor={field.name}>{label}</label>
            )}
            <PhoneInput
                name={field.name}
                country={'ph'}
                inputClass="input-form d-block"
                style={{
                    border: touched && error ? '1px solid red' : '1px solid #cacaca'
                }}
                inputExtraProps={{ required: true }}
                onChange={handleChange}
                placeholder={placeholder}
                value={defaultValue.value}
            />
        </div>
    );
};

CustomMobileInput.defaultProps = {
    label: "Mobile Number",
    placeholder: "09254461351"
}

CustomMobileInput.propTypes = {
    name: propTypes.string,
    label: propTypes.string,
    placeholder: propTypes.string,
}

export default CustomMobileInput;