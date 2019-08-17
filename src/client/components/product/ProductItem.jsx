import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToBasket, removeFromBasket } from '../../actions/basketActions';
import { displayActionMessage } from '../../helpers/utils';

const ProductItem = (props) => {
  const basket = useSelector(state => state.basket);
  const dispatch = useDispatch();
  const { product } = props;

  const foundOnBasket = () => {
    return !!basket.find(item => item.id === product.id); 
  };

  const onAddToBasket = () => {
    if (foundOnBasket()) {
      dispatch(removeFromBasket(product.id));
      displayActionMessage('Item removed from basket');
    } else {
      dispatch(addToBasket(product));
      displayActionMessage('Item added to basket');
    }
  };

  return props.children({
    state: {
      product,
      basket
    },
    action: {
      onAddToBasket
    },
    foundOnBasket
  });
};

export default ProductItem;
