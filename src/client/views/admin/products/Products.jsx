import React from 'react';
import { withRouter } from 'react-router-dom';
import ProductList from '../../../components/product/ProductList';
import ProductItem from './ProductItem';
import Filters from '../../../components/ui/Filters';
import SearchBar from '../../../components/ui/SearchBar';
import FiltersToggle from '../../../components/ui/FiltersToggle';
import ProductAppliedFilters from '../../../components/product/ProductAppliedFilters';

const Products = (props) => {
  const onClickAddProduct = () => {
    props.history.push('/dashboard/add');
  };

  return (
    <>
      <div className="product-admin-header">
        <h2 className="product-admin-header-title">
          Products &nbsp;
          {/* <span className="text-subtle">
            {products.length} {products.length > 1 ? 'items ' : 'item '}
          </span> */}
        </h2>
        <FiltersToggle /> &nbsp;
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
        &nbsp;&nbsp;
        <button 
            className="button button-small"
            onClick={onClickAddProduct}
        >
          Add New Product
        </button>
      </div>
      <ProductList>
        {({ state, action, isLoading }) => (
          <>
            <ProductAppliedFilters products={state.products} filter={state.filter}/>
            {state.products.length > 0 && (
              <div className="grid grid-product grid-count-6">
                <div className="grid-col" />
                <div className="grid-col">
                  <h5>Name</h5>
                </div>
                <div className="grid-col">
                  <h5>Brand</h5>
                </div>
                <div className="grid-col">
                  <h5>Price</h5>
                </div>
                <div className="grid-col">
                  <h5>Date Added</h5>
                </div>
                <div className="grid-col">
                  <h5>Qty</h5>
                </div>
              </div>
            )} 
            {state.products.map(product => (
              <ProductItem 
                  key={product.id}
                  product={product}
                  removeProduct={action.removeProduct}
              />
            ))}
          </>
        )}
      </ProductList>
    </>
  );
};

export default withRouter(Products);
