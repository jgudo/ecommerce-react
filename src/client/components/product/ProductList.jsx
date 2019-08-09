import React from 'react';
import { connect } from 'react-redux';
import { removeProduct } from '../../actions/productActions';
import { addToBasket, removeFromBasket } from '../../actions/basketActions';
import { selectFilter } from '../../selectors/selector';

const ProductList = props => (
  props.children({
    products: props.products,
    basket: props.basket,
    addToBasket: props.dispatchAddToBasket,
    filter: props.filter,
    removeFromBasket: props.dispatchRemoveFromBasket,
    removeProduct: props.dispatchRemoveProduct
  })
);

const mapStateToProps = ({ products, basket, filter }) => ({
  products: selectFilter(products, filter),
  basket,
  filter
});

const mapDispatchToProps = dispatch => ({
  dispatchAddToBasket: product => dispatch(addToBasket(product)),
  dispatchRemoveFromBasket: id => dispatch(removeFromBasket(id)),
  dispatchRemoveProduct: id => dispatch(removeProduct(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
