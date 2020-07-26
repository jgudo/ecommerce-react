import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { addToBasket, removeFromBasket } from 'actions/basketActions';
import { displayMoney, displayActionMessage } from 'helpers/utils';
import Modal from 'components/ui/Modal';
import ImageLoader from '../ui/ImageLoader';

const ProductModalDetails = (props) => {
	const dispatch = useDispatch();

	const onAddToBasket = () => {
		if (props.foundOnBasket) {
			dispatch(removeFromBasket(props.product.id));
			displayActionMessage('Item removed from basket', 'info');
		} else {
			dispatch(addToBasket(props.product));
			displayActionMessage('Item added to basket', 'success');
		}
	};

	return !props.product ? null : (
		<Modal
			isOpen={props.isOpenModal}
			onRequestClose={props.onCloseModal}
			overrideStyle={{ padding: 0 }}
		>
			<div className="product-modal">
				<div className="product-modal-image-wrapper">
					<ImageLoader
						alt={props.product.name}
						className="product-modal-image"
						src={props.product.image}
					/>
				</div>
				<div className="product-modal-details">
					<h3>{props.product.name}</h3>
					<span className="text-subtle">Brand: &nbsp;</span>
					<span><strong>{props.product.brand}</strong></span>
					<br />
					<br />
					<span>{props.product.description}</span>
					<br />
					<h1>{displayMoney(props.product.price)}</h1>
					<div className="product-modal-action">
						<button
							className={`button button-small ${props.foundOnBasket ? 'button-border button-border-gray' : ''}`}
							onClick={onAddToBasket}
						>
							{props.foundOnBasket ? 'Remove From Basket' : 'Add To Basket'}
						</button>
					</div>
				</div>
			</div>
			<button
				className="modal-close-button"
				onClick={props.onCloseModal}
			>
				<i className="fa fa-times-circle" />
			</button>
		</Modal>
	);
};

ProductModalDetails.propType = {
	product: PropTypes.object.isRequired,
	addToBasket: PropTypes.func.isRequired,
	foundOnBasket: PropTypes.func.isRequired
};

export default ProductModalDetails;
