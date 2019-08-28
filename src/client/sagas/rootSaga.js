import { takeLatest, takeEvery } from 'redux-saga/effects';
import * as ACTION from '../constants/constants';
import authSaga from './authSaga';
import productSaga from './productSaga';

function* rootSaga() {
    yield takeLatest([ 
        ACTION.SIGNIN, 
        ACTION.SIGNUP, 
        ACTION.SIGNOUT,
        ACTION.SIGNIN_WITH_GOOGLE,
        ACTION.SIGNIN_WITH_FACEBOOK,
        ACTION.ON_AUTHSTATE_CHANGED,
        ACTION.ON_AUTHSTATE_SUCCESS,
        ACTION.ON_AUTHSTATE_FAIL,
        ACTION.SET_AUTH_PERSISTENCE,
        ACTION.RESET_PASSWORD
    ], authSaga);
    yield takeLatest([ 
        ACTION.ADD_PRODUCT, 
        ACTION.REMOVE_PRODUCT, 
        ACTION.EDIT_PRODUCT,
        ACTION.GET_PRODUCTS 
    ], productSaga);
}

export default rootSaga;
