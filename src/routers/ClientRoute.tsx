/* eslint-disable no-nested-ternary */
import React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';

import Basket from 'components/basket/Basket';
import Navigation from 'components/ui/Navigation';
import Footer from 'components/ui/Footer';

import { Route as ROUTES } from 'constants/routes';
import { ROLE_ADMIN, ROLE_USER } from 'constants/constants';

interface IProps extends RouteProps {
	component:
	| React.ComponentType<RouteComponentProps<any>>
	| React.ComponentType<any>;
	isAuth: boolean;
	userType: typeof ROLE_USER | typeof ROLE_ADMIN;
}

const PrivateRoute: React.FC<IProps> = ({
	isAuth,
	userType,
	component: Component,
	...rest
}) => (
		<Route
			{...rest}
			component={props => (
				isAuth && userType === ROLE_USER
					? (
						<>
							<Navigation isAuth={isAuth} />
							<Basket isAuth={isAuth} />
							<main className="content">
								<Component {...props} />
							</main>
							<Footer />
						</>
					)
					: isAuth && userType === ROLE_ADMIN ? <Redirect to={ROUTES.ADMIN_DASHBOARD} />
						: <Redirect to={{
							pathname: ROUTES.SIGNIN,
							state: { from: props.location }
						}}
						/>
			)}
		/>
	);

const mapStateToProps = ({ auth }) => ({
	isAuth: !!auth.id && !!auth.role,
	userType: auth.role
});

export default connect(mapStateToProps)(PrivateRoute);
