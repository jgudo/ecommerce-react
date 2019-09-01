import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeProduct, getProducts } from '../../actions/productActions';
import { addToBasket, removeFromBasket } from '../../actions/basketActions';
import { selectFilter } from '../../selectors/selector';
import { displayActionMessage } from '../../helpers/utils';
import CircularProgress from '../ui/CircularProgress';


const ProductList = props => {
  const [columnCount, setColumnCount] = useState(6);
  const { storeProps } = useSelector(state => ({
    storeProps: {
      filteredProducts: selectFilter(state.products, state.filter),
      products: state.products,
      basket: state.basket,
      filter: state.filter,
      isLoading: state.app.loading,
      requestStatus: state.app.requestStatus
    }
  }));

  
  useEffect(() => {
    storeProps.products.length === 0 && onGetProducts();
  }, []);
  
  useEffect(() => {
    onProductsLengthChanged();
  }, [storeProps.filteredProducts]);

  const dispatch = useDispatch();

  const foundOnBasket = (id) => !!storeProps.basket.find(item => item.id === id); 
  const onAddToBasket = (id, product) => {
    if (foundOnBasket(id)) {
      dispatch(removeFromBasket(id));
      displayActionMessage('Item removed from basket');
    } else {
      dispatch(addToBasket(product));
      displayActionMessage('Item added to basket', 'success');
    }
  };
  const onRemoveFromBasket = id => dispatch(removeFromBasket(id));
  const onRemoveProduct = id => dispatch(removeProduct(id));
  const onGetProducts = () => dispatch(getProducts());
  const onProductsLengthChanged = () => {
    const width = window.screen.width - 120; // minus 120px padding

    setColumnCount(Math.floor(width / 160));
    columnCount >= storeProps.filteredProducts.length && setColumnCount(storeProps.filteredProducts.length);
  };

  // window.addEventListener('resize', onProductsLengthChanged);

  return storeProps.filteredProducts.length === 0 && storeProps.isLoading ? (
    <div className="loader">
      <CircularProgress />
      <br/>
      <h5 className="text-subtle">Fetching products, please wait</h5>
    </div>
  ) : storeProps.filteredProducts.length === 0 && !storeProps.isLoading && !storeProps.requestStatus ? (
    <div className="loader">
      <h4>There are no items found</h4>
      <span>Try using correct filters and keyword</span>
    </div>
  ) : storeProps.requestStatus ? (
    <div className="loader">
      <h4>{storeProps.requestStatus}</h4>
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
        products: storeProps.filteredProducts,
        basket: storeProps.basket,
        filter: storeProps.filter,
        columnCount
      },
      action: {
        addToBasket: onAddToBasket,
        removeFromBasket: onRemoveFromBasket,
        removeProduct:onRemoveProduct
      },
      foundOnBasket: foundOnBasket,
      isLoading: storeProps.isLoading
    })
  );
}

export default ProductList;

