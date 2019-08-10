import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { editProduct } from '../../actions/productActions';
import { displayActionMessage } from '../../helpers/utils';
import ProductForm from './ProductForm';

const EditProduct = (props) => {
  const onSubmitForm = (updates) => {
    props.dispatchEditProduct(updates);
    props.history.push('/dashboard/products');
    displayActionMessage('Item successfully edited');
  };

  return (
    <>
      <h2>Edit Product</h2>
      <ProductForm product={props.product} onSubmit={onSubmitForm}/>
    </>
  );
};

const mapStateToProps = ({ products }, props) => ({
  product: products.find(product => product.id === props.match.params.id)
});

const mapDispatchToProps = dispatch => ({
  dispatchEditProduct: updates => dispatch(editProduct(updates))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditProduct));
