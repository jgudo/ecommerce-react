import firebase from '../firebase/firebase';
import { call, put } from 'redux-saga/effects';
import { 
  LOADING, 
  SIGNIN,
  SIGNUP,
  SIGNIN_SUCCESS, 
  SIGNUP_SUCCESS,
  SET_AUTH_STATUS,
  SET_PROFILE 
} from '../constants/constants';

function* handleError(e) {
  yield put({ type: SET_AUTH_STATUS, payload: e.message });
  yield put({ type: LOADING, payload: false });
  console.log('ERROR: ', e);
}

function* authSaga({ type, payload }) {
  switch (type) {
    case SIGNIN:
      try {
        yield put({ type: LOADING, payload: true });
    
        const auth = yield call(firebase.signIn, payload.email, payload.password);
    
        if (auth) {
          const snapshot = yield call(firebase.getUser, auth.user.uid);
          yield put({ type: SET_PROFILE, payload: snapshot.val() });
          yield put({ type: SIGNIN_SUCCESS, payload: { id: auth.user.uid, type: 'client' }});
          yield put({ type: LOADING, payload: false });
        }
      } catch (e) {
        yield handleError(e);
      }
      break;
    case SIGNUP:
      try {
        yield put({ type: LOADING, payload: true });
    
        const auth = yield call(firebase.createAccount, payload.email, payload.password);
        if (auth) {
          const ref = yield call(firebase.addUser, auth.user.uid, {
            firstname: payload.firstname,
            lastname: payload.lastname,
            email: payload.email
          });
          console.log(ref);
          yield put({ type: SET_PROFILE, payload });
          yield put({ type: SIGNIN_SUCCESS, payload: { id: auth.user.uid, type: 'client' }});
          yield put({ type: LOADING, payload: false });
        }
      } catch (e) {
        yield handleError(e);
      }
      break;
    default:
      return;
  }
}

export default authSaga;
