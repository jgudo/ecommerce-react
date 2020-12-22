import { EAuthActionType, EMiscActionType } from 'constants/constants';
import { IAuthStatus } from 'types/types';

// isLoading method
export const setLoading = (bool: boolean = true) => (<const>{
	type: EMiscActionType.LOADING,
	payload: bool
});

export const setAuthenticating = (bool: boolean = true) => (<const>{
	type: EMiscActionType.IS_AUTHENTICATING,
	payload: bool
});

export const setRequestStatus = (status: string) => (<const>{
	type: EMiscActionType.SET_REQUEST_STATUS,
	payload: status
});

export const setAuthStatus = (status: IAuthStatus) => (<const>{
	type: EAuthActionType.SET_AUTH_STATUS,
	payload: status
});

export type MiscActionType =
	| ReturnType<typeof setLoading>
	| ReturnType<typeof setAuthStatus>
	| ReturnType<typeof setAuthenticating>
	| ReturnType<typeof setRequestStatus>;