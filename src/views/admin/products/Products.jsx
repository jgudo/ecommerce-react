import React from 'react';
import { withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectFilter } from '../../../selectors/selector';
import Header from '../../home/Header';
import ProductList from '../../../components/product/ProductList';
import ProductItem from './ProductItem';
import ProductAppliedFilters from '../../../components/product/ProductAppliedFilters';

const Products = (props) => {
  const { products, filter, isLoading, filteredProducts, requestStatus } = useSelector(state => ({
    products: state.products,
    filter: state.filter,
    basket: state.basket,
    isLoading: state.app.loading,
    filteredProducts: selectFilter(state.products, state.filter),
    requestStatus: state.app.requestStatus
  }));
  const dispatch = useDispatch();

  const onClickAddProduct = () => {
    props.history.push('/dashboard/add');
  };

  return (
    <>
      <div className="product-admin-header">
        <h2 className="product-admin-header-title">Products</h2>
        <Header 
            dispatch={dispatch}
            products={products}
            filter={filter}
            isLoading={isLoading}
        />
        &nbsp;&nbsp;
        <button 
            className="button button-small"
            onClick={onClickAddProduct}
        >
          Add New Product
        </button>
      </div>
      <ProductList
          dispatch={dispatch}
          filteredProducts={filteredProducts}
          isLoading={isLoading}
          products={products}
          requestStatus={requestStatus}
      >
        <ProductAppliedFilters filter={filter}/>
          {filteredProducts.length > 0 && (
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
          {filteredProducts.length === 0 ? new Array(10).fill({}).map((product, index) => (
            <ProductItem 
                key={`product-skeleton ${index}`}
                product={product}
                removeProduct={action.removeProduct}
            />
          )): filteredProducts.map(product => (
            <ProductItem 
                key={product.id}
                product={product}
                dispatch={dispatch}
            />
          ))}
      </ProductList>
    </>
  );
};

export default withRouter(Products);
