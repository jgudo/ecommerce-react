import React from 'react';
import SearchBar from '../../components/ui/SearchBar';
import FiltersToggle from '../../components/ui/FiltersToggle';

const Header = () => (
  <div className="product-list-header">
    <h3 className="product-list-title">
      Eyewear 
    </h3>
    {window.screen.width > 480 && (
      <>
        <FiltersToggle />
        &nbsp;
        <div className="product-list-search">
          <SearchBar>
            {({ onSearchChange, onKeyUp, isLoading, onSubmitSearch }) => (
              <div className="searchbar">
                <input
                    className="searchbar-input" 
                    onChange={onSearchChange}
                    onKeyUp={onKeyUp}
                    placeholder="Search for product"
                    readOnly={isLoading}
                    type="text" 
                />
                <button 
                    className="button button-small searchbar-button"
                    disabled={isLoading}
                    onClick={onSubmitSearch}
                >
                  Search
                </button>
              </div>
            )}
          </SearchBar>
        </div>
      </>
    )}
  </div>
);

export default Header;
