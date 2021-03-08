/* eslint-disable no-nested-ternary */
import { ADMIN_DASHBOARD, SIGNIN } from 'constants/routes';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({
	auth,
	userType,
	component: Component,
	path,
	...rest
}) => (
	<Route
		{...rest}
		component={props => (
			auth && auth.role === 'USER'
				? (
					<main className="content">
						<Component {...props} />
					</main>
				)
				: auth && auth.role === 'ADMIN' ? <Redirect to={ADMIN_DASHBOARD} />
					: <Redirect to={{
						pathname: SIGNIN,
						state: { from: props.location }
					}}
					/>
		)}
	/>
);

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(PrivateRoute);
