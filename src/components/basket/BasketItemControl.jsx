import React from 'react';
import PropTypes from 'prop-types';
import { addQtyItem, minusQtyItem } from 'actions/basketActions';

const BasketItemControl = ({ product, dispatch }) => {
	const onAddQty = () => {
		if (product.quantity < product.maxQuantity) {
			dispatch(addQtyItem(product.id));
		}
	};

	const onMinusQty = () => {
		if ((product.maxQuantity >= product.quantity) && product.quantity !== 0) {
			dispatch(minusQtyItem(product.id));
		}
	};

	return (
		<div className="basket-item-control">
			<button
				className="button button-border button-border-gray button-small basket-control basket-control-add"
				disabled={product.maxQuantity === product.quantity}
				onClick={onAddQty}
			>
				+
			</button>
			<button
				className="button button-border button-border-gray button-small basket-control basket-control-minus"
				disabled={product.quantity === 1}
				onClick={onMinusQty}
			>
				-
			</button>
		</div>
	);
};

BasketItemControl.propType = {
	action: PropTypes.objectOf(PropTypes.func).isRequired,
	product: PropTypes.object.isRequired
};

export default BasketItemControl;
