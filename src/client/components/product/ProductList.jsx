import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeProduct, getProducts } from '../../actions/productActions';
import { addToBasket, removeFromBasket } from '../../actions/basketActions';
import { selectFilter } from '../../selectors/selector';

const ProductList = props => {
  const { products, basket, filter, isLoading } = useSelector(state => ({
    products: selectFilter(state.products, state.filter),
    basket: state.basket,
    filter: state.filter,
    isLoading: state.app.isLoading
  }));
  const dispatch = useDispatch();

  const onAddToBasket = product => dispatch(addToBasket(product));
  const onRemoveFromBasket = id => dispatch(removeFromBasket(id));
  const onRemoveProduct = id => dispatch(removeProduct(id));

  useEffect(() => {
    products.length === 0 && dispatch(getProducts());
  }, []);

  return (
    props.children({
      products,
      basket,
      filter,
      addToBasket: onAddToBasket,
      removeFromBasket: onRemoveFromBasket,
      removeProduct:onRemoveProduct,
      isLoading
    })
  );
}

export default ProductList;
