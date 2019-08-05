import React from 'react';
import Button from '../ui/Button';

const BasketItem = ({ product, removeFrombasket }) => {
  const onRemoveFromBasket = () => {
    removeFrombasket(product.productId);
  };

  return (
    <div className="basket-item">
      <div className="basket-item-img-wrapper">
        <img className="basket-item-img" src={product.productImage} alt=""/>
      </div>
      <div className="basket-item-details">
        <h5 className="basket-item-name">{product.productName}</h5>
        <h5 className="basket-item-price">$ {product.productPrice}</h5>
      </div>
      <Button 
          className="basket-item-remove button button-border button-border-gray button-small" 
          onClick={onRemoveFromBasket}
      >
        Remove
      </Button>
    </div>
  );
};

export default BasketItem;
