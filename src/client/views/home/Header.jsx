import React from 'react';
import Search from '../../components/ui/Search';
import FiltersToggle from '../../components/ui/FiltersToggle';
import ProductAppliedFilters from '../../components/product/ProductAppliedFilters';

import { resetFilter } from '../../actions/filterActions';  

const Header = (props) => {
  const { dispatch, products, filter, isLoading } = props;

  const onClearFilter = () => {
    dispatch(resetFilter());
  };

  const isFiltered = ['keyword', 'brand', 'minPrice', 'maxPrice'].some(key => !!filter[key]);

  return (
    <>
      <div className="product-list-header">
        {window.screen.width > 480 && (
          <>
            {isFiltered && (
              <button
                  className="button button-muted button-small"
                  onClick={onClearFilter}
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
      </div>
      <ProductAppliedFilters filter={filter}/>
    </>
  );
};

export default Header;

{/* <SearchBar>
            {({ onSearchChange, onKeyUp, isLoading, isFilterApplied, onClearFilter}) => (
              <>
                {isFilterApplied() && (
                  <button
                      className="button button-muted button-small"
                      onClick={onClearFilter}
                  >
                    Clear Filter
                  </button>
                )}
                &nbsp;
                <div className="searchbar">
                  <input
                      className="searchbar-input" 
                      onChange={onSearchChange}
                      onKeyUp={onKeyUp}
                      placeholder="Search for product"
                      readOnly={isLoading}
                      type="text" 
                  />
                  <div className="searchbar-icon" />
                  {/* <button 
                      className="button button-small searchbar-button"
                      disabled={isLoading}
                      onClick={onSubmitSearch}
                  >
                    Search
                  </button> */}
          //       </div>
          //     </>
          //   )}
          // </SearchBar> */}