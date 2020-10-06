import { EProductActionType } from 'constants/constants';
import { ProductActionType, ProductState } from 'types/typings';

const initState: ProductState = {
	lastRefKey: null,
	total: 0,
	items: []
};

export default (state = initState, action: ProductActionType): ProductState => {
	switch (action.type) {
		case EProductActionType.GET_PRODUCTS_SUCCESS:
			return {
				...state,
				lastRefKey: action.payload.lastRefKey,
				total: action.payload.total,
				items: [...state.items, ...action.payload.items]
			};
		case EProductActionType.ADD_PRODUCT_SUCCESS:
			return {
				...state,
				items: [...state.items, action.payload]
			};
		case EProductActionType.REMOVE_PRODUCT_SUCCESS:
			return {
				...state,
				items: state.items.filter(product => product.id !== action.payload)
			}
		case EProductActionType.EDIT_PRODUCT_SUCCESS:
			return {
				...state,
				items: state.items.map((product) => {
					if (product.id === action.payload.id) {
						return {
							...product,
							...action.payload.updates
						};
					}
					return product;
				})
			};
		default:
			return state;
	}
};
