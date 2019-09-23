import { SET_CHECKOUT_SHIPPING_DETAILS, RESET_CHECKOUT_SHIPPING_DETAILS } from 'constants/constants';

export const setShippingDetails = details => ({
  type: SET_CHECKOUT_SHIPPING_DETAILS,
  payload: details
});

export const resetShippingDetails = () => ({
  type: RESET_CHECKOUT_SHIPPING_DETAILS
});
