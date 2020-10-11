import React from 'react';
import { RouteComponentProps } from 'react-router';

const Error: React.FC<RouteComponentProps> = ({ history }) => {

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
