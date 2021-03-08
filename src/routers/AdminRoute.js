import { AdminNavigation, AdminSideBar } from 'components/common';
import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const AdminRoute = ({ component: Component, ...rest }) => {
	const user = useSelector(state => state.auth);

	return (
		<Route
			{...rest}
			component={props => (
				user && user.role === 'ADMIN' ? (
					<>
						<AdminNavigation />
						<main className="content-admin">
							<AdminSideBar />
							<div className="content-admin-wrapper">
								<Component {...props} />
							</div>
						</main>
					</>
				) : <Redirect to="/" />
			)}
		/>
	);
};

export default AdminRoute;
