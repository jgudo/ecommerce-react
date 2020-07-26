import {
	ADD_PRODUCT_SUCCESS,
	REMOVE_PRODUCT_SUCCESS,
	EDIT_PRODUCT_SUCCESS,
	GET_PRODUCTS_SUCCESS
} from 'constants/constants';

export default (state = {
	lastRefKey: null,
	total: 0,
	items: []
}, action) => {
	switch (action.type) {
		case GET_PRODUCTS_SUCCESS:
			return {
				...state,
				lastRefKey: action.payload.lastKey,
				total: action.payload.total,
				items: [...state.items, ...action.payload.products]
			};
		case ADD_PRODUCT_SUCCESS:
			return {
				...state,
				items: [...state.items, action.payload]
			};
		case REMOVE_PRODUCT_SUCCESS:
			return {
				...state,
				items: state.items.filter(product => product.id !== action.payload)
			}
		case EDIT_PRODUCT_SUCCESS:
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
