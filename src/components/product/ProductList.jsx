/* eslint-disable react/forbid-prop-types */
import { Boundary, MessageDisplay } from 'components/common';
import PropType from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setLoading } from 'redux/actions/miscActions';
import { getProducts } from 'redux/actions/productActions';

const ProductList = (props) => {
  const {
    products, filteredProducts, isLoading, requestStatus, children
  } = props;
  const [isFetching, setFetching] = useState(false);
  const dispatch = useDispatch();

  const fetchProducts = () => {
    setFetching(true);
    dispatch(getProducts(products.lastRefKey));
  };

  useEffect(() => {
    if (products.items.length === 0 || !products.lastRefKey) {
      fetchProducts();
    }

    window.scrollTo(0, 0);
    return () => dispatch(setLoading(false));
  }, []);

  useEffect(() => {
    setFetching(false);
  }, [products.lastRefKey]);

  if (filteredProducts.length === 0 && !isLoading) {
    return (
      <MessageDisplay message={requestStatus?.message || 'No products found.'} />
    );
  } if (filteredProducts.length === 0 && requestStatus) {
    return (
      <MessageDisplay
        message={requestStatus?.message || 'Something went wrong :('}
        action={fetchProducts}
        buttonLabel="Try Again"
      />
    );
  }
  return (
    <Boundary>
      {children}
      {/* Show 'Show More' button if products length is less than total products */}
      {products.items.length < products.total && (
        <div className="d-flex-center padding-l">
          <button
            className="button button-small"
            disabled={isFetching}
            onClick={fetchProducts}
            type="button"
          >
            {isFetching ? 'Fetching Items...' : 'Show More Items'}
          </button>
        </div>
      )}
    </Boundary>
  );
};

ProductList.defaultProps = {
  requestStatus: null
};

ProductList.propTypes = {
  products: PropType.object.isRequired,
  filteredProducts: PropType.array.isRequired,
  isLoading: PropType.bool.isRequired,
  requestStatus: PropType.string,
  children: PropType.oneOfType([
    PropType.arrayOf(PropType.node),
    PropType.node
  ]).isRequired
};

export default ProductList;
