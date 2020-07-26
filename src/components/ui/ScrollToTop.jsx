import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const ScrollToTop = Component => withRouter((props) => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [props.location]);

	return (<Component {...props} />);
});

export default ScrollToTop;
