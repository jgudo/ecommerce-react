import React from 'react';
<<<<<<< HEAD:src/components/basket/BasketItemControl.tsx
import { addQtyItem, minusQtyItem } from 'redux/actions/basketActions';
import { IProduct } from 'types/types';
import { useDispatch } from 'react-redux';
=======
import PropTypes from 'prop-types';
import { addQtyItem, minusQtyItem } from 'redux/actions/basketActions';
>>>>>>> 8577603228250acd4278f07b4a77199e7a391d5f:src/components/basket/BasketItemControl.jsx

interface IProps {
	product: IProduct;
}

const BasketItemControl: React.FC<IProps> = ({ product }) => {
	const dispatch = useDispatch();
	const onAddQty = (): void => {
		if (product.quantity < product.maxQuantity && product.id) {
			dispatch(addQtyItem(product.id));
		}
	};

	const onMinusQty = (): void => {
		if ((product.maxQuantity >= product.quantity) && product.id && product.quantity !== 0) {
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

export default BasketItemControl;
