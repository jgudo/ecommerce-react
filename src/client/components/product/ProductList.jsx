import React from 'react';
import { connect } from 'react-redux';
import { addToBasket } from '../../actions/basketActions';

const ProductList = props => (
  props.children({
    products: props.products,
    addToBasket: props.dispatchAddToBasket
  })
);

const mapStateToProps = ({ products }) => ({
  products
});

const mapDispatchToProps = dispatch => ({
  dispatchAddToBasket: product => dispatch(addToBasket(product))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
