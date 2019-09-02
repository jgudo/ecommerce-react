import React from 'react';
import PropTypes from 'prop-types';
import { displayMoney } from '../../helpers/utils';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ImageLoader from '../ui/ImageLoader';

const ProductItem = ({ 
  product, 
  onOpenModal, 
  onClickProduct,
  addToBasket,
  foundOnBasket
 }) => {

  const onClickItem = () => {
    if (product.id) {
      onOpenModal();
      onClickProduct(product);
    }
  };

  return (
    <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
      <div 
          className={`product-card ${!product.id && 'product-loading'}`}
          style={{ borderBottom: foundOnBasket(product.id) ? '1px solid #4a4a4a' : null }}
      >
        <div 
            className="product-card-content"
            onClick={onClickItem}    
        >
          <div className="product-card-img-wrapper">
            {product.image ? (
              <ImageLoader 
                  className="product-card-img" 
                  src={product.image}
              />
            ) : <Skeleton width={100} height={70}/>}
          </div>
          <h5 className="product-card-name text-overflow-ellipsis">{product.name || <Skeleton />}</h5>
          <p className="product-card-brand">{product.brand || <Skeleton width={70} />}</p>
          <h4 className="product-card-price">{product.price ? displayMoney(product.price) : <Skeleton width={50} />}</h4>
        </div>
        {product.id && (
          <button 
              className={`product-card-button button-small button button-block ${foundOnBasket(product.id) ? 'button-border button-border-gray' : ''}`} 
              onClick={() => {
                addToBasket(product.id, product);
              }}
          >
            {foundOnBasket(product.id) ? 'Remove from basket' : 'Add to basket'}
          </button>
        )}
        
      </div>
    </SkeletonTheme>
  );
};

ProductItem.propType = {
  onClickItem: PropTypes.func,
  product: PropTypes.object.isRequired,
  onOpenModal: PropTypes.func,
  addToBasket: PropTypes.func,
  foundOnBasket: PropTypes.func
};

export default ProductItem;
