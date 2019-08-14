import { takeLatest } from 'redux-saga/effects';
import * as ACTION from '../constants/constants';
import authSaga from './authSaga';

function* rootSaga() {
    yield takeLatest([ ACTION.SIGNIN, ACTION.SIGNUP ], authSaga);
}

export default rootSaga;
