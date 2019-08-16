import { takeLatest } from 'redux-saga/effects';
import * as ACTION from '../constants/constants';
import authSaga from './authSaga';
import productSaga from './productSaga';

function* rootSaga() {
    yield takeLatest([ 
        ACTION.SIGNIN, 
        ACTION.SIGNUP, 
        ACTION.SIGNIN_WITH_GOOGLE,
        ACTION.ON_AUTHSTATE_CHANGED
    ], authSaga);
    yield takeLatest([ 
        ACTION.ADD_PRODUCT, 
        ACTION.REMOVE_PRODUCT, 
        ACTION.EDIT_PRODUCT,
        ACTION.GET_PRODUCTS 
    ], productSaga);
}

export default rootSaga;
