import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import firebase from '../../firebase/firebase';

import { CHECKOUT_STEP_1 } from 'constants/routes';
import { clearBasket } from 'redux/actions/basketActions';
import { displayMoney } from 'helpers/utils';
import BasketItem from './BasketItem';
import BasketToggle from './BasketToggle';
import Modal from '../ui/Modal';
import Boundary from '../ui/Boundary';
import useDidMount from 'hooks/useDidMount';

const Basket = (props) => {
	const [isModalOpen, setModalOpen] = useState(false);
	const basket = useSelector(state => state.basket);
	const history = useHistory();
	const { pathname } = useLocation();
	const dispatch = useDispatch();
	const didMount = useDidMount();

	useEffect(() => {
		if (didMount && firebase.auth.currentUser && basket.length !== 0) {
			firebase.saveBasketItems(basket, firebase.auth.currentUser.uid)
				.then(() => {
					console.log('Item saved to basket');
				})
				.catch((e) => {
					console.log(e);
				});
		}
	}, [basket]);

	const calculateTotal = () => {
		let total = 0;

		if (basket.length !== 0) {
			const result = basket.map(product => product.price * product.quantity).reduce((a, b) => a + b);
			total = result.toFixed(2);
		}

		return displayMoney(total);
	};

	const onOpenModal = () => setModalOpen(true);
	const onCloseModal = () => setModalOpen(false);

	const onCheckOut = () => {
		if ((basket.length !== 0 && props.isAuth)) {
			document.body.classList.remove('is-basket-open');
			history.push(CHECKOUT_STEP_1);
		} else {
			onOpenModal();
		}
	};

	const onSignInClick = () => {
		onCloseModal();
		document.body.classList.remove('basket-open');
		history.push(CHECKOUT_STEP_1);
	};

	const onClearBasket = () => {
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
					{basket.map((product, i) => (
						<BasketItem
							key={`${product.id}_${i}`}
							product={product}
							basket={basket}
							dispatch={dispatch}
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
						disabled={basket.length === 0 || pathname === '/checkout'}
						onClick={onCheckOut}
					>
						Check Out
					</button>
				</div>
			</div>
		</Boundary>
	);
};

export default Basket;
