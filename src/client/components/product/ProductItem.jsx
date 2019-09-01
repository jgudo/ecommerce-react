import React from 'react';
import PropTypes from 'prop-types';
import { displayMoney } from '../../helpers/utils';

import ImageLoader from '../ui/ImageLoader';

const ProductItem = ({ 
  product, 
  onOpenModal, 
  onClickProduct,
  addToBasket,
  foundOnBasket
 }) => {

  const onClickItem = () => {
    onOpenModal();
    onClickProduct(product);
  };

  return (
    <div 
        className="product-card"
        style={{ borderBottom: foundOnBasket(product.id) ? '1px solid #4a4a4a' : null }}
    >
      <div 
          className="product-card-content"
          onClick={onClickItem}    
      >
        <div className="product-card-img-wrapper">
          <ImageLoader 
              className="product-card-img" 
              src={product.image}
          />
          {/* <img className="product-card-img" src={product.image} alt="" /> */}
        </div>
        <h5 className="product-card-name text-overflow-ellipsis">{product.name}</h5>
        <p className="product-card-brand">{product.brand}</p>
        <h4 className="product-card-price">{displayMoney(product.price)}</h4>
      </div>
      <button 
          className={`product-card-button button-small button button-block ${foundOnBasket(product.id) ? 'button-border button-border-gray' : ''}`} 
          onClick={() => {
            addToBasket(product.id, product);
          }}
      >
        {foundOnBasket(product.id) ? 'Remove from basket' : 'Add to basket'}
      </button>
    </div>
  );
};

ProductItem.propType = {
  onClickItem: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  addToBasket: PropTypes.func.isRequired,
  foundOnBasket: PropTypes.func.isRequired
};

export default ProductItem;
