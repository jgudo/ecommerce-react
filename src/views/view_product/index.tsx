import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ImageLoader from 'components/ui/ImageLoader';
import CircularProgress from 'components/ui/ImageLoader';
import { Route } from 'constants/routes';
import { removeFromBasket, addToBasket } from 'redux/actions/basketActions';
import { displayMoney, displayActionMessage } from 'helpers/utils';
import firebase from '../../firebase/firebase';
import { IImageFile, RootState } from 'types/types';
import useScrollTop from 'hooks/useScrollTop';

const ViewProduct: React.FC = () => {
	useScrollTop();

	const { id } = useParams<{ id: string }>();
	const history = useHistory();
	const dispatch = useDispatch();
	const store = useSelector((state: RootState) => ({
		product: state.products.items.find(item => item.id === id),
		basket: state.basket
	}));
	const [selectedImage, setSelectedImage] = useState(store.product ? store.product.image : '');
	const [product, setProduct] = useState<any>(store.product);
	const foundOnBasket = () => store.basket.find(item => item.id === id);

	const onAddToBasket = () => {
		if (foundOnBasket() && product) {
			dispatch(removeFromBasket(product.id));
			displayActionMessage('Item removed from basket', 'info');
		} else {
			product && dispatch(addToBasket(product));
			displayActionMessage('Item added to basket', 'success');
		}
	};

	useEffect(() => {
		if (!product) {
			firebase.getProduct(id)
				.then((doc) => {
					if (doc.exists) {
						const data: any = doc.data();

						setProduct(data);
						setSelectedImage(data.image);
					} else {
						history.push(Route.HOME);
					}
				})
				.catch(() => {
					history.push(Route.HOME);
				});
		}
	}, [])

	return product ? (
		<div className="product-modal">
			{product.imageCollection.length !== 0 && (
				<div className="product-modal-image-collection">
					{product.imageCollection.map((image: IImageFile) => (
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
						className={`button button-small ${foundOnBasket() ? 'button-border button-border-gray' : ''}`}
						onClick={onAddToBasket}
					>
						{foundOnBasket() ? 'Remove From Basket' : 'Add To Basket'}
					</button>
				</div>
			</div>
		</div>
	) : (
			<div className="loader"><CircularProgress src="" /></div>
		);
};

export default ViewProduct;