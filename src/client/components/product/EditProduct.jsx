import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { editProduct } from '../../actions/productActions';
import ProductForm from './ProductForm';

const EditProduct = (props) => {
  const onSubmitForm = (updates) => {
    props.dispatchEditProduct(props.product.id, updates);
  };

  return (
    <>
      {!props.product && <Redirect to="/dashboard/products" />}
      <h2>Edit Product</h2>
      <ProductForm 
          isLoading={props.isLoading}
          onSubmit={onSubmitForm}
          product={props.product} 
      />
    </>
  );
};

const mapStateToProps = ({ products, app }, props) => ({
  product: products.find(product => product.id === props.match.params.id),
  isLoading: app.loading
});

const mapDispatchToProps = dispatch => ({
  dispatchEditProduct: (id, updates) => dispatch(editProduct(id, updates))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProduct));
