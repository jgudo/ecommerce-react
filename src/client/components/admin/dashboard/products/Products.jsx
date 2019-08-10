import React from 'react';
import { withRouter } from 'react-router-dom';
import ProductList from '../../../product/ProductList';
import ProductAdmin from './ProductAdmin';
import Filters from '../../../ui/Filters';
import SearchBar from '../../../ui/SearchBar';
import ProductAppliedFilters from '../../../product/ProductAppliedFilters';

const Products = (props) => {
  const onClickAddProduct = () => {
    props.history.push('/dashboard/add');
  };

  return (
    <>
      <ProductList>
        {({ products, filter, removeProduct }) => (
          <>
            <div className="product-admin-header">
              <h2 className="product-admin-header-title">
                Products &nbsp;
                <span className="text-subtle">
                  {products.length} {products.length > 1 ? 'items ' : 'item '}
                </span>
              </h2>
              <div className="product-admin-filter">
                <button className="button button-border button-border-gray button-small">
                  Filters
                </button>
                <div className="product-admin-filter-wrapper">
                  <Filters />
                </div>
              </div>
              <SearchBar />
              &nbsp;&nbsp;
              <button 
                  className="button button-small"
                  onClick={onClickAddProduct}
              >
                Add New Product
              </button>
            </div>
            <ProductAppliedFilters products={products} filter={filter}/>
            {products.length > 0 ? (
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
            ) : (
              <div className="product-list-empty">
                <h4>There are no items found</h4>
                <span>Try using correct filters and keyword</span>
              </div>
            )}
            {products.map(product => (
              <ProductAdmin 
                  key={product.id}
                  product={product}
                  removeProduct={removeProduct}
              />
            ))}
          </>
        )}
      </ProductList>
    </>
  );
};

export default withRouter(Products);
