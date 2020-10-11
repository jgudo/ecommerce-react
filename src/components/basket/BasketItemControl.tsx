import React from 'react';
import { addQtyItem, minusQtyItem } from 'redux/actions/basketActions';
import { IProduct } from 'types/typings';
import { useDispatch } from 'react-redux';

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
