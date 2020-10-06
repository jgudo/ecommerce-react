import { EFilterActionType } from 'constants/constants';
import { IFilter } from 'types/typings';

type TAction =
	| { type: EFilterActionType.SET_TEXT_FILTER, payload: string }
	| { type: EFilterActionType.SET_BRAND_FILTER, payload: string }
	| { type: EFilterActionType.SET_MAX_PRICE_FILTER, payload: number }
	| { type: EFilterActionType.SET_MIN_PRICE_FILTER, payload: number }
	| { type: EFilterActionType.RESET_FILTER }
	| { type: EFilterActionType.CLEAR_RECENT_SEARCH }
	| { type: EFilterActionType.REMOVE_SELECTED_RECENT, payload: string }
	| { type: EFilterActionType.APPLY_FILTER, payload: IFilter };

const initState: IFilter = {
	recent: [],
	keyword: '',
	brand: '',
	minPrice: 0,
	maxPrice: 0,
	sortBy: ''
};

export default (state = initState, action: TAction): IFilter => {
	switch (action.type) {
		case EFilterActionType.SET_TEXT_FILTER:
			return {
				...state,
				recent: (!!state.recent.find(n => n === action.payload) || action.payload === '') ? state.recent : [action.payload, ...state.recent],
				keyword: action.payload
			};
		case EFilterActionType.SET_BRAND_FILTER:
			return {
				...state,
				brand: action.payload
			};
		case EFilterActionType.SET_MAX_PRICE_FILTER:
			return {
				...state,
				maxPrice: action.payload
			};
		case EFilterActionType.SET_MIN_PRICE_FILTER:
			return {
				...state,
				minPrice: action.payload
			};
		case EFilterActionType.RESET_FILTER:
			return initState;
		case EFilterActionType.CLEAR_RECENT_SEARCH:
			return {
				...state,
				recent: []
			};
		case EFilterActionType.REMOVE_SELECTED_RECENT:
			return {
				...state,
				recent: state.recent.filter(item => item !== action.payload)
			}
		case EFilterActionType.APPLY_FILTER:
			return {
				...state,
				...action.payload
			};
		default:
			return state;
	}
};
