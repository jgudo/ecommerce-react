import React from 'react';
import PropTypes from 'prop-types';

import { removeFromBasket } from 'actions/basketActions';
import { displayMoney } from 'helpers/utils';
import BasketItemControl from './BasketItemControl';
import Badge from '../ui/Badge';
import ImageLoader from '../ui/ImageLoader';

const BasketItem = ({ dispatch, product }) => {
	const onRemoveFromBasket = () => dispatch(removeFromBasket(product.id));

	return (
		<div className="basket-item">
			<BasketItemControl
				dispatch={dispatch}
				product={product}
			/>
			<div className="basket-item-wrapper">
				<div className="basket-item-img-wrapper">
					<ImageLoader
						className="basket-item-img"
						src={product.image}
					/>
				</div>
				<div className="basket-item-details">
					<h5 className="basket-item-name">
						{product.name}
					</h5>
					<h5 className="basket-item-price">
						{displayMoney(product.price * product.quantity)}
						<span>{` (x ${product.quantity}) `}</span>
					</h5>
				</div>
				<div className="position-relative margin-right-l">
					<Badge count={product.quantity} />
				</div>
				<button
					className="basket-item-remove button button-border button-border-gray button-small"
					onClick={onRemoveFromBasket}
				>
					x
				</button>
			</div>
		</div>
	);
};

BasketItem.propType = {
	product: PropTypes.object.isRequired,
	basket: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default BasketItem;
