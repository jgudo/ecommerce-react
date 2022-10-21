import {
  ADD_QTY_ITEM, ADD_TO_BASKET,
  CLEAR_BASKET,
  MINUS_QTY_ITEM, REMOVE_FROM_BASKET,
  SET_BASKET_ITEMS
} from '@/constants/constants';

export default (state = [], action) => {
  switch (action.type) {
    case SET_BASKET_ITEMS:
      return action.payload;
    case ADD_TO_BASKET:
      return state.some((product) => product.id === action.payload.id)
        ? state
        : [action.payload, ...state];
    case REMOVE_FROM_BASKET:
      return state.filter((product) => product.id !== action.payload);
    case CLEAR_BASKET:
      return [];
    case ADD_QTY_ITEM:
      return state.map((product) => {
        if (product.id === action.payload) {
          return {
            ...product,
            quantity: product.quantity + 1
          };
        }
        return product;
      });
    case MINUS_QTY_ITEM:
      return state.map((product) => {
        if (product.id === action.payload) {
          return {
            ...product,
            quantity: product.quantity - 1
          };
        }
        return product;
      });
    default:
      return state;
  }
};
