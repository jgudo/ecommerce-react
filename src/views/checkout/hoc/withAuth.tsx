/* eslint-disable no-nested-ternary */
import React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { IPaymentInfo, IProduct, IShippingInfo, IUser, RootState } from 'types/types';

interface IInjectedProps {
	isAuth: boolean;
	basket: IProduct[];
	profile: IUser;
	shipping: IShippingInfo;
	payment: IPaymentInfo;
	subtotal: number;
}

const withAuth = <P extends IInjectedProps & RouteComponentProps>(Component: React.ComponentType<P>) => {
	return (props: P) => {
		const store = useSelector((state: RootState) => ({
			isAuth: !!state.auth.id && !!state.auth.role,
			basket: state.basket,
			shipping: state.checkout.shipping,
			payment: state.checkout.payment,
			profile: state.profile
		}));
		const dispatch = useDispatch();

		const calculateSubTotal = () => {
			let total = 0;

			if (store.basket.length !== 0) {
				const result = store.basket.map((product: IProduct) => product.price * product.quantity).reduce((a, b) => a + b);
				total = result;
			}

			return total;
		};

		return (
			<>
				{!store.isAuth ? (
					<Redirect to="/signin" />
				) : store.basket.length === 0 ? (
					<Redirect to="/" />
				) : null}
				<Component
					{...props as P}
					basket={store.basket}
					dispatch={dispatch}
					payment={store.payment}
					profile={store.profile}
					shipping={store.shipping}
					subtotal={calculateSubTotal()}
				/>
			</>
		);
	};
};

export default withAuth;
