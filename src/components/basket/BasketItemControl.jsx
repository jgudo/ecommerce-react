import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addQtyItem, minusQtyItem } from 'redux/actions/basketActions';

const BasketItemControl = ({ product }) => {
	const dispatch = useDispatch();

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
				<i className="fa fa-plus" style={{ fontSize: '9px' }} />
			</button>
			<button
				className="button button-border button-border-gray button-small basket-control basket-control-minus"
				disabled={product.quantity === 1}
				onClick={onMinusQty}
			>
				<i className="fa fa-minus" style={{ fontSize: '9px' }} />
			</button>
		</div>
	);
};

BasketItemControl.propType = {
	action: PropTypes.objectOf(PropTypes.func).isRequired,
	product: PropTypes.object.isRequired
};

export default BasketItemControl;
