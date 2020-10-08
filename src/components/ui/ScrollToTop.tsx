import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const ScrollToTop = <P extends object>(Component: React.ComponentType<P>) => withRouter((props) => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [props.location]);

	return (<Component {...props as P} />);
});

export default ScrollToTop;
