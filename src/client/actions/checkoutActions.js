import { SET_CHECKOUT_SHIPPING_DETAILS } from '../constants/constants';

const setShippingDetails = details => ({
  type: SET_CHECKOUT_SHIPPING_DETAILS,
  payload: details
});

export default setShippingDetails;

