import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '../ui/CircularProgress';
import MessageDisplay from '../ui/MessageDisplay';

import { ADMIN_PRODUCTS } from 'constants/routes';
import { getProducts } from 'actions/productActions';
import { isLoading as dispatchIsLoading } from 'actions/appActions';

const ProductList = ({ 
  isLoading, 
  requestStatus, 
  productsLength,
  filteredProductsLength, 
  lastRefKey,
  totalItems,
  dispatch,
  children 
}) => {
  const [isFetching, setFetching] = useState(false);

  useEffect(() => {
    if (productsLength === 0)  {
      fetchProducts();
    }
    
    window.scrollTo(0, 0);
    return () => dispatch(dispatchIsLoading(false));
  }, []);

  useEffect(() => {
    setFetching(false);
  }, [lastRefKey]);

  const fetchProducts = () => {
    setFetching(true);
    dispatch(getProducts(lastRefKey));
  };

  return filteredProductsLength === 0 && !isLoading && !requestStatus ? (
    <MessageDisplay 
        message="The are no items found."
        desc="Try using correct filters or keyword."
    />
  ) : requestStatus ? (
    <MessageDisplay 
        message={requestStatus}
        action={fetchProducts}
        buttonLabel="Try Again"
    />
  ) : (
    <>
    {children}
    {productsLength < totalItems && (
      <div className="d-flex-center padding-l">
        <button 
            className="button button-small"
            disabled={isFetching}
            onClick={fetchProducts}
        >
          {isFetching ? 'Fetching Items...' : 'Fetch More Items'}
        </button>
      </div>
    )}
    </>
  )
};

ProductList.propType = {
  isLoading: PropTypes.bool.isRequired,
  requestStatus: PropTypes.string.isRequired,
  productsLength: PropTypes.number.isRequired,
  filteredProductsLength: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default ProductList;

