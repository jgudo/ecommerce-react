import React from 'react';
import Button from '../ui/Button';

const ProductClient = ({ product, addToBasket }) => {
  const onAddToBasket = () => {
    addToBasket(product);
  };

  return (
    <div className="product-card">
      <div className="product-card-content">
        <div className="product-card-img-wrapper">
          <img className="product-card-img" src={product.productImage} alt="" />
        </div>
        <h5 className="product-card-name">{product.productName}</h5>
        <p className="product-card-brand">{product.productBrand}</p>
        <h4 className="product-card-price">$ {product.productPrice}</h4>
      </div>
      <Button 
          className="product-card-button button button-block" 
          onClick={onAddToBasket}
      >
        Add To Cart
      </Button>
    </div>
  );
};

export default ProductClient;
