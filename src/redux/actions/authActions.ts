import { EAuthActionType, EMiscActionType } from 'constants/constants';
import { IUserCred, IAuthInfo } from 'types/types';

export const signIn = (auth: { email: string, password: string }) => (<const>{
	type: EAuthActionType.SIGNIN,
	payload: auth
});

export const signInWithGoogle = () => (<const>{
	type: EAuthActionType.SIGNIN_WITH_GOOGLE
});

export const signInWithFacebook = () => (<const>{
	type: EAuthActionType.SIGNIN_WITH_FACEBOOK
});

export const signInWithGithub = () => (<const>{
	type: EAuthActionType.SIGNIN_WITH_GITHUB
});

export const signUp = (user: IUserCred) => (<const>{
	type: EAuthActionType.SIGNUP,
	payload: user
});

export const signInSuccess = (auth: IAuthInfo) => (<const>{
	type: EAuthActionType.SIGNIN_SUCCESS,
	payload: auth
});

export const setAuthPersistence = () => (<const>{
	type: EAuthActionType.SET_AUTH_PERSISTENCE
});

export const signOut = () => (<const>{
	type: EAuthActionType.SIGNOUT
});

export const signOutSuccess = () => (<const>{
	type: EAuthActionType.SIGNOUT_SUCCESS
});

export const onAuthStateChanged = () => (<const>{
	type: EAuthActionType.ON_AUTHSTATE_CHANGED
});

export const onAuthStateSuccess = (user: any) => (<const>{
	type: EAuthActionType.ON_AUTHSTATE_SUCCESS,
	payload: user
});

export const onAuthStateFail = error => (<const>{
	type: EAuthActionType.ON_AUTHSTATE_FAIL,
	payload: error
});

export const resetPassword = (email: string) => (<const>{
	type: EAuthActionType.RESET_PASSWORD,
	payload: email
});

export const isAuthenticating = (bool: boolean = true) => (<const>{
	type: EMiscActionType.IS_AUTHENTICATING,
	payload: bool
});

export type AuthActionType =
	| ReturnType<typeof signIn>
	| ReturnType<typeof signInSuccess>
	| ReturnType<typeof signInWithFacebook>
	| ReturnType<typeof signInWithGithub>
	| ReturnType<typeof signInWithGoogle>
	| ReturnType<typeof signUp>
	| ReturnType<typeof setAuthPersistence>
	| ReturnType<typeof signOut>
	| ReturnType<typeof signOutSuccess>
	| ReturnType<typeof onAuthStateChanged>
	| ReturnType<typeof onAuthStateSuccess>
	| ReturnType<typeof onAuthStateFail>
	| ReturnType<typeof resetPassword>
	| ReturnType<typeof isAuthenticating>;