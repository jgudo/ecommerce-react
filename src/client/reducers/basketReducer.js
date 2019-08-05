import { ADD_TO_BASKET, REMOVE_FROM_BASKET } from '../constants/constants';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_TO_BASKET:
      return state.some(product => product.productId === action.payload.productId) 
        ? state
        : [...state, action.payload];
    case REMOVE_FROM_BASKET:
      return state.filter(product => product.productId !== action.payload);
    default:
      return state;
  }  
};
