import { BasketItem } from 'components/basket';
import { CHECKOUT_STEP_2 } from 'constants/routes';
import { displayMoney } from 'helpers/utils';
import { useDocumentTitle, useScrollTop } from 'hooks';
import React from 'react';
import { StepTracker } from '../components';
import withCheckout from '../hoc/withCheckout';

const OrderSummary = ({
	basket,
	subtotal,
	dispatch,
	history
}) => {
	useDocumentTitle('Check Out Step 1 | Salinaka');
	useScrollTop();

	const onClickPrevious = () => history.push('/');
	const onClickNext = () => history.push(CHECKOUT_STEP_2);

	return (
		<div className="checkout">
			<StepTracker current={1} />
			<div className="checkout-step-1">
				<h3 className="text-center">Order Summary</h3>
				<span className="d-block text-center">Review items in your basket.</span>
				<br />
				<div className="checkout-items">
					{basket.map(product => (
						<BasketItem
							basket={basket}
							dispatch={dispatch}
							key={product.id}
							product={product}
						/>
					))}
				</div>
				<br />
				<div className="basket-total text-right">
					<p className="basket-total-title">Subtotal:</p>
					<h2 className="basket-total-amount">{displayMoney(subtotal)}</h2>
				</div>
				<br />
				<div className="checkout-shipping-action">
					<button
						className="button button-muted"
						onClick={onClickPrevious}
						type="button"
					>
						Continue Shopping
					</button>
					<button
						className="button"
						onClick={onClickNext}
						type="submit"
					>
						Next Step
					</button>
				</div>
			</div>
		</div>
	);
};

export default withCheckout(OrderSummary);
