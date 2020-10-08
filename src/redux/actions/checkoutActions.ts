import { ECheckOutActionType } from 'constants/constants';
import { IPaymentInfo, IShippingInfo } from 'types/typings';

export const setShippingDetails = (details: IShippingInfo) => (<const>{
	type: ECheckOutActionType.SET_CHECKOUT_SHIPPING_DETAILS,
	payload: details
});

export const setPaymentDetails = (details: IPaymentInfo) => (<const>{
	type: ECheckOutActionType.SET_CHECKOUT_PAYMENT_DETAILS,
	payload: details
});

export const resetCheckout = () => (<const>{
	type: ECheckOutActionType.RESET_CHECKOUT
});

export type CheckOutActionType =
	| ReturnType<typeof setShippingDetails>
	| ReturnType<typeof setPaymentDetails>
	| ReturnType<typeof resetCheckout>;