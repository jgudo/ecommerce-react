import { ECheckOutActionType, PAYPAL } from 'constants/constants';
import { IPaymentInfo, IShippingInfo } from 'types/types';
import { CheckOutActionType } from '../actions/checkoutActions';

type State = {
	shipping: IShippingInfo | {};
	payment: IPaymentInfo;
};

const defaultState: State = {
	shipping: {},
	payment: {
		type: PAYPAL,
		data: {}
	}
};

export default (state = defaultState, action: CheckOutActionType): State => {
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
