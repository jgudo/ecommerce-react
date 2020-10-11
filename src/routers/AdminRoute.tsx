import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

import AdminNavigation from 'components/ui/AdminNavigation';
import AdminSidePanel from 'components/ui/AdminSidePanel';
import { RootState } from 'types/typings';
import { ROLE_ADMIN } from 'constants/constants';

interface IProps extends RouteProps {
	component:
	| React.ComponentType<RouteComponentProps<any>>
	| React.ComponentType<any>;
}

const AdminRoute: React.FC<IProps> = ({ component: Component, ...rest }) => {
	const isAuth = useSelector((state: RootState) => !!state.auth.id && state.auth.role === ROLE_ADMIN);

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
