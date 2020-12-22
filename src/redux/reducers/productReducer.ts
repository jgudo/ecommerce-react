import { EProductActionType } from 'constants/constants';
import { ProductState } from 'types/types';
import { ProductActionType } from '../actions/productActions';

interface IState extends ProductState { searchedProducts: ProductState; }

const initState: ProductState = {
	lastRefKey: null,
	total: 0,
	items: []
};

const initReducerState: IState = {
	...initState,
	searchedProducts: initState
};

export default (state = initReducerState, action: ProductActionType): IState => {
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
		case EProductActionType.SEARCH_PRODUCT_SUCCESS:
			return {
				...state,
				searchedProducts: {
					lastRefKey: action.payload.lastRefKey,
					total: action.payload.total,
					items: [...state.searchedProducts.items, ...action.payload.items]
				}
			};
		case EProductActionType.CLEAR_SEARCH_STATE:
			return {
				...state,
				searchedProducts: initState
			};
		case EProductActionType.REMOVE_PRODUCT_SUCCESS:
			return {
				...state,
				items: state.items.filter(product => product.id !== action.payload)
			};
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
