import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromBasket } from 'redux/actions/basketActions';
import { displayMoney } from 'helpers/utils';
import BasketItemControl from './BasketItemControl';
import Badge from '../ui/Badge';
import ImageLoader from '../ui/ImageLoader';
import { IProduct } from 'types/types';

interface IProps {
	product: IProduct;
}

const BasketItem: React.FC<IProps> = ({ product }) => {
	const dispatch = useDispatch();
	const onRemoveFromBasket = (): void => {
		if (product.id) {
			dispatch(removeFromBasket(product.id));
		}
	};

	return (
		<div className="basket-item">
			<BasketItemControl
				product={product}
			/>
			<div className="basket-item-wrapper">
				<div className="position-relative margin-right-m margin-left-s">
					<Badge count={product.quantity} />
				</div>
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

				<button
					className="basket-item-remove button button-border button-border-gray button-small"
					onClick={onRemoveFromBasket}
				>
					<i className="fa fa-trash" />
				</button>
			</div>
		</div>
	);
};

export default BasketItem;
