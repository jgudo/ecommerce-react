import React from 'react';
import Button from '../ui/Button';
import ProductItem from './ProductItem';

const ProductClient = ({ product, onOpenModal, onClickProduct }) => {
  const onClickItem = () => {
    onOpenModal();
    onClickProduct(product);
  };

  return (
    <ProductItem product={product}>
      {({ state, action, foundOnBasket }) => (
        <div 
            className="product-card"
            style={{ borderBottom: foundOnBasket() ? '1px solid #4a4a4a' : '' }}
        >
          <div 
              className="product-card-content"
              onClick={onClickItem}    
          >
            <div className="product-card-img-wrapper">
              <img className="product-card-img" src={product.image} alt="" />
            </div>
            <h5 className="product-card-name">{product.name}</h5>
            <p className="product-card-brand">{product.brand}</p>
            <h4 className="product-card-price">$ {product.price}</h4>
          </div>
          <Button 
              className={`product-card-button button button-block ${foundOnBasket() ? 'button-border button-border-gray' : ''}`} 
              onClick={action.onAddToBasket}
          >
            {foundOnBasket() ? 'Remove from basket' : 'Add to basket'}
          </Button>
        </div>
      )}
    </ProductItem>
  );
};

export default ProductClient;
