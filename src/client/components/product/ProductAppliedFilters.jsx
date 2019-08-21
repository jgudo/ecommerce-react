import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { resetFilter } from '../../actions/filterActions';
import { displayMoney } from '../../helpers/utils';

const ProductAppliedFilters = ({ filter }) => {
  const dispatch = useDispatch();
  const onResetFilter = () => {
    dispatch(resetFilter());
  };

  return (
    <div className="product-applied-filters">
      {((filter.keyword || filter.brand || !!filter.minPrice || !!filter.maxPrice)) && (
          <div className="d-flex">
            <span>Applied filters: [</span> &nbsp;
            {filter.keyword && (<span>Keyword: <mark>{filter.keyword}</mark>&nbsp;</span>)}
            {filter.brand && (<span>Brand: <mark>{filter.brand}</mark>&nbsp;</span>)}
            {(!!filter.minPrice || !!filter.maxPrice) && (
              <span>
                Price Range: &nbsp;
                <mark>{displayMoney(filter.minPrice)}&nbsp;-&nbsp;{displayMoney(filter.maxPrice)}</mark>
                &nbsp;
              </span>
            )}
            <span>]</span>
            <button 
                style={{
                  fontSize: '12px',
                  padding: '5px',
                  background: '#e1e1e1',
                  margin: '0 10px',
                  border: 'none'
                }}
                onClick={onResetFilter}
            >
              Reset
            </button>
          </div>
      )}
    </div>
  );
};

ProductAppliedFilters.propType = {
  filter: PropTypes.shape({
    brand: PropTypes.string,
    keyword: PropTypes.string,
    minPrice: PropTypes.number,
    maxPrice: PropTypes.number
  })
};

export default ProductAppliedFilters;
