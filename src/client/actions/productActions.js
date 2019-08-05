import { ADD_PRODUCT, REMOVE_PRODUCT, EDIT_PRODUCT } from '../constants/constants';

export const addProduct = product => ({
  type: ADD_PRODUCT,
  payload: product
});

export const removeProduct = id => ({
  type: REMOVE_PRODUCT,
  payload: id
});

export const editProduct = updates => ({
  type: EDIT_PRODUCT,
  payload: updates
});
