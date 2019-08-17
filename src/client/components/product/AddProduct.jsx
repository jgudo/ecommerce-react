import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProductForm from './ProductForm';
import { addProduct } from '../../actions/productActions';

const AddProduct = () => {
  const isLoading = useSelector(state => state.app.loading);
  const dispatch = useDispatch();

  const onSubmit = (product) => {
    dispatch(addProduct(product));
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <ProductForm 
          isLoading={isLoading}
          onSubmit={onSubmit}
      />
    </div>
  );
};

export default withRouter(AddProduct);
