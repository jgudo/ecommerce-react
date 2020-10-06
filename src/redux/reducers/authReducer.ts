import { EAuthActionType } from 'constants/constants';
import { AuthActionType, IAuthInfo } from 'types/typings';

const initState: IAuthInfo = {
	id: null,
	role: null,
	provider: null
};

export default (state = initState, action: AuthActionType): IAuthInfo => {
	switch (action.type) {
		case EAuthActionType.SIGNIN_SUCCESS:
			return {
				id: action.payload.id,
				role: action.payload.role,
				provider: action.payload.provider
			};
		case EAuthActionType.SIGNOUT_SUCCESS:
			return initState;
		default:
			return state;
	}
};
