/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

import { Route as ROUTES } from 'constants/routes';

import Basket from 'components/basket/Basket';
import Navigation from 'components/ui/Navigation';
import Footer from 'components/ui/Footer';
import { ROLE_ADMIN, ROLE_USER } from 'constants/constants';

interface IProps extends RouteProps {
	component:
	| React.ComponentType<RouteComponentProps<any>>
	| React.ComponentType<any>;
	isAuth: boolean;
	userType: typeof ROLE_USER | typeof ROLE_ADMIN;
}

const PublicRoute: React.FC<IProps> = ({
	userType,
	isAuth,
	component: Component,
	path,
	...rest
}) => (
		<Route
			{...rest}
			component={(props) => {
				const { from } = props.location.state || { from: { pathname: '/' } };

				return (
					isAuth && userType === ROLE_ADMIN
						? (
							<Redirect to={ROUTES.ADMIN_DASHBOARD} />
						)
						: (isAuth && userType === ROLE_USER) && (path === ROUTES.SIGNIN || path === ROUTES.SIGNUP)
							? (
								<Redirect to={from} />
							)
							: (
								<>
									<Navigation isAuth={isAuth} />
									<Basket isAuth={isAuth} />
									<main className="content">
										<Component {...props} />
									</main>
									<Footer />
								</>
							)
				);
			}}
		/>
	);

const mapStateToProps = ({ auth }) => ({
	isAuth: !!auth.id && !!auth.role,
	userType: auth.role
});

export default connect(mapStateToProps)(PublicRoute);
