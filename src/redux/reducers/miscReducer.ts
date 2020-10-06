import { EMiscActionType, EAuthActionType } from 'constants/constants';
import { IAuthStatus, IMisc } from 'types/typings';

type TAction =
	| { type: EMiscActionType.LOADING, payload: boolean }
	| { type: EMiscActionType.IS_AUTHENTICATING, payload: boolean }
	| { type: EMiscActionType.SET_REQUEST_STATUS, payload: string | null }
	| { type: EAuthActionType.SET_AUTH_STATUS, payload: IAuthStatus | {} };

const initState: IMisc = {
	loading: false,
	isAuthenticating: false,
	authStatus: {},
	requestStatus: null,
	theme: 'LIGHT'
};

export default (state = initState, action: TAction): IMisc => {
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
