import React from 'react';
import { connect } from 'react-redux';

import ProductForm from './ProductForm';
import { addProduct } from '../../actions/productActions';

const AddProduct = ({ dispatchAddProduct }) => {
  const onSubmit = (product) => {
    dispatchAddProduct(product);
  };

  return (
    <div>
      <ProductForm onSubmit={onSubmit}/>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  dispatchAddProduct: product => dispatch(addProduct(product))
});

export default connect(undefined, mapDispatchToProps)(AddProduct);
