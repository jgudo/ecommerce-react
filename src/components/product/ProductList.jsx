import React, { useEffect } from 'react';
import { getProducts } from '../../actions/productActions';
import { isLoading as dispatchIsLoading } from '../../actions/appActions';

const ProductList = ({ 
  isLoading, 
  requestStatus, 
  productsLength,
  filteredProductsLength, 
  dispatch,
  children 
}) => {
  
  useEffect(() => {
    productsLength === 0 && onGetProducts();

    return () => {
      dispatch(dispatchIsLoading(false));
    };
  }, []);
  
  const onGetProducts = () => dispatch(getProducts());

  return filteredProductsLength === 0 && !isLoading && !requestStatus ? (
    <div className="loader">
      <h4>There are no items found</h4>
      <span>Try using correct filters and keyword</span>
    </div>
  ) : requestStatus ? (
    <div className="loader">
      <h4>{requestStatus}</h4>
      <br/>
      <button 
          className="button button-small"
          onClick={onGetProducts}
      >
        Try again
      </button>
    </div>
  ) : children;
}

export default ProductList;

