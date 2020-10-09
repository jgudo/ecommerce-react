import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { addToBasket, removeFromBasket } from 'redux/actions/basketActions';
import { displayMoney, displayActionMessage } from 'helpers/utils';
import Modal from 'components/ui/Modal';
import ImageLoader from '../ui/ImageLoader';
import { IImageFile, IProduct } from 'types/typings';

interface IProps {
	product: IProduct;
	basket: IProduct[];
	isOpenModal: boolean;
	onCloseModal: () => void;
	foundOnBasket: (id: string) => boolean;
	overrideStyle?: React.CSSProperties;
}

const ProductModalDetails: React.FC<IProps> = (props) => {
	const [selectedImage, setSelectedImage] = useState(props.product.image);
	const dispatch = useDispatch();
	const product = { imgCollection: [], ...props.product }; // set default props for imageCollectio

	const onAddToBasket = () => {
		if (props.foundOnBasket(product.id)) {
			dispatch(removeFromBasket(product.id));
			displayActionMessage('Item removed from basket', 'info');
		} else {
			dispatch(addToBasket(product));
			displayActionMessage('Item added to basket', 'success');
		}
	};

	useEffect(() => {
		setSelectedImage(props.product.image);
	}, [props.product.image]);

	return !props.product ? null : (
		<Modal
			isOpen={props.isOpenModal}
			onRequestClose={props.onCloseModal}
			overrideStyle={{ padding: 0 }}
		>
			<div className="product-modal">
				{product.imgCollection.length !== 0 && (
					<div className="product-modal-image-collection">
						{product.imgCollection.map((image: IImageFile) => (
							<div
								className="product-modal-image-collection-wrapper"
								key={image.id}
								onClick={() => setSelectedImage(image.url)}
							>
								<ImageLoader
									className="product-modal-image-collection-img"
									src={image.url}
								/>
							</div>
						))}
					</div>
				)}
				<div className="product-modal-image-wrapper">
					<ImageLoader
						className="product-modal-image"
						src={selectedImage}
					/>
				</div>
				<div className="product-modal-details">
					<h3>{product.name}</h3>
					<span className="text-subtle">Brand: &nbsp;</span>
					<span><strong>{product.brand}</strong></span>
					<br />
					<br />
					<span>{product.description}</span>
					<br />
					<h1>{displayMoney(product.price)}</h1>
					<div className="product-modal-action">
						<button
							className={`button button-small ${props.foundOnBasket(product.id) ? 'button-border button-border-gray' : ''}`}
							onClick={onAddToBasket}
						>
							{props.foundOnBasket(product.id) ? 'Remove From Basket' : 'Add To Basket'}
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

export default ProductModalDetails;
