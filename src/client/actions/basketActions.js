import { ADD_TO_BASKET, REMOVE_FROM_BASKET } from '../constants/constants';

export const addToBasket = product => ({
  type: ADD_TO_BASKET,
  payload: product
});

export const removeFromBasket = id => ({
  type: REMOVE_FROM_BASKET,
  payload: id
});
