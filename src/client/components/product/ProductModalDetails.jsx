import React from 'react';

import ProductItem from './ProductItem';
import Button from '../ui/Button';
import { displayMoney } from '../../helpers/utils'; 

const ProductModalDetails = ({ product }) => {
  return !product ? null : (
    <ProductItem product={product}>
      {({ state, action, foundOnBasket }) => (
        <div className="product-modal">
          <div className="product-modal-image-wrapper">
            <img 
                alt={product.name}
                className="product-modal-image"
                src={product.image} 
            />
          </div>
          <div className="product-modal-details">
            <h3>{product.name}</h3>
            <span>Brand: <strong>{product.brand}</strong></span>
            <br/>
            <span>Description:&nbsp;</span>
            <span>{product.description}</span>
            <br/>
            <h1>{displayMoney(product.price)}</h1>
            <div className="product-modal-action">
              <Button 
                  className={`button button-small ${foundOnBasket() ? 'button-border button-border-gray' : ''}`} 
                  onClick={action.onAddToBasket}
              >
                {foundOnBasket() ? 'Remove From Basket' : 'Add To Basket'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </ProductItem>
  );
};

export default ProductModalDetails;
