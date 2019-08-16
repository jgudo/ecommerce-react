import { ADD_PRODUCT, REMOVE_PRODUCT, EDIT_PRODUCT, GET_PRODUCTS } from '../constants/constants';

export const getProducts = () => ({
  type: GET_PRODUCTS
});

export const addProduct = product => ({
  type: ADD_PRODUCT,
  payload: product
});

export const removeProduct = id => ({
  type: REMOVE_PRODUCT,
  payload: id
});

export const editProduct = (id, updates) => ({
  type: EDIT_PRODUCT,
  payload: {
    id,
    updates
  }
});
