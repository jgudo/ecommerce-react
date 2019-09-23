import React, { useState, useEffect, useRef } from 'react';
import Filters from 'components/ui/Filters';

import { 
  resetFilter, 
  setTextFilter, 
  removeSelectedRecent, 
  clearRecentSearch
} from 'actions/filterActions';  

const Header = ({ 
  dispatch, 
  filter, 
  isLoading, 
  products,
  productsLength, 
  filteredProductsLength,
  history 
}) => {
  const [searchInput, setSearchInput] = useState(filter.keyword);
  const searchbarRef = useRef(null);

  useEffect(() => {
    setSearchInput(filter.keyword);
  }, [filter.keyword]);

  useEffect(() => {
    document.addEventListener('click', watchForClick);

    return () => {
      document.removeEventListener('click', watchForClick);
    }
  }, []);

  const isFiltered = ['keyword', 'brand', 'minPrice', 'maxPrice', 'sortBy'].some(key => !!filter[key]);
  const isMobile = window.screen.width <= 480 ? true : false;

  const onSearchChange = (e) => {
    const val = e.target.value.trimStart();
    setSearchInput(val);
  };

  const onKeyUp = (e) => {
    if (e.keyCode === 13 && productsLength !== 0) {
      dispatch(setTextFilter(searchInput));
      e.target.blur();
      searchbarRef.current.classList.remove('is-open-recent-search');
      isMobile && history.push('/');
    }
  };

  const onFocusInput = (e) => {
    e.target.select();
    searchbarRef.current.classList.add('is-open-recent-search');
  }

  const onClickToggle = () => {
    if (document.body.classList.contains('is-open-filters')) {
      document.body.classList.remove('is-open-filters');
    } else {
      document.body.classList.add('is-open-filters');
    }
  };

  const onClickRecentSearch = (keyword) => {
    dispatch(setTextFilter(keyword));
    searchbarRef.current.classList.remove('is-open-recent-search');
  }

  const watchForClick = (e) => {
    const toggleClosest = e.target.closest('.filters-toggle');
    const searchbarClosest = e.target.closest('.searchbar-recent');
    const searchbarInput = e.target.closest('.searchbar-input');
    const searchBarRemove = e.target.closest('.searchbar-recent-button');

    try {
      if (!toggleClosest && document.body.classList.contains('is-open-filters')) {
        document.body.classList.remove('is-open-filters');
      }

      if (!searchbarClosest && !searchbarInput && !searchBarRemove) {
        searchbarRef.current.classList.remove('is-open-recent-search');
      }
    } catch (e) {}
  };

  const onClearRecent = () => {
    dispatch(clearRecentSearch());
  };

  const onResetFilter = () => {
    dispatch(resetFilter())
  };

  return (
    <>
      <div className="product-list-header-title">
        {isFiltered ? (
          <h3>
            {filteredProductsLength === 0 
              ? `No product found` 
              : `Found ${filteredProductsLength} ${filteredProductsLength > 1 ? 'products' : 'product'}`
            }
          </h3>
        ) : <h3>Eyewear</h3>}
      </div>
      <div className="product-list-header-actions">
        {isFiltered && (
          <button
              className="button button-muted button-small"
              onClick={onResetFilter}
          >
            Reset Filters
          </button>
        )}
        &nbsp;
        <div className="filters-toggle">
            <button
                className="button button-small button-border button-border-gray"
                disabled={isLoading}
                onClick={onClickToggle}
            >
              Filters
              <div className="filters-toggle-caret icon-caret" />
            </button>
          <div className="filters-toggle-sub">
            <Filters 
                dispatch={dispatch}
                products={products}
                productsLength={productsLength}
                filter={filter}
                isLoading={isLoading}
            />
          </div>
        </div>
        &nbsp;
        <div className="searchbar" ref={searchbarRef}>
          <input
              className="search-input searchbar-input" 
              onChange={onSearchChange}
              onKeyUp={onKeyUp}
              onFocus={onFocusInput}
              placeholder="Filter products by keyword"
              readOnly={isLoading}
              type="text" 
              value={searchInput}
          />
          {filter.recent.length !== 0 && (
            <div className="searchbar-recent">
              <div className="searchbar-recent-header">
                <h5>Recent Search</h5>
                <h5 
                    className="searchbar-recent-clear text-subtle"
                    onClick={onClearRecent}
                >
                  Clear
                </h5>
              </div>
              {filter.recent.map(item => (
                <div 
                    className="searchbar-recent-wrapper"
                    key={`search-${item}`}
                >
                  <h5 
                      className="searchbar-recent-keyword margin-0"
                      onClick={() => onClickRecentSearch(item)}
                  >
                    {item}
                  </h5>
                  <span 
                      className="searchbar-recent-button text-subtle"
                      onClick={() => dispatch(removeSelectedRecent(item))}
                  >
                    X
                  </span>
                </div>
              ))}
            </div>
          )}
          <div className="searchbar-icon" style={{ opacity: isLoading ? .5 : 1 }}/>
        </div>
      </div>
    </>
  );
};

export default Header;
