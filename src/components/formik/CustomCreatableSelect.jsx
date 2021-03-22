/* eslint-disable react/forbid-prop-types */
import { useField } from 'formik';
import PropType from 'prop-types';
import React from 'react';
import CreatableSelect from 'react-select/creatable';

const CustomCreatableSelect = (props) => {
  const [field, meta, helpers] = useField(props);
  const {
    options, defaultValue, label, placeholder, isMulti, type, iid
  } = props;
  const { touched, error } = meta;
  const { setValue } = helpers;

  const handleChange = (newValue) => {
    if (Array.isArray(newValue)) {
      const arr = newValue.map((fieldKey) => fieldKey.value);
      setValue(arr);
    } else {
      setValue(newValue.value);
    }
  };

  const handleKeyDown = (e) => {
    if (type === 'number') {
      const { key } = e.nativeEvent;
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
        instanceId={iid}
        styles={{
          menu: (provided) => ({
            ...provided,
            zIndex: 10
          }),
          container: (provided) => ({
            ...provided, marginBottom: '1.2rem'
          }),
          control: (provided) => ({
            ...provided,
            border: touched && error ? '1px solid red' : '1px solid #cacaca'
          })
        }}
      />
    </div>
  );
};

CustomCreatableSelect.defaultProps = {
  isMulti: false,
  placeholder: '',
  iid: '',
  options: [],
  type: 'string'
};

CustomCreatableSelect.propTypes = {
  options: PropType.arrayOf(PropType.object),
  defaultValue: PropType.oneOfType([
    PropType.object,
    PropType.array
  ]).isRequired,
  label: PropType.string.isRequired,
  placeholder: PropType.string,
  isMulti: PropType.bool,
  type: PropType.string,
  iid: PropType.string
};

export default CustomCreatableSelect;
