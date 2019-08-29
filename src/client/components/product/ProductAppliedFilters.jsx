import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { applyFilter, resetFilter } from '../../actions/filterActions';

const ProductAppliedFilters = ({ filter }) => {
  const dispatch = useDispatch();
  const fields = ['brand', 'minPrice', 'maxPrice', 'sortBy', 'keyword'];

  const onResetFilter = () => {
    dispatch(resetFilter());
  };

  const onRemoveKeywordFilter = () => {
    dispatch(applyFilter({ keyword: '' }));
  };

  const onRemovePriceRangeFilter = () => {
    dispatch(applyFilter({ minPrice: 0, maxPrice: 0 }));
  };

  const onRemoveBrandFilter = () => {
    dispatch(applyFilter({ brand: '' }));
  };

  const onRemoveSortFilter = () => {
    dispatch(applyFilter({ sortBy: '' }));
  };

  return (
    <div className="product-applied-filters">
      {fields.some(key => !!filter[key]) && (
          <>
            {filter.keyword && (
              <div className="text-center">
                <span className="d-block">Keyword</span>
                <div className="pill padding-right-l">
                  <h5 className="margin-0">{filter.keyword}</h5>
                  <div className="pill-remove" onClick={onRemoveKeywordFilter}>
                    <h5 className="margin-0">x</h5>
                  </div>
                </div>
              </div>
            )}
            {filter.brand && (
              <div className="text-center">
                <span className="d-block">Brand</span>
                <div className="pill padding-right-l">
                  <h5 className="margin-0">{filter.brand}</h5>
                  <div className="pill-remove"onClick={onRemoveBrandFilter}>
                    <h5 className="margin-0">x</h5>
                  </div>
                </div>
              </div>
            )}
            {(!!filter.minPrice || !!filter.maxPrice) && (
              <div className="text-center">
                <span className="d-block">Price Range</span>
                <div className="pill padding-right-l">
                  <h5 className="margin-0">${filter.minPrice} - ${filter.maxPrice}</h5>
                  <div className="pill-remove" onClick={onRemovePriceRangeFilter}>
                    <h5 className="margin-0">x</h5>
                  </div>
                </div>
              </div>
            )}
            {filter.sortBy && (
              <div className="text-center">
                <span className="d-block">Sort By</span>
                <div className="pill padding-right-l">
                  <h5 className="margin-0">
                    {filter.sortBy === 'price-desc' 
                      ? 'Price High - Low' 
                      : filter.sortBy === 'price-asc' 
                      ? 'Price Low - High'
                      : filter.sortBy === 'name-desc'
                      ? 'Name Z - A'
                      : 'Name A - Z'
                    }
                  </h5>
                  <div className="pill-remove" onClick={onRemoveSortFilter}>
                    <h5 className="margin-0">x</h5>
                  </div>
                </div>
              </div>
            )}
          </>
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
