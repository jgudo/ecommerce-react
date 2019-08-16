import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ProductForm from './ProductForm';
import { addProduct } from '../../actions/productActions';

const AddProduct = ({ dispatchAddProduct, isLoading }) => {
  const onSubmit = (product) => {
    dispatchAddProduct(product);
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

const mapStateToProps = ({ app }) => ({
  isLoading: app.loading
});

const mapDispatchToProps = dispatch => ({
  dispatchAddProduct: product => dispatch(addProduct(product))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddProduct));
