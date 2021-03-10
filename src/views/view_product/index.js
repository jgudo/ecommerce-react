import {
    CircularProgress,
    ColorChooser,
    ImageLoader,
    MessageDisplay
} from 'components/common';
import { FeaturedProduct } from 'components/product';
import { RECOMMENDED_PRODUCTS, SHOP } from 'constants/routes';
import firebase from 'firebase/firebase';
import { displayActionMessage, displayMoney } from 'helpers/utils';
import { useDidMount, useDocumentTitle, useRecommendedProducts, useScrollTop } from 'hooks';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useParams } from 'react-router-dom';
import Select from 'react-select';
import { addToBasket, removeFromBasket } from 'redux/actions/basketActions';

const ViewProduct = () => {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const didMount = useDidMount(true);
    const store = useSelector(state => ({
        product: state.products.items.find(item => item.id === id),
        basket: state.basket

    }));
    useScrollTop();
    useDocumentTitle(`View ${store?.product?.name || 'Item'}`);

    const [selectedImage, setSelectedImage] = useState(store.product?.image || '');
    const [product, setProduct] = useState(store.product || null);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [isLoading, setLoading] = useState(false);
    const {
        recommendedProducts,
        fetchRecommendedProducts,
        isLoading: isLoadingFeatured,
        error
    } = useRecommendedProducts(6);
    const colorOverlay = useRef(null);

    const foundOnBasket = () => store.basket.find(item => item.id === product.id);

    const onAddToBasket = () => {
        if (foundOnBasket()) {
            dispatch(removeFromBasket(product.id));
            displayActionMessage('Item removed from basket', 'info');
        } else {
            dispatch(addToBasket({ ...product, selectedColor, selectedSize: selectedSize || product.sizes[0] }));
            displayActionMessage('Item added to basket', 'success');
        }
    };

    const onSelectedSizeChange = (newValue) => {
        setSelectedSize(newValue.value);
    };

    useEffect(() => {
        (async () => {
            if (!product || store.product?.id !== id) {
                try {
                    setLoading(true);
                    const doc = await firebase.getProduct(id);
                    if (doc.exists) {
                        const data = { ...doc.data(), id: doc.ref.id };

                        if (didMount) {
                            setProduct(data);
                            setLoading(false);
                            setSelectedImage(data.image);
                        }
                    } else {
                        history.push(SHOP);
                    }
                } catch (err) {
                    history.push(SHOP);
                }
            }
        })()
    }, [id]);

    const onSelectedColorChange = (color) => {
        setSelectedColor(color);
        if (colorOverlay.current) {
            colorOverlay.current.value = color;
        }
    };

    return (
        <main className="content">
            {isLoading && <div className="loader"><CircularProgress /></div>}
            {(product && !isLoading) && (
                <div className="product-view">
                    <Link to={SHOP}><h3><i className="fa fa-chevron-left" /> Back to shop</h3> </Link>
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
                            {selectedColor && <input type="color" disabled ref={colorOverlay} id="color-overlay" />}
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
                                    options={product.sizes.sort((a, b) => a < b ? -1 : 1).map(size => ({ label: `${size} mm`, value: size }))}
                                    styles={{ menu: provided => ({ ...provided, zIndex: 10 }) }}
                                />
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
                            <Link to={RECOMMENDED_PRODUCTS}>See All</Link>
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
                                    {(recommendedProducts.length === 0 && isLoadingFeatured) ? new Array(4).fill({}).map((product, index) => (
                                        <FeaturedProduct
                                            key={`product-skeleton ${index}`}
                                            product={product}
                                        />
                                    )) : recommendedProducts.map(product => (
                                        <FeaturedProduct
                                            key={product.id}
                                            isLoading={isLoadingFeatured}
                                            product={product}
                                        />
                                    ))}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
};

export default ViewProduct;
