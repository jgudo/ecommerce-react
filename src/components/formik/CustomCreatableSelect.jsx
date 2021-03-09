import { useField } from 'formik';
import propTypes from 'prop-types';
import React from 'react';
import CreatableSelect from 'react-select/creatable';

const CustomCreatableSelect = (props) => {
    const [field, meta, helpers] = useField(props);
    const { options, defaultValue, label, placeholder, isMulti, type } = props;
    const { touched, error, value } = meta;
    const { setValue } = helpers;

    const handleChange = (newValue) => {
        if (Array.isArray(newValue)) {
            const arr = newValue.map(field => field.value);
            setValue(arr);
        } else {
            setValue(newValue.value);
        }
    };

    const handleKeyDown = (e) => {
        if (type === 'number') {
            const key = e.nativeEvent.key;
            if (/\D/.test(key) && key !== 'Backspace') {
                e.preventDefault();
            }
        }
    };

    return (
        <div className="input-group">
            {touched && error ? (
                <span className="label-input label-error">{error}</span>
            ) : (
                <label className="label-input" htmlFor={field.name}>{label}</label>
            )}
            <CreatableSelect
                isMulti={isMulti}
                placeholder={placeholder}
                name={field.name}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                defaultValue={defaultValue}
                options={options}
                instanceId={props.iid}
                styles={{
                    menu: provided => ({
                        ...provided,
                        zIndex: 10,
                    }),
                    container: provided => ({
                        ...provided, marginBottom: '1.2rem',
                    }),
                    control: provided => ({
                        ...provided,
                        border: touched && error ? '1px solid red' : '1px solid #cacaca'
                    })
                }}
            />
        </div>
    );
};

CustomCreatableSelect.defaultProps = {
    isMulti: false
}

CustomCreatableSelect.propTypes = {
    name: propTypes.string,
    label: propTypes.string,
    placeholder: propTypes.string,
    isMulti: propTypes.bool
}

export default CustomCreatableSelect;