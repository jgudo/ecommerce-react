import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ImageLoader from 'components/ui/ImageLoader';
import CircularProgress from 'components/ui/ImageLoader';
import { HOME } from 'constants/routes';
import { removeFromBasket, addToBasket } from 'redux/actions/basketActions';
import { displayMoney, displayActionMessage } from 'helpers/utils';
import firebase from '../../firebase/firebase';
import useScrollTop from 'hooks/useScrollTop';
import useDocumentTitle from 'hooks/useDocumentTitle';

const ViewProduct = () => {
    useScrollTop();

    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const store = useSelector(state => ({
        product: state.products.items.find(item => item.id === id),
        basket: state.basket
    }));
    useDocumentTitle(`View ${store.product ? store.product.name : 'Item'}`);

    const [selectedImage, setSelectedImage] = useState(store.product ? store.product.image : '');
    const [product, setProduct] = useState(store.product || null);
    const foundOnBasket = () => store.basket.find(item => item.id === product.id);

    const onAddToBasket = () => {
        if (foundOnBasket()) {
            dispatch(removeFromBasket(product.id));
            displayActionMessage('Item removed from basket', 'info');
        } else {
            dispatch(addToBasket(product));
            displayActionMessage('Item added to basket', 'success');
        }
    };

    useEffect(() => {
        if (!product) {
            firebase.getProduct(id)
                .then((doc) => {
                    if (doc.exists) {
                        const data = doc.data();

                        setProduct(data);
                        setSelectedImage(data.image);
                    } else {
                        history.push(HOME);
                    }
                })
                .catch((e) => {
                    history.push(HOME);
                });
        }
    }, [])

    return product ? (
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
            <div className="loader"><CircularProgress /></div>
        );
};

export default ViewProduct;
