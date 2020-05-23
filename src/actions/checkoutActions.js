import { 
	SET_CHECKOUT_SHIPPING_DETAILS,
	SET_CHECKOUT_PAYMENT_DETAILS,
	RESET_CHECKOUT
} from 'constants/constants';

export const setShippingDetails = details => ({
  type: SET_CHECKOUT_SHIPPING_DETAILS,
  payload: details
});

export const setPaymentDetails = details => ({
  type: SET_CHECKOUT_PAYMENT_DETAILS,
  payload: details
});

export const resetCheckout = () => ({
  type: RESET_CHECKOUT
});
