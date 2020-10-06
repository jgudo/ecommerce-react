import React from 'react';
import ImageLoader from 'components/ui/ImageLoader';
import { useParams } from 'react-router-dom';

const ViewProduct = () => {
    const { id } = useParams();
    const [selectedImage, setSelectedImage] = useState(props.product.image);
    const { product, foundOnBasket } = useSelector(state => ({
        product: state.products.items.find(item => item.id === id),
        foundOnBasket: !!state.basket.find(item => item.id === id)
    }));

    const onAddToBasket = () => {
        if (foundOnBasket) {
            dispatch(removeFromBasket(id));
            displayActionMessage('Item removed from basket', 'info');
        } else {
            dispatch(addToBasket(product));
            displayActionMessage('Item added to basket', 'success');
        }
    };

    return (
        <div>
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
                            className={`button button-small ${foundOnBasket ? 'button-border button-border-gray' : ''}`}
                            onClick={onAddToBasket}
                        >
                            {foundOnBasket ? 'Remove From Basket' : 'Add To Basket'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewProduct;
