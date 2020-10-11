import { EMiscActionType, EAuthActionType, THEME_DEFAULT } from 'constants/constants';
import { IMisc } from 'types/types';
import { MiscActionType } from '../actions/miscActions';

const initState: IMisc = {
	loading: false,
	isAuthenticating: false,
	authStatus: {},
	requestStatus: null,
	theme: THEME_DEFAULT
};

export default (state = initState, action: MiscActionType): IMisc => {
	switch (action.type) {
		case EMiscActionType.LOADING:
			return {
				...state,
				loading: action.payload
			};
		case EMiscActionType.IS_AUTHENTICATING:
			return {
				...state,
				isAuthenticating: action.payload
			};
		case EMiscActionType.SET_REQUEST_STATUS:
			return {
				...state,
				requestStatus: action.payload
			};
		case EAuthActionType.SET_AUTH_STATUS:
			return {
				...state,
				authStatus: action.payload
			}
		default:
			return state;
	}
};
