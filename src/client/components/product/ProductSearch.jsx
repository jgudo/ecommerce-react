import React, { useEffect, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { clearRecentSearch, setTextFilter } from '../../actions/filterActions';

import Filters from '../ui/Filters';
import SearchBar from '../ui/SearchBar';

const ProductSearch = (props) => {
  const filter = useSelector(state => state.filter);
  const dispatch = useDispatch();
  const searchInput = useRef(null);

  useEffect(() => {
    searchInput.current.focus();
  }, []);

  const onClearRecentSearch = () => {
    dispatch(clearRecentSearch());
  };

  return (
    <div className="product-search">
      <div className="product-search-header">
        <h5 className="color-light" onClick={props.history.goBack}>Back</h5>
        <SearchBar>
          {({ onSearchChange, onSubmitSearch}) => (
            <>
              <input 
                  className="product-search-input"
                  onChange={onSearchChange}
                  onKeyUp={(e) => {
                    if (e.keyCode === 13)  {
                      onSubmitSearch();
                      props.history.push('/');
                    }
                  }}
                  placeholder="Search for product" 
                  ref={searchInput}
                  type="text" 
              />
              <div 
                  className="product-search-button"
                  onClick={() => {
                    onSubmitSearch();
                    props.history.push('/');
                  }}
              />
            </>
          )}
        </SearchBar>
        
      </div>
      <div className="product-search-body">
        <div className="product-search-filter">
          <h5 className="margin-0">Choose Filters</h5>
        </div>
        <div className="product-search-filter-sub">
          <Filters />
        </div>
        <div className="product-search-recent">
          <div className="product-search-recent-header">
            <h5>Recent Searches</h5>
            <h5 onClick={onClearRecentSearch}>Clear</h5>
          </div>
          {filter.recent.map((item, index) => (
            <div 
                className="pill" 
                key={`${item}${index}`}
                onClick={() => {
                  dispatch(setTextFilter(item));
                  props.history.push('/');
                }}
            >
              <h5 className="pill-title">{item}</h5>
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
