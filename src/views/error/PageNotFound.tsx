import React from 'react';
import { RouteComponentProps } from 'react-router';

const PageNotFound: React.FC<RouteComponentProps> = ({ history }) => {
	return (
		<div className="page-not-found">
			<h1>:( Page you are looking for doesn't exists.</h1>
			<br />
			<button
				className="button"
				onClick={history.goBack}
			>
				Go back
			</button>
		</div>
	);
};

export default PageNotFound;
