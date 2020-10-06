import { ECheckOutActionType } from 'constants/constants';
import { CheckOutActionType, IPaymentInfo, IShippingInfo } from 'types/typings';

export const setShippingDetails = (details: IShippingInfo): CheckOutActionType => ({
	type: ECheckOutActionType.SET_CHECKOUT_SHIPPING_DETAILS,
	payload: details
});

export const setPaymentDetails = (details: IPaymentInfo): CheckOutActionType => ({
	type: ECheckOutActionType.SET_CHECKOUT_PAYMENT_DETAILS,
	payload: details
});

export const resetCheckout = () => ({
	type: ECheckOutActionType.RESET_CHECKOUT
});
