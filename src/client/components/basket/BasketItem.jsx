import React from 'react';
import Button from '../ui/Button';
import BasketItemControl from './BasketItemControl';

const BasketItem = ({ action, basket, product, removeFrombasket }) => {
  const onRemoveFromBasket = () => {
    removeFrombasket(product.id);
  };

  return (
    <div className="basket-item">
      <BasketItemControl 
          action={action} 
          basket={basket}
          product={product}
      />
      <div className="basket-item-wrapper">
        <div className="basket-item-img-wrapper">
          <img className="basket-item-img" src={product.image} alt=""/>
        </div>
        <div className="basket-item-details">
          <h5 className="basket-item-name">{product.name}</h5>
          <h5 className="basket-item-price">
            $ {(product.price * product.quantity).toFixed(2)}
            <span>{` (x ${product.quantity}) `}</span>
          </h5>
        </div>
        <Button 
            className="basket-item-remove button button-border button-border-gray button-small" 
            onClick={onRemoveFromBasket}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default BasketItem;
