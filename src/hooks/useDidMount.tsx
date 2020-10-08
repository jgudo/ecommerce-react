import { useState, useEffect } from 'react';

const useDidMount = (): boolean => {
	const [didMount, setDidMount] = useState(false);

	useEffect(() => {
		setDidMount(true);
	}, []);

	return didMount;
};

export default useDidMount;
