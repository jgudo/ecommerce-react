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
  location,
  children 
}) => {
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const [isFetching, setFetching] = useState(false);
  const [scrolledAtBottom, setScrolledAtBottom] = useState(false);
  const [columnCount, setColumnCount] = useState(6);

  useEffect(() => {
    if (productsLength === 0)  {
      fetchProducts();
    }
  
    return () => dispatch(dispatchIsLoading(false));
  }, []);

  useEffect(() => {
    window.scrollTo(0, lastScrollPos);
    setFetching(false);
  }, [lastRefKey]); // watch for changes on lastRefKey, if it changes that means new products have been fetched.

  useEffect(() => {
    window.addEventListener('scroll', watchForScroll);

    return () => window.removeEventListener('scroll', watchForScroll);
  }, [lastRefKey, isLoading]); // re-add event listener since the height of the window has increased for fetching new items.

  const watchForScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = winScroll / height;  // value of 1 means it's at the bottom
    
    if (scrolled === 1 && !!lastRefKey && !isLoading && productsLength < totalItems ) {
      setLastScrollPos(window.pageYOffset);
      setScrolledAtBottom(true);
      window.removeEventListener('scroll', watchForScroll);
    } 
  };

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
    {((scrolledAtBottom || location.pathname === ADMIN_PRODUCTS) && productsLength < totalItems) && (
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

