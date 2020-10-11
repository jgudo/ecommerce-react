import React from 'react';

import useDocumentTitle from 'hooks/useDocumentTitle';
import { Route } from 'constants/routes';
import { displayMoney } from 'helpers/utils';
import BasketItem from 'components/basket/BasketItem';
import StepTracker from '../components/StepTracker';
import Pagination from '../components/Pagination';
import withAuth from '../hoc/withAuth';
import { RouteComponentProps } from 'react-router';
import { IProduct } from 'types/typings';

interface IProps extends RouteComponentProps {
	basket: IProduct[];
	subtotal: number;
}

const OrderSummary: React.FC<IProps> = ({
	basket,
	subtotal,
	history
}) => {
	useDocumentTitle('Check Out Step 1 | Salinaka');
	const onClickPrevious = () => history.push(Route.HOME);
	const onClickNext = () => history.push(Route.CHECKOUT_STEP_2);

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
				<Pagination
					disabledNext={false}
					onClickNext={onClickNext}
					onClickPrevious={onClickPrevious}
					previousLabel="Continue Shopping"

				/>
			</div>
		</div>
	);
};

export default withAuth(OrderSummary);
