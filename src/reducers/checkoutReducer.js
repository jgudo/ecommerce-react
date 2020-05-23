import { 
  SET_CHECKOUT_SHIPPING_DETAILS,
  SET_CHECKOUT_PAYMENT_DETAILS, 
  RESET_CHECKOUT
} from 'constants/constants';

const defaultState = {
  shipping: {},
  payment: {
    type: 'paypal',
    data: {}
  }
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_CHECKOUT_SHIPPING_DETAILS:
      return {
        ...state,
        shipping: action.payload
      };
    case SET_CHECKOUT_PAYMENT_DETAILS:
      return {
        ...state,
        payment: action.payload
      };
    case RESET_CHECKOUT:
      return defaultState;
    default:
      return state;
  }
};
