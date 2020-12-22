// tslint:disable: no-array-mutation
import React, { useState, useEffect, useRef } from 'react';
import Select from 'react-select';
import { useParams, useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ImageLoader from 'components/ui/ImageLoader';
import CircularProgress from 'components/ui/ImageLoader';
import { Route } from 'constants/routes';
import { removeFromBasket, addToBasket } from 'redux/actions/basketActions';
import { displayMoney, displayActionMessage } from 'helpers/utils';
import firebase from '../../firebase/firebase';
import { RootState } from 'types/types';
import useScrollTop from 'hooks/useScrollTop';
import ColorChooser from 'components/ui/ColorChooser';
import useRecommendedProducts from 'hooks/useRecommendedProducts';
import ProductFeatured from 'components/product/ProductFeatured';
import MessageDisplay from 'components/ui/MessageDisplay';

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
	const [selectedSize, setSelectedSize] = useState('');
	const [selectedColor, setSelectedColor] = useState('');
	const { recommendedProducts, fetchRecommendedProducts, isLoading, error } = useRecommendedProducts(6);
	const colorOverlay = useRef<HTMLInputElement | null>(null);
	const foundOnBasket = () => store.basket.find(item => item.id === id);

	const onAddToBasket = () => {
		if (foundOnBasket() && product) {
			dispatch(removeFromBasket(product.id));
			displayActionMessage('Item removed from basket', 'info');
		} else {
			product && dispatch(addToBasket({ ...product, selectedColor, selectedSize }));
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
	}, []);

	// SIZES DROPDOWN ITEM
	type TOptionItem = { value: number; label: string; };
	let sizes: TOptionItem[] = [];
	for (let i = 45; i <= 60; i++) {
		// tslint:disable-next-line: no-array-mutation
		sizes.push(
			{ value: i, label: `${i <= 48 ? 'Small' : i <= 55 ? 'Medium' : 'Large'} - ${i} mm` }
		);
	}

	const onSelectedSizeChange = (newValue) => {
		setSelectedSize(newValue.value);
	};

	const onSelectedColorChange = (color) => {
		setSelectedColor(color);
		if (colorOverlay.current) {
			colorOverlay.current.value = color;
		}
	};

	return product ? (
		<div className="product-view">
			<Link to={Route.SHOP}><h3><i className="fa fa-chevron-left" /> Back to shop</h3> </Link>
			<div className="product-modal">
				{product.imageCollection.length !== 0 && (
					<div className="product-modal-image-collection">
						{product.imageCollection.map(image => (
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
					<input type="color" disabled ref={colorOverlay} id="color-overlay" />
					<ImageLoader
						className="product-modal-image"
						src={selectedImage}
					/>
				</div>
				<div className="product-modal-details">
					<br />
					<span className="text-subtle">{product.brand}</span>
					<h1 className="margin-top-0">{product.name}</h1>
					<span>{product.description}</span>
					<br />
					<br />
					<div className="divider" />
					<br />
					<div>
						<span className="text-subtle">Lens Width and Frame Size</span>
						<br /><br />
						<Select
							placeholder="--Select Size--"
							onChange={onSelectedSizeChange}
							options={sizes}
							styles={{ menu: provided => ({ ...provided, zIndex: 10 }) }}
						/>
						{/* <select value={selectedSize} onChange={onSelectedSizeChange} style={{ paddingRight: '5rem' }}>
                            <option disabled value="">-- Select Appropriate Size --</option>
                            {sizes}
                        </select> */}
					</div>
					<br />
					{product.availableColors.length >= 1 && (
						<div>
							<span className="text-subtle">Choose Color</span>
							<br /><br />
							<ColorChooser availableColors={product.availableColors} onSelectedColorChange={onSelectedColorChange} />
						</div>
					)}
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
			<div style={{ marginTop: '10rem' }}>
				<div className="display-header">
					<h1>Recommended</h1>
					<Link to={Route.RECOMMENDED_PRODUCTS}>See All</Link>
				</div>
				<div className="product-display-grid">
					{error ? (
						<MessageDisplay
							message={error}
							action={fetchRecommendedProducts}
							buttonLabel="Try Again"
						/>
					) : (
							<>
								{recommendedProducts.length === 0 ? new Array(4).fill({}).map((product, index) => (
									<ProductFeatured
										key={`product-skeleton ${index}`}
										product={product}
										isLoading={isLoading}
									/>
								)) : recommendedProducts.map(product => (
									<ProductFeatured
										key={product.id}
										isLoading={isLoading}
										product={product}
									/>
								))}
							</>
						)}
				</div>
			</div>
		</div>
	) : (
			<div className="loader"><CircularProgress src="" /></div>
		);
};

export default ViewProduct;