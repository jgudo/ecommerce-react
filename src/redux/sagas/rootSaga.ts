import { takeLatest } from 'redux-saga/effects';
import { EAuthActionType, EProductActionType, EProfileActionType } from 'constants/constants';
import authSaga from './authSaga';
import productSaga from './productSaga';
import profileSaga from './profileSaga';

function* rootSaga() {
	yield takeLatest([
		EAuthActionType.SIGNIN,
		EAuthActionType.SIGNUP,
		EAuthActionType.SIGNOUT,
		EAuthActionType.SIGNIN_WITH_GOOGLE,
		EAuthActionType.SIGNIN_WITH_FACEBOOK,
		EAuthActionType.SIGNIN_WITH_GITHUB,
		EAuthActionType.ON_AUTHSTATE_CHANGED,
		EAuthActionType.ON_AUTHSTATE_SUCCESS,
		EAuthActionType.ON_AUTHSTATE_FAIL,
		EAuthActionType.SET_AUTH_PERSISTENCE,
		EAuthActionType.RESET_PASSWORD
	], authSaga);
	yield takeLatest([
		EProductActionType.ADD_PRODUCT,
		EProductActionType.SEARCH_PRODUCT,
		EProductActionType.REMOVE_PRODUCT,
		EProductActionType.EDIT_PRODUCT,
		EProductActionType.GET_PRODUCTS
	], productSaga);
	yield takeLatest([
		EProfileActionType.UPDATE_EMAIL,
		EProfileActionType.UPDATE_PROFILE
	], profileSaga);
}

export default rootSaga;
