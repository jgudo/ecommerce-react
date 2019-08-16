import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { removeProduct, getProducts } from '../../actions/productActions';
import { addToBasket, removeFromBasket } from '../../actions/basketActions';
import { selectFilter } from '../../selectors/selector';

const ProductList = props => {
  useEffect(() => {
    props.dispatchGetProducts();
  }, []);

  return (
    props.children({
      products: props.products,
      basket: props.basket,
      addToBasket: props.dispatchAddToBasket,
      filter: props.filter,
      removeFromBasket: props.dispatchRemoveFromBasket,
      removeProduct: props.dispatchRemoveProduct,
      isLoading: props.isLoading
    })
  );
}

const mapStateToProps = ({ products, basket, filter, app }) => ({
  products: selectFilter(products, filter),
  basket,
  filter,
  isLoading: app.loading
});

const mapDispatchToProps = dispatch => ({
  dispatchAddToBasket: product => dispatch(addToBasket(product)),
  dispatchRemoveFromBasket: id => dispatch(removeFromBasket(id)),
  dispatchRemoveProduct: id => dispatch(removeProduct(id)),
  dispatchGetProducts: () => dispatch(getProducts())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
