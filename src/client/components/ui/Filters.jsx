import React, { useState } from 'react';
import { connect } from 'react-redux';
import { resetFilter, applyFilter } from '../../actions/filterActions';
import { selectMax, selectMin } from '../../selectors/selector';

import PriceRange from './PriceRange';

const Filters = (props) => {
  const { 
    dispatchResetFilter,
    dispatchApplyFilter,
    max, 
    min,
    filter,
    isLoading 
  } = props;

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
    dispatchApplyFilter({ 
      brand: brandFilter,
      minPrice: minPriceFilter,
      maxPrice: maxPriceFilter
    });
  };

  return (
    <div className="filters">
      <div className="filters-field">
        <span>Brand</span>
        <br/>
        <br/>
        <select 
            className="filters-brand"
            defaultValue={brandFilter || 'Brand'}
            disabled={isLoading}
            onChange={onBrandFilterChange}
        >
          <option value="">All Brands</option>
          <option value="salt">Salt Maalat</option>
          <option value="betsin">Betsin Maalat</option>
        </select>
      </div>
      <div className="filters-field">
        <span>Price Range</span>
        <br/>
        <br/>
        <PriceRange 
            min={min} 
            max={max} 
            onMaxPriceChange={onMaxPriceChange}
            onMinPriceChange={onMinPriceChange}
        />
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
            onClick={dispatchResetFilter}
        >
          Reset filters
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ products, filter, app }) => ({
  products,
  filter,
  min: selectMin(products),
  max: selectMax(products),
  isLoading: app.loading
});

const mapDispatchToProps = dispatch => ({
  dispatchResetFilter: () => dispatch(resetFilter()),
  dispatchApplyFilter: filters => dispatch(applyFilter(filters))
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
