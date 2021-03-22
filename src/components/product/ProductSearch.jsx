import { Filters } from 'components/common';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearRecentSearch, removeSelectedRecent, setTextFilter } from 'redux/actions/filterActions';

const ProductSearch = () => {
  const history = useHistory();

  const {
    productsLength, filter, products, isLoading
  } = useSelector((state) => ({
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
      history.push('/');
    }
  };

  const onKeyUp = (e) => {
    if (e.keyCode === 13 && productsLength !== 0) {
      dispatch(setTextFilter(input));
      history.push('/');
    }
  };

  const onClearRecentSearch = () => {
    dispatch(clearRecentSearch());
  };

  return (
    <div className="product-search">
      <div className="product-search-header">
        <h3 onClick={history.goBack} role="presentation">
          <i className="fa fa-chevron-left" />
        </h3>
        <div className="product-search-wrapper">
          <input
            className="product-search-input"
            onChange={onSearchChange}
            onKeyUp={onKeyUp}
            placeholder="Search for product..."
            ref={searchInput}
            type="text"
          />
          <div className="searchbar-icon" />
        </div>
      </div>
      <div className="product-search-body">
        <div className="product-search-recent">
          <div className="product-search-recent-header">
            <h5>Recent Searches</h5>
            <h5 onClick={onClearRecentSearch} style={{ color: 'red' }} role="presentation">
              Clear
            </h5>
          </div>
          {filter.recent.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div className="pill-wrapper" key={`${item}${index}`}>
              <div className="pill padding-right-l">
                <h5
                  className="pill-content margin-0"
                  onClick={() => {
                    dispatch(setTextFilter(item));
                    history.push('/');
                  }}
                  role="presentation"
                >
                  {item}
                </h5>
                <div
                  className="pill-remove"
                  onClick={() => dispatch(removeSelectedRecent(item))}
                  role="presentation"
                >
                  <h5 className="text-subtle margin-0"><i className="fa fa-times-circle" /></h5>
                </div>
              </div>
            </div>
          ))}
          {filter.recent.length === 0 && (
            <h5 className="text-subtle">No recent searches</h5>
          )}
        </div>
        <div className="product-search-filter">
          <h5 className="margin-0">Choose Filters</h5>
        </div>
        <div className="product-search-filter-sub">
          <Filters
            dispatch={dispatch}
            filter={filter}
            isLoading={isLoading}
            products={products}
            productsLength={productsLength}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductSearch;
