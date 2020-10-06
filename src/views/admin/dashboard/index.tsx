import React from 'react';
import useDocumentTitle from 'hooks/useDocumentTitle';

const Dashboard = () => {
	useDocumentTitle('Welcome | Admin Dashboard');

	return (
		<div className="loader">
			<h2>Welcome to admin dashboard</h2>
		</div>
	);
};

export default Dashboard;
