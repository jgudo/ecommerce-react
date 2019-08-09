import React from 'react';
import { displayMoney } from '../../helpers/utils';

const ProductAppliedFilters = ({ products, filter }) => (
  <div className="product-applied-filters">
    {((filter.keyword || filter.brand || !!filter.minPrice || !!filter.maxPrice)) && (
        <>
          <span>Applied filters:</span> &nbsp;
          {filter.keyword && (<span>Keyword: <mark>{filter.keyword}</mark>&nbsp;</span>)}
          {filter.brand && (<span>Brand: <mark>{filter.brand}</mark>&nbsp;</span>)}
          {(!!filter.minPrice || !!filter.maxPrice) && (
            <span>
              Price Range: &nbsp;
              <mark>{displayMoney(filter.minPrice)}&nbsp;-&nbsp;{displayMoney(filter.maxPrice)}</mark>
              &nbsp;
            </span>
          )}
        </>
    )}
  </div>
);

export default ProductAppliedFilters;
