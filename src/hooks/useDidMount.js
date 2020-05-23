import React, { useState, useEffect } from 'react';

const useDidMount = () => {
	const [didMount, setDidMount] = useState(false);

	useEffect(() => {
		setDidMount(true);
	}, []);

	return didMount;
};

export default useDidMount;
