import React from 'react';
import PropTypes from 'prop-types';
import { removeFromBasket, addToBasket } from '../../actions/basketActions';
import { displayMoney, displayActionMessage } from '../../helpers/utils';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ImageLoader from '../ui/ImageLoader';

const ProductItem = ({ 
  product, 
  onOpenModal, 
  onClickProduct,
  dispatch,
  foundOnBasket
 }) => {

  const onClickItem = () => {
    if (product.id) {
      onOpenModal();
      onClickProduct(product);
    }
  };

  const onAddToBasket = () => {
    if (foundOnBasket(product.id)) {
      dispatch(removeFromBasket(product.id));
      displayActionMessage('Item removed from basket', 'info');
    } else {
      dispatch(addToBasket(product));
      displayActionMessage('Item added to basket', 'success');
    }
  };

  return (
    <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
      <div 
          className={`product-card ${!product.id ? 'product-loading' : ''}`}
          style={{ 
            border: foundOnBasket(product.id) ? '1px solid #cacaca' : '',
            boxShadow: foundOnBasket(product.id) ? '0 10px 15px rgba(0, 0, 0, .07)' : 'none' 
          }}
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
          <h5 className="product-card-name text-overflow-ellipsis margin-auto">{product.name || <Skeleton width={80} />}</h5>
          <p className="product-card-brand">{product.brand || <Skeleton width={60} />}</p>
          <h4 className="product-card-price">{product.price ? displayMoney(product.price) : <Skeleton width={40} />}</h4>
        </div>
        {product.id && (
          <button 
              className={`product-card-button button-small button button-block ${foundOnBasket(product.id) ? 'button-border button-border-gray' : ''}`} 
              onClick={onAddToBasket}
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
  dispatch: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
  onOpenModal: PropTypes.func,
  foundOnBasket: PropTypes.func.isRequired
};

export default ProductItem;
