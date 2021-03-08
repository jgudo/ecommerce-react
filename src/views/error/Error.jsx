import { useScrollTop } from 'hooks';
import React from 'react';

const Error = ({ history }) => {
	useScrollTop();

	return (
		<div className="page-not-found">
			<h1>:( An error has occured. Please try again.</h1>
			<br />
			<button
				className="button"
				onClick={() => history.push('/')}
			>
				Try Again
			</button>
		</div>

	);
};

export default Error;
