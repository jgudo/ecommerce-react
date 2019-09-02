import React, { useState, useEffect } from 'react';
import { removeProduct, getProducts } from '../../actions/productActions';
import { addToBasket, removeFromBasket } from '../../actions/basketActions';
import { displayActionMessage } from '../../helpers/utils';


const ProductList = props => {
  const [columnCount, setColumnCount] = useState(6);
  const { products, isLoading, requestStatus, filteredProducts, foundOnBasket, dispatch } = props
  
  useEffect(() => {
    products.length === 0 && onGetProducts();
  }, []);
  
  useEffect(() => {
    onProductsLengthChanged();
  }, [filteredProducts]);

  const onAddToBasket = (id, product) => {
    if (foundOnBasket(id)) {
      dispatch(removeFromBasket(id));
      displayActionMessage('Item removed from basket', 'info');
    } else {
      dispatch(addToBasket(product));
      displayActionMessage('Item added to basket', 'success');
    }
  };
  const onRemoveProduct = id => dispatch(removeProduct(id));
  const onGetProducts = () => dispatch(getProducts());
  const onProductsLengthChanged = () => {
    const width = window.screen.width - 120; // minus 120px padding

    setColumnCount(Math.floor(width / 160));
    if ((columnCount >= filteredProducts.length) && filteredProducts.length !== 0) {
      setColumnCount(filteredProducts.length);
    }
  };

  return filteredProducts.length === 0 && !isLoading && !requestStatus ? (
    <div className="loader">
      <h4>There are no items found</h4>
      <span>Try using correct filters and keyword</span>
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
      columnCount,
      action: {
        addToBasket: onAddToBasket,
        removeProduct: onRemoveProduct
      },
    })
  );
}

export default ProductList;

