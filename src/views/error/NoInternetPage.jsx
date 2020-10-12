import React from 'react';
import useScrollTop from 'hooks/useScrollTop';

const NoInternet = () => {
	useScrollTop();

	return (
		<div className="page-not-found">
			<h1>:( No Internet Connection.</h1>
			<p>Please check you network connectivity and try again.</p>
			<br />
			<button
				className="button"
				onClick={() => window.location.reload(true)}
			>
				Try Again
			</button>
		</div>

	);
};

export default NoInternet;
