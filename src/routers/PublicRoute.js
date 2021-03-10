import { ADMIN_DASHBOARD, SIGNIN, SIGNUP } from 'constants/routes';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PublicRoute = ({
	isAuth,
	role,
	component: Component,
	path,
	...rest
}) => (
	<Route
		{...rest}
		component={(props) => {
			const { from } = props.location.state || { from: { pathname: '/' } };

			return (
				isAuth && role === 'ADMIN'
					? <Redirect to={ADMIN_DASHBOARD} />
					: (isAuth && role === 'USER') && (path === SIGNIN || path === SIGNUP)
						? <Redirect to={from} />
						: (
							<main className="content">
								<Component {...props} />
							</main>
						)
			);
		}}
	/>
);

const mapStateToProps = ({ auth }) => ({
	isAuth: !!auth,
	role: auth?.role || ''
});

export default connect(mapStateToProps)(PublicRoute);
