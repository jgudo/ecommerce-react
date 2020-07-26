import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import AdminNavigation from 'components/ui/AdminNavigation';
import AdminSidePanel from 'components/ui/AdminSidePanel';

const AdminRoute = ({ component: Component, ...rest }) => {
	const isAuth = useSelector(state => !!state.auth.id && state.auth.role === 'ADMIN');

	return (
		<Route
			{...rest}
			component={props => (
				isAuth ? (
					<>
						<AdminNavigation />
						<main className="content-admin">
							<AdminSidePanel />
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
