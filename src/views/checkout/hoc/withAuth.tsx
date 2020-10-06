/* eslint-disable no-nested-ternary */
import React from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const withAuth = (Component) => {
	return withRouter((props) => {
		const {
			isAuth,
			basket,
			profile,
			shipping,
			payment
		} = useSelector(state => ({
			isAuth: !!state.auth.id && !!state.auth.role,
			basket: state.basket,
			shipping: state.checkout.shipping,
			payment: state.checkout.payment,
			profile: state.profile
		}));
		const dispatch = useDispatch();

		const calculateSubTotal = () => {
			let total = 0;

			if (basket.length !== 0) {
				const result = basket.map(product => product.price * product.quantity).reduce((a, b) => a + b);
				total = result;
			}

			return total;
		};

		return (
			<>
				{!isAuth ? (
					<Redirect to="/signin" />
				) : basket.length === 0 ? (
					<Redirect to="/" />
				) : null}
				<Component
					{...props}
					basket={basket}
					dispatch={dispatch}
					payment={payment}
					profile={profile}
					shipping={shipping}
					subtotal={calculateSubTotal()}
				/>
			</>
		);
	});
};

export default withAuth;
