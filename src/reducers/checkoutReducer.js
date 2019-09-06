import { SET_CHECKOUT_SHIPPING_DETAILS, RESET_CHECKOUT_SHIPPING_DETAILS } from '../constants/constants';

export default (state = {
  shipping: {}
}, action) => {
  switch (action.type) {
    case SET_CHECKOUT_SHIPPING_DETAILS:
      return {
        ...state,
        shipping: action.payload
      };
    case RESET_CHECKOUT_SHIPPING_DETAILS:
      return {
        shipping: {}
      };
    default:
      return state;
  }
};
