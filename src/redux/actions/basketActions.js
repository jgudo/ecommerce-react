import {
  ADD_QTY_ITEM, ADD_TO_BASKET,
  CLEAR_BASKET,
  MINUS_QTY_ITEM, REMOVE_FROM_BASKET,
  SET_BASKET_ITEMS
} from 'constants/constants';

export const setBasketItems = (items = []) => ({
  type: SET_BASKET_ITEMS,
  payload: items
});

export const addToBasket = (product) => ({
  type: ADD_TO_BASKET,
  payload: product
});

export const removeFromBasket = (id) => ({
  type: REMOVE_FROM_BASKET,
  payload: id
});

export const clearBasket = () => ({
  type: CLEAR_BASKET
});

export const addQtyItem = (id) => ({
  type: ADD_QTY_ITEM,
  payload: id
});

export const minusQtyItem = (id) => ({
  type: MINUS_QTY_ITEM,
  payload: id
});
