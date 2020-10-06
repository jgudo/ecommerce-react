import { ECheckOutActionType, EPaymentMode } from 'constants/constants';
import { IPaymentInfo, IShippingInfo } from 'types/typings';

type TAction =
	| { type: ECheckOutActionType.SET_CHECKOUT_SHIPPING_DETAILS, payload: IShippingInfo }
	| { type: ECheckOutActionType.SET_CHECKOUT_PAYMENT_DETAILS, payload: IPaymentInfo }
	| { type: ECheckOutActionType.RESET_CHECKOUT }

type State = {
	shipping: IShippingInfo | {};
	payment: IPaymentInfo;
};

const defaultState: State = {
	shipping: {},
	payment: {
		type: EPaymentMode.PAYPAL,
		data: {}
	}
};

export default (state = defaultState, action: TAction): State => {
	switch (action.type) {
		case ECheckOutActionType.SET_CHECKOUT_SHIPPING_DETAILS:
			return {
				...state,
				shipping: action.payload
			};
		case ECheckOutActionType.SET_CHECKOUT_PAYMENT_DETAILS:
			return {
				...state,
				payment: action.payload
			};
		case ECheckOutActionType.RESET_CHECKOUT:
			return defaultState;
		default:
			return state;
	}
};
