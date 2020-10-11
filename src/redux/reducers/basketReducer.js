import { EBasketActionType } from 'constants/constants';
import { IProduct } from 'types/types';
import { BasketActionType } from '../actions/basketActions';

const initState: IProduct[] = [];

export default (state = initState, action: BasketActionType): IProduct[] => {
	switch (action.type) {
		case EBasketActionType.ADD_TO_BASKET:
			return state.some(product => product.id === action.payload.id)
				? state
				: [...state, action.payload];
		case EBasketActionType.REMOVE_FROM_BASKET:
			return state.filter(product => product.id !== action.payload);
		case EBasketActionType.CLEAR_BASKET:
			return initState;
		case EBasketActionType.ADD_QTY_ITEM:
			return state.map((product) => {
				if (product.id === action.payload) {
					return {
						...product,
						quantity: product.quantity + 1
					}
				}
				return product;
			});
		case EBasketActionType.MINUS_QTY_ITEM:
			return state.map((product) => {
				if (product.id === action.payload) {
					return {
						...product,
						quantity: product.quantity - 1
					}
				}
				return product;
			});
		default:
			return state;
	}
};
