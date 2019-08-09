import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProductForm from './ProductForm';
import { addProduct } from '../../actions/productActions';

const AddProduct = ({ dispatchAddProduct }) => {
  const onSubmit = (product) => {
    dispatchAddProduct(product);
  };

  return (
    <div>
      <h2>Add New Product</h2>
      <ProductForm onSubmit={onSubmit}/>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  dispatchAddProduct: product => dispatch(addProduct(product))
});

export default withRouter(connect(undefined, mapDispatchToProps)(AddProduct));
