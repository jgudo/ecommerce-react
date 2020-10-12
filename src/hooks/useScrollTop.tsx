import { useEffect } from 'react';

export default () => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
};
