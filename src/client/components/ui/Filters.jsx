import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { resetFilter, applyFilter, setBrandFilter } from '../../actions/filterActions';
import { selectMax, selectMin } from '../../selectors/selector';
import { displayActionMessage } from '../../helpers/utils';

import PriceRange from './PriceRange';

const Filters = (props) => {
  const dispatch = useDispatch();
  const { max, min, filter, isLoading, productCount } = useSelector(state => ({
    max: selectMax(state.products),
    min: selectMin(state.products),
    filter: state.filter,
    productCount: state.products.length,
    isLoading: state.app.loading
  }));

  const [brandFilter, setBrandState] = useState(filter.brand);
  const [minPriceFilter, setMinPriceState] = useState(filter.minPrice);
  const [maxPriceFilter, setMaxPriceState] = useState(filter.maxPrice);

  const onMinPriceChange = (val) => {
    setMinPriceState(val);
  };

  const onMaxPriceChange = (val) => {
    setMaxPriceState(val);
  };

  const onBrandFilterChange = (e) => {
    const val = e.target.value;

    setBrandState(val);
  };

  const onApplyFilter = () => {
    dispatch(applyFilter({
      brand: brandFilter,
      minPrice: minPriceFilter,
      maxPrice: maxPriceFilter
    }));
    props.history.push('/');
    displayActionMessage('Filters applied successfully!');
  };

  const onResetFilter = () => {
    dispatch(resetFilter());
    props.history.push('/');
    displayActionMessage('Filters reset successfully!');
  };

  return (
    <div className="filters">
      <div className="filters-field">
        <span>Brand</span>
        <br/>
        <br/>
        {productCount === 0 && isLoading ? (
          <h5 className="text-subtle">Loading Filter</h5>
        ) : (
          <select 
              className="filters-brand"
              value={brandFilter}
              disabled={isLoading}
              onChange={onBrandFilterChange}
          >
            <option value="">All Brands</option>
            <option value="salt">Salt Maalat</option>
            <option value="betsin">Betsin Maalat</option>
          </select>
        )}
      </div>
      <div className="filters-field">
        <span>Price Range</span>
        <br/>
        <br/>
        {productCount === 0 && isLoading ? (
          <h5 className="text-subtle">Loading Filter</h5>
        ) : (
          <PriceRange 
              min={min} 
              max={max} 
              onMaxPriceChange={onMaxPriceChange}
              onMinPriceChange={onMinPriceChange}
          />
        )}
      </div>
      <div className="filters-action">
        <button
            className="filters-button button button-small"
            disabled={isLoading}
            onClick={onApplyFilter}
        >
          Apply filters
        </button>
        <button
            className="filters-button button button-border button-small"
            disabled={isLoading}
            onClick={onResetFilter}
        >
          Reset filters
        </button>
      </div>
    </div>
  );
};

export default withRouter(Filters);
