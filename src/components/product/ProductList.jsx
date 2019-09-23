import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '../ui/CircularProgress';
import { getProducts } from 'actions/productActions';
import { isLoading as dispatchIsLoading } from 'actions/appActions';
import { debounce } from 'decorator/decorator';

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
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const [isFetching, setFetching] = useState(false);

  useEffect(() => {  
    productsLength === 0 && onGetProducts();
  
    return () => dispatch(dispatchIsLoading(false));
  }, []);

  useEffect(() => {
    debounce(() => window.scrollTo(0, lastScrollPos), 100)();
    setFetching(false);
  }, [lastRefKey]);

  useEffect(() => {
    window.addEventListener('scroll', watchForScroll);

    return () => window.removeEventListener('scroll', watchForScroll);
  }, [lastRefKey, isLoading]);

  const watchForScroll = () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = winScroll / height;  
    
    if (scrolled === 1 && lastRefKey !== '' && !isLoading && productsLength < totalItems ) {
      setLastScrollPos(window.pageYOffset);
      setFetching(true);

      debounce(onGetProducts, 2000)();
    }  
  };
  
  const onGetProducts = () => dispatch(getProducts(lastRefKey));

  return filteredProductsLength === 0 && !isLoading && !requestStatus ? (
    <div className="loader">
      <h3 className="text-center">There are no items found</h3>
      <span>Try using correct filters and keyword</span>
    </div>
  ) : requestStatus ? (
    <div className="loader">
      <h3 className="text-center">{requestStatus}</h3>
      <br/>
      <button 
          className="button button-small"
          onClick={onGetProducts}
      >
        Try again
      </button>
    </div>
  ) : (
    <>
    {children}
    {(isFetching) && (
      <div className="d-flex-center padding-l">
        <CircularProgress />
        <span>&nbsp;Fetching more items...</span>
      </div>
    )}
    {(!isFetching && productsLength === totalItems) && (
      <div className="d-flex-center padding-l">
        <span>End of result.</span>
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

