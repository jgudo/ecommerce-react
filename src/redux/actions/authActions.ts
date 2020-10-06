import { EAuthActionType, EMiscActionType } from 'constants/constants';
import { IUser, IUserCred, IAuthStatus, IAuthInfo, AuthActionType } from 'types/typings';

export const signIn = (auth: { email: string, password: string }): AuthActionType => ({
	type: EAuthActionType.SIGNIN,
	payload: auth
});

export const signInWithGoogle = () => ({
	type: EAuthActionType.SIGNIN_WITH_GOOGLE
});

export const signInWithFacebook = () => ({
	type: EAuthActionType.SIGNIN_WITH_FACEBOOK
});

export const signInWithGithub = () => ({
	type: EAuthActionType.SIGNIN_WITH_GITHUB
});

export const signUp = (user: IUserCred): AuthActionType => ({
	type: EAuthActionType.SIGNUP,
	payload: user
});

export const signInSuccess = (auth: IAuthInfo): AuthActionType => ({
	type: EAuthActionType.SIGNIN_SUCCESS,
	payload: auth
});

export const setAuthPersistence = () => ({
	type: EAuthActionType.SET_AUTH_PERSISTENCE
});

export const signOut = () => ({
	type: EAuthActionType.SIGNOUT
});

export const signOutSuccess = (): AuthActionType => ({
	type: EAuthActionType.SIGNOUT_SUCCESS
});

export const setAuthStatus = (status: IAuthStatus): AuthActionType => ({
	type: EAuthActionType.SET_AUTH_STATUS,
	payload: status
});

export const onAuthStateChanged = () => ({
	type: EAuthActionType.ON_AUTHSTATE_CHANGED
});

export const onAuthStateSuccess = (user: IUser): AuthActionType => ({
	type: EAuthActionType.ON_AUTHSTATE_SUCCESS,
	payload: user
});

export const onAuthStateFail = error => ({
	type: EAuthActionType.ON_AUTHSTATE_FAIL,
	payload: error
});

export const resetPassword = (email: string): AuthActionType => ({
	type: EAuthActionType.RESET_PASSWORD,
	payload: email
});

export const isAuthenticating = (bool: boolean = true) => ({
	type: EMiscActionType.IS_AUTHENTICATING,
	payload: bool
});

