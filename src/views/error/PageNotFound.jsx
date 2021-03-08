import { useScrollTop } from 'hooks';
import React from 'react';

const PageNotFound = ({ history }) => {
	useScrollTop();

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
