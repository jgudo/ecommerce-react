import React, { useState, useEffect } from 'react';
import Filters from '../../components/ui/Filters';

import { resetFilter, applyFilter } from '../../actions/filterActions';  

const Header = (props) => {
  const { dispatch, products, filter, isLoading } = props;
  const [searchInput, setSearchInput] = useState(filter.keyword);

  useEffect(() => {
    setSearchInput(filter.keyword);
  }, [filter.keyword]);

  const isFiltered = ['keyword', 'brand', 'minPrice', 'maxPrice', 'sortBy'].some(key => !!filter[key]);
  const isMobile = window.screen.width <= 480 ? true : false;

  const onSearchChange = (e) => {
    const val = e.target.value.trim();
    setSearchInput(val);
    
    if (val === '' && products.length !== 0) {
      dispatch(applyFilter({ keyword: val }));
    }
  };

  const onKeyUp = (e) => {
    if (e.keyCode === 13 && products.length !== 0) {
      dispatch(applyFilter({ keyword: searchInput }));
      isMobile && props.history.push('/');
    }
  };

  const onClickToggle = () => {
    if (document.body.classList.contains('is-open-filters')) {
      document.body.classList.remove('is-open-filters');
    } else {
      document.body.classList.add('is-open-filters');
    }
  };

  document.addEventListener('click', (e) => {
    const toggleClosest = e.target.closest('.filters-toggle');

    try {
      if (!toggleClosest && document.body.classList.contains('is-open-filters')) {
        document.body.classList.remove('is-open-filters');
      }
    } catch (e) {}
  });

  return (
    <>
      {isFiltered && (
        <button
            className="button button-muted button-small"
            onClick={() => dispatch(resetFilter())}
        >
          Reset Filters
        </button>
      )}
      &nbsp;
      <div className="filters-toggle">
        <button
            className="button button-small button-border button-border-gray"
            onClick={onClickToggle}
        >
          Filters
          <div className="filters-toggle-caret icon-caret" />
        </button>
        <div className="filters-toggle-sub">
          <Filters 
              dispatch={dispatch}
              products={products}
              filter={filter}
              isLoading={isLoading}
          />
        </div>
      </div>
      &nbsp;
      <div className="searchbar">
        <input
            className="search-input searchbar-input" 
            onChange={onSearchChange}
            onKeyUp={onKeyUp}
            placeholder="Search for product"
            readOnly={isLoading}
            type="text" 
            value={searchInput}
        />
        <div className="searchbar-icon" />
      </div>
    </>
  );
};

export default Header;
