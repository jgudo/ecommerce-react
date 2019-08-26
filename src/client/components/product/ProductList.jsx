import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeProduct, getProducts } from '../../actions/productActions';
import { addToBasket, removeFromBasket } from '../../actions/basketActions';
import { selectFilter } from '../../selectors/selector';
import { displayActionMessage } from '../../helpers/utils';
import CircularProgress from '../ui/CircularProgress';
import ProductAppliedFilters from './ProductAppliedFilters';

const ProductList = props => {
  const { 
    filteredProducts, 
    products, 
    basket, 
    filter, 
    isLoading, 
    requestStatus 
  } = useSelector(state => ({
    filteredProducts: selectFilter(state.products, state.filter),
    products: state.products,
    basket: state.basket,
    filter: state.filter,
    isLoading: state.app.loading,
    requestStatus: state.app.requestStatus
  }));
  const dispatch = useDispatch();

  const foundOnBasket = (id) => !!basket.find(item => item.id === id); 
  const onAddToBasket = (id, product) => {
    if (foundOnBasket(id)) {
      dispatch(removeFromBasket(id));
      displayActionMessage('Item removed from basket');
    } else {
      dispatch(addToBasket(product));
      displayActionMessage('Item added to basket');
    }
  };
  const onRemoveFromBasket = id => dispatch(removeFromBasket(id));
  const onRemoveProduct = id => dispatch(removeProduct(id));
  const onGetProducts = () => dispatch(getProducts());

  useEffect(() => {
    products.length === 0 && onGetProducts();
  }, []);

  return filteredProducts.length === 0 && isLoading ? (
    <div className="loader">
      <CircularProgress />
      <br/>
      <h5 className="text-subtle">Fetching products, please wait</h5>
    </div>
  ) : filteredProducts.length === 0 && !isLoading && !requestStatus ? (
    <div className="loader">
      <h4>There are no items found</h4>
      <span>Try using correct filters and keyword</span>
      <br/> 
      <ProductAppliedFilters filter={filter} />
    </div>
  ) : requestStatus ? (
    <div className="loader">
      <h4>{requestStatus}</h4>
      <br/>
      <button 
          className="button button-small"
          onClick={onGetProducts}
      >
        Try again
      </button>
    </div>
  ) : (
    props.children({
      state: {
        products: filteredProducts,
        basket,
        filter
      },
      action: {
        addToBasket: onAddToBasket,
        removeFromBasket: onRemoveFromBasket,
        removeProduct:onRemoveProduct
      },
      foundOnBasket: foundOnBasket,
      isLoading
    })
  );
}

export default ProductList;
