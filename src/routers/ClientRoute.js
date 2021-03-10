/* eslint-disable no-nested-ternary */
import { ADMIN_DASHBOARD, SIGNIN } from 'constants/routes';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({
	isAuth,
	role,
	userType,
	component: Component,
	path,
	...rest
}) => (
	<Route
		{...rest}
		component={props => (
			isAuth && role === 'USER'
				? (
					<main className="content">
						<Component {...props} />
					</main>
				)
				: isAuth && role === 'ADMIN' ? <Redirect to={ADMIN_DASHBOARD} />
					: <Redirect to={{
						pathname: SIGNIN,
						state: { from: props.location }
					}}
					/>
		)}
	/>
);

const mapStateToProps = ({ auth }) => ({
	isAuth: !!auth,
	role: auth?.role || ''
});

export default connect(mapStateToProps)(PrivateRoute);
