import React from 'react';
import PropTypes from 'prop-types';
import BasketItemControl from './BasketItemControl';

const BasketItem = ({ action, basket, product }) => {
  const onRemoveFromBasket = () => {
    action.removeFromBasket(product.id);
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
        <button 
            className="basket-item-remove button button-border button-border-gray button-small" 
            onClick={onRemoveFromBasket}
        >
          x
        </button>
      </div>
    </div>
  );
};

BasketItem.propType = {
  action: PropTypes.objectOf(PropTypes.func).isRequired,
  product: PropTypes.object.isRequired,
  basket: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default BasketItem;
