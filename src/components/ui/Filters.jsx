import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { resetFilter, applyFilter } from 'actions/filterActions';
import { selectMax, selectMin } from 'selectors/selector';

import PriceRange from './PriceRange';

const Filters = (props) => {
  const { productsLength, products, filter, isLoading, dispatch } = props;
  const max = selectMax(products);
  const min = selectMin(products);
  const [isMounted, setMounted] = useState(false);
  const [filterField, setFilter] = useState({
    brand: filter.brand,
    minPrice: filter.minPrice,
    maxPrice: filter.maxPrice,
    sortBy: filter.sortBy
  })

  useEffect(() => {
    // toggleRef && toggleRef.current.classList.remove('is-open-filters');
    document.body.classList.remove('is-open-filters');
    (isMounted && window.screen.width <= 480) && props.history.push('/');

    // update state upon prop filter change
    setFilter({
      brand: filter.brand,
      minPrice: filter.minPrice,
      maxPrice: filter.maxPrice,
      sortBy: filter.sortBy
    });
    setMounted(true);
    window.scrollTo(0, 0);
  }, [filter.brand, filter.minPrice, filter.maxPrice, filter.sortBy]);


  const onPriceChange = (min, max) => {
    setFilter({ ...filterField, minPrice: min, maxPrice: max });
  };

  const onBrandFilterChange = (e) => {
    const val = e.target.value;

    setFilter({ ...filterField, brand: val });
  };

  const onSortFilterChange = (e) => {
    setFilter({ ...filterField, sortBy: e.target.value });
  };


  const onApplyFilter = () => {
    const newFilter = {
      brand: filterField.brand,
      minPrice: filterField.minPrice,
      maxPrice: filterField.maxPrice,
      sortBy: filterField.sortBy,
    };

    if (Object.keys(newFilter).some(key => filter[key] !== newFilter[key])) {
      dispatch(applyFilter(newFilter));
    }
  };

  const onResetFilter = () => {
    if (['brand', 'minPrice', 'maxPrice', 'sortBy'].some(key => !!filter[key])) {
      dispatch(resetFilter());
    }
  };

  return (
    <div className="filters">
      <div className="filters-field">
        <span>Brand</span>
        <br/>
        <br/>
        {productsLength === 0 && isLoading ? (
          <h5 className="text-subtle">Loading Filter</h5>
        ) : (
          <select 
              className="filters-brand"
              value={filterField.brand}
              disabled={isLoading || productsLength === 0}
              onChange={onBrandFilterChange}
          >
            <option value="">All Brands</option>
            <option value="salt">Salt Maalat</option>
            <option value="betsin">Betsin Maalat</option>
            <option value="black">Black Kibal</option>
            <option value="sexbomb">Sexbomb</option>
          </select>
        )}
      </div>
      <div className="filters-field">
        <span>Sort By</span>
        <br/>
        <br/>
        <select 
              className="filters-sort-by d-block"
              value={filterField.sortBy}
              disabled={isLoading || productsLength === 0}
              onChange={onSortFilterChange}
          >
            <option value="">None</option>
            <option value="name-asc">Name Ascending A - Z</option>
            <option value="name-desc">Name Descending Z - A</option>
            <option value="price-desc">Price High - Low</option>
            <option value="price-asc">Price Low - High</option>
          </select>
      </div>
      <div className="filters-field">
        <span>Price Range</span>
        <br/>
        <br/>
        {productsLength === 0 && isLoading ? (
          <h5 className="text-subtle">Loading Filter</h5>
        ) : (
          <PriceRange 
              min={min} 
              max={max} 
              initMin={filterField.minPrice}
              initMax={filterField.maxPrice}
              onPriceChange={onPriceChange}
              productsLength={productsLength}
          />
        )}
      </div>
      <div className="filters-action">
        <button
            className="filters-button button button-small"
            disabled={isLoading || productsLength === 0}
            onClick={onApplyFilter}
        >
          Apply filters
        </button>
        <button
            className="filters-button button button-border button-small"
            disabled={isLoading || productsLength === 0}
            onClick={onResetFilter}
        >
          Reset filters
        </button>
      </div>
    </div>
  );
};

export default withRouter(Filters);
