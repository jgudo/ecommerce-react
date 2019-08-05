import React from 'react';
import { connect } from 'react-redux';
import { editProduct } from '../../actions/productActions';
import ProductForm from './ProductForm';

const EditProduct = (props) => {
  const onSubmitForm = (updates) => {
    props.dispatchEditProduct(updates);
  };

  return (
    <ProductForm product={props.product} onSubmit={onSubmitForm}/>
  );
};

const mapStateToProps = ({ products }, props) => ({
  product: products.find(product => product.productId === props.match.params.id)
});

const mapDispatchToProps = dispatch => ({
  dispatchEditProduct: updates => dispatch(editProduct(updates))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
