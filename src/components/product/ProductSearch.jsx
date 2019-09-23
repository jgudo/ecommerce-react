import React, { useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearRecentSearch, removeSelectedRecent, setTextFilter } from 'actions/filterActions';

import Filters from '../ui/Filters';

const ProductSearch = (props) => {
  const { productsLength, filter, products, isLoading} = useSelector(state => ({
    filter: state.filter,
    products: state.products.items,
    isLoading: state.app.loading,
    productsLength: state.products.length
  }));
  const dispatch = useDispatch();
  const searchInput = useRef(null);
  let input = '';

  useEffect(() => {
    searchInput.current.focus();
  }, []);

  const onSearchChange = (e) => {
    const val = e.target.value.trim();
    input = val;
    
    if (val === '' && productsLength !== 0) {
      dispatch(setTextFilter(val));
      props.history.push('/');
    }
  };

  const onKeyUp = (e) => {
    if (e.keyCode === 13 && productsLength !== 0) {
      dispatch(setTextFilter(input));
      props.history.push('/');
    }
  };

  const onClearRecentSearch = () => {
    dispatch(clearRecentSearch());
  };

  return (
    <div className="product-search">
      <div className="product-search-header">
        <h5 className="color-light" onClick={props.history.goBack}>Back</h5>
        <div className="product-search-wrapper">
          <input 
              className="search-input product-search-input"
              onChange={onSearchChange}
              onKeyUp={onKeyUp}
              placeholder="Search for product" 
              ref={searchInput}
              type="text" 
          />
          <div className="searchbar-icon" />
        </div>
      </div>
      <div className="product-search-body">
        <div className="product-search-filter">
          <h5 className="margin-0">Choose Filters</h5>
        </div>
        <div className="product-search-filter-sub">
          <Filters 
              products={products}
              dispatch={dispatch}
              isLoading={isLoading}
              productsLength={productsLength}
              filter={filter}
          />
        </div>
        <div className="product-search-recent">
          <div className="product-search-recent-header">
            <h5>Recent Searches</h5>
            <h5 onClick={onClearRecentSearch}>Clear</h5>
          </div>
          {filter.recent.map((item, index) => (
            <div className="pill-wrapper" key={`${item}${index}`}>
              <div className="pill padding-right-l">
                <h5 
                    className="pill-title"
                    onClick={() => {
                      dispatch(setTextFilter(item));
                      props.history.push('/');
                    }}
                >
                  {item}
                </h5>
                <div className="pill-remove" onClick={() => dispatch(removeSelectedRecent(item))}>
                  <h5 className="margin-0">x</h5>
                </div>
              </div>
            </div>
          ))}
          {filter.recent.length === 0 && (
            <h5 className="text-subtle">No recent searches</h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default withRouter(ProductSearch);
