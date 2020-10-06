import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { CHECKOUT_STEP_1 } from 'constants/routes';
import { clearBasket } from 'actions/basketActions';
import { displayMoney } from 'helpers/utils';
import BasketItem from './BasketItem';
import BasketToggle from './BasketToggle';
import Modal from '../ui/Modal';
import Boundary from '../ui/Boundary';
import { IProduct } from 'types/typings';

interface IProps extends RouteComponentProps {
	isAuth: boolean;
}

interface IRootState {
	basket: IProduct[];
}

const Basket: React.FC<IProps> = (props) => {
	const [isModalOpen, setModalOpen] = useState(false);
	const basket = useSelector((state: IRootState) => state.basket);
	const dispatch = useDispatch();

	const calculateTotal = (): string => {
		let total: number | string = 0;

		if (basket.length !== 0) {
			const result = basket.map(product => product.price * product.quantity).reduce((a, b) => a + b);
			total = result.toFixed(2);
		}

		return displayMoney(total);
	};

	const onOpenModal = (): void => setModalOpen(true);
	const onCloseModal = (): void => setModalOpen(false);

	const onCheckOut = (): void => {
		if ((basket.length !== 0 && props.isAuth)) {
			document.body.classList.remove('is-basket-open');
			props.history.push(CHECKOUT_STEP_1);
		} else {
			onOpenModal();
		}
	};

	const onSignInClick = (): void => {
		onCloseModal();
		document.body.classList.remove('basket-open');
		props.history.push(CHECKOUT_STEP_1);
	};

	const onClearBasket = (): void => {
		if (basket.length !== 0) {
			dispatch(clearBasket());
		}
	};

	return (
		<Boundary>
			<Modal
				isOpen={isModalOpen}
				onRequestClose={onCloseModal}
			>
				<p className="text-center">You must sign in to continue checking out</p>
				<br />
				<div className="d-flex-center">
					<button
						className="button button-border button-border-gray button-small"
						onClick={onCloseModal}
					>
						Continue shopping
					</button>
					&nbsp;
					<button
						className="button button-small"
						onClick={onSignInClick}
					>
						Sign in to checkout
					</button>
				</div>
			</Modal>
			<div className="basket">
				<div className="basket-list">
					<div className="basket-header">
						<h3 className="basket-header-title">
							My Basket &nbsp;
							<span>({` ${basket.length} ${basket.length > 1 ? 'items' : 'item'}`})</span>
						</h3>
						<BasketToggle>
							{({ onClickToggle }) => (
								<span
									className="basket-toggle button button-border button-border-gray button-small"
									onClick={onClickToggle}
								>
									Close
								</span>
							)}
						</BasketToggle>
						<button
							className="basket-clear button button-border button-border-gray button-small"
							disabled={basket.length === 0}
							onClick={onClearBasket}
						>
							<span>Clear Basket</span>
						</button>
					</div>
					{basket.length <= 0 && (
						<div className="basket-empty">
							<h5 className="basket-empty-msg">Your basket is empty</h5>
						</div>
					)}
					{basket.map(product => (
						<BasketItem
							key={product.id}
							product={product}
						/>
					))}
				</div>
				<div className="basket-checkout">
					<div className="basket-total">
						<p className="basket-total-title">Subtotal Amout:</p>
						<h2 className="basket-total-amount">{calculateTotal()}</h2>
					</div>
					<button
						className="basket-checkout-button button"
						disabled={basket.length === 0 || props.location.pathname === '/checkout'}
						onClick={onCheckOut}
					>
						Check Out
					</button>
				</div>
			</div>
		</Boundary>
	);
};

export default withRouter(Basket);
