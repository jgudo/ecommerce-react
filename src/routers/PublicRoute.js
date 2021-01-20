/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import Basket from 'components/basket/Basket';
import Footer from 'components/ui/Footer';
import Navigation from 'components/ui/Navigation';
import { ADMIN_DASHBOARD, SIGNIN, SIGNUP } from 'constants/routes';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';



const PublicRoute = ({
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
				isAuth && userType === 'ADMIN'
					? (
						<Redirect to={ADMIN_DASHBOARD} />
					)
					: (isAuth && userType === 'USER') && (path === SIGNIN || path === SIGNUP)
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
