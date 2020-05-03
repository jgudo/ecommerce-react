import React, { useState } from 'react';

const useFieldHandler = (initState) => {
	const [field, setField] = useState(initState);
	const [errorField, setErrorField] = useState({});

	const onFieldChange = (e, prop, optional = true, data = {}) => {
		let val = e.target ? e.target.value.trimStart() : '';
	    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
	    const nameRegex = /[^a-zA-Z\s]/g;
	    const passwordRegex = /[A-Z\W]/g;
	    const key = prop.substr(0, 1).toUpperCase().concat(prop.substr(1));

	     if (prop === 'email' && !regex.test(val)) {
	      setErrorField({ ...errorField, [prop]: `${key} is invalid` });
	    } else if (prop === 'fullname') {
	    	val = val.replace(/[^a-zA-Z\s]/g, '').trimStart();

	    	if (val.length < 5) {
	    		setErrorField({ ...errorField, [prop]: `${key} must be at least 5 letters` });
	    	} else if (nameRegex.test(val)) {
	    		setErrorField({ ...errorField, [prop]: `${key} must not include special characters` });
	    	} else {
	    		setErrorField({ ...errorField, [prop]: '' });
	    	}
	    } else if (prop === 'mobile') {
	    	val = e.replace(/[^0-9]+/g,'').slice(data.dialCode.length);
		    const len = val.toString().length;

	    	if (len >= 1 && len <= 9) {
		      setErrorField({ ...errorField, [prop]: `${key} number invalid` });
		    } else {
		    	setErrorField({ ...errorField, [prop]: '' });
		    }
	    } else if (prop === 'password') {
	    	if (val.length < 8) {
		      setErrorField({ ...errorField, [prop]: `${key} should be 8 characters long.` });
		    } else if (!passwordRegex.test(val)) {
		      setErrorField({ ...errorField, [prop]: `${key} should contain uppercase or special character.` });
		    } else {
		      setErrorField({ ...errorField, [prop]: '' });
		    }
	    } else if (val === '' && !optional) {
	      setErrorField({ ...errorField, [prop]: `${key} is required` });
	    } else {
	      setErrorField({ ...errorField, [prop]: '' });
	    }
	     
	    setField({ ...field, [prop]: val });

	};

	return { field, setField, onFieldChange, errorField, setErrorField }
};

export default useFieldHandler;
