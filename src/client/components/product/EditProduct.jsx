import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { editProduct } from '../../actions/productActions';
import ProductForm from './ProductForm';

const EditProduct = (props) => {
  const { product, isLoading } = useSelector(state => ({
    product: state.products.find(product => product.id === props.match.params.id),
    isLoading: state.app.loading
  }));
  const dispatch = useDispatch();

  const onSubmitForm = (updates) => {
    dispatch(editProduct(product.id, updates));
  };

  return (
    <>
      {!product && <Redirect to="/dashboard/products" />}
      <h2>Edit Product</h2>
      <ProductForm 
          isLoading={isLoading}
          onSubmit={onSubmitForm}
          product={product} 
      />
    </>
  );
};

export default withRouter(EditProduct);
