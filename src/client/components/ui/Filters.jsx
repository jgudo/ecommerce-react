import React, { useState } from 'react';
import { connect } from 'react-redux';
import { 
  setBrandFilter, 
  setMinPriceFilter, 
  setMaxPriceFilter,
  resetFilter,
  applyFilter 
} from '../../actions/filterActions';
import { selectMax, selectMin } from '../../selectors/selector';

import PriceRange from './PriceRange';

const Filters = (props) => {
  const { 
    // dispatchSetBrandFilter, 
    // dispatchSetMaxPriceFilter, 
    // dispatchSetMinPriceFilter, 
    dispatchResetFilter,
    dispatchApplyFilter,
    max, 
    min,
    filter 
  } = props;

  const [brandFilter, setBrandState] = useState(filter.brand);
  const [minPriceFilter, setMinPriceState] = useState(filter.minPrice);
  const [maxPriceFilter, setMaxPriceState] = useState(filter.maxPrice);

  const onMinPriceChange = async (val) => {
    setMinPriceState(val);
    // await dispatchSetMinPriceFilter(val);
  };

  const onMaxPriceChange = async (val) => {
    setMaxPriceState(val);
    // await dispatchSetMaxPriceFilter(val);
  };

  const onBrandFilterChange = (e) => {
    const val = e.target.value;

    setBrandState(val);
    // dispatchSetBrandFilter(val);
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
            onClick={onApplyFilter}
        >
          Apply filters
        </button>
        <button
            className="filters-button button button-border button-small"
            onClick={dispatchResetFilter}
        >
          Reset filters
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = ({ products, filter }) => ({
  products,
  filter,
  min: selectMin(products),
  max: selectMax(products)
});

const mapDispatchToProps = dispatch => ({
  dispatchSetBrandFilter: brand => dispatch(setBrandFilter(brand)),
  dispatchSetMinPriceFilter: min => dispatch(setMinPriceFilter(min)),
  dispatchSetMaxPriceFilter: max => dispatch(setMaxPriceFilter(max)),
  dispatchResetFilter: () => dispatch(resetFilter()),
  dispatchApplyFilter: filters => dispatch(applyFilter(filters))
});

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
