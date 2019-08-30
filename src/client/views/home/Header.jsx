import React from 'react';
import Search from '../../components/ui/Search';
import FiltersToggle from '../../components/ui/FiltersToggle';

import { resetFilter } from '../../actions/filterActions';  

const Header = (props) => {
  const { dispatch, products, filter, isLoading } = props;
  const isFiltered = ['keyword', 'brand', 'minPrice', 'maxPrice'].some(key => !!filter[key]);

  return (
    <>
      {window.screen.width > 480 && (
        <>
          {isFiltered && (
            <button
                className="button button-muted button-small"
                onClick={() => dispatch(resetFilter())}
            >
              Clear Filter
            </button>
          )}
          &nbsp;
          <FiltersToggle 
              dispatch={dispatch}
              products={products}
              productsLength={products.length}
              filter={filter}
              isLoading={isLoading}
          />
          &nbsp;
          <Search 
              dispatch={dispatch}
              productsLength={products.length}
              filter={filter}
              isLoading={isLoading}
          />
        </>
      )}
    </>
  );
};

export default Header;
