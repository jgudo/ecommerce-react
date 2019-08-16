import firebase from '../firebase/firebase';
import { call, put } from 'redux-saga/effects';
import * as ACTION from '../constants/constants';

function* handleError(e) {
  yield put({ type: ACTION.SET_AUTH_STATUS, payload: e.message });
  yield put({ type: ACTION.IS_AUTHENTICATING, payload: false });
  console.log('ERROR: ', e);
}

function* initRequest() {
  yield put({ type: ACTION.IS_AUTHENTICATING, payload: true });
  yield put({ type: ACTION.SET_AUTH_STATUS, payload: null });
}

function* authSaga({ type, payload }) {
  switch (type) {
    case ACTION.SIGNIN:
      try {
        yield initRequest();
    
        const auth = yield call(firebase.signIn, payload.email, payload.password);
        const uid = auth.user.uid;
        const snapshot = yield call(firebase.getUser, uid);

        yield put({ type: ACTION.SET_PROFILE, payload: snapshot.val() });
        yield put({ type: ACTION.SIGNIN_SUCCESS, payload: { id: uid, type: 'client' }});
        yield put({ type: ACTION.IS_AUTHENTICATING, payload: false });
      } catch (e) {
        yield handleError(e);
      }
      break;
    case ACTION.SIGNIN_WITH_GOOGLE:
      try {
        const result = yield call(firebase.signInWithGoogle);

        if (result) {
          const snapshot = yield call(firebase.getUser, result.user.uid);

          console.log(snapshot);
          // yield put({ type: SET_PROFILE, payload: snapshot.val() });
        }
      } catch (e) {
        console.log(e);
      }
      break;
    case ACTION.SIGNUP:
      try {
        yield initRequest();
    
        const auth = yield call(firebase.createAccount, payload.email, payload.password);
        const uid = auth.user.uid;
        const ref = yield call(firebase.addUser, uid, {
          firstname: payload.firstname,
          lastname: payload.lastname,
          email: payload.email
        });
        console.log(ref);

        yield put({ type: ACTION.SET_PROFILE, payload });
        yield put({ type: ACTION.SIGNIN_SUCCESS, payload: { id: uid, type: 'client' }});
        yield put({ type: ACTION.IS_AUTHENTICATING, payload: false });
      } catch (e) {
        yield handleError(e);
      }
      break;
    case ACTION.SIGNOUT:
      try {
        yield call(firebase.signOut);
        yield put({ type: ACTION.CLEAR_BASKET });
        yield put({ type: ACTION.CLEAR_PROFILE });
        yield put({ type: ACTION.RESET_FILTER });
      } catch (e) {
        console.log(e);
      }
      break;
    case ACTION.ON_AUTHSTATE_CHANGED:
      try {
        const user = yield call(firebase.onAuthStateChanged);
        
        yield put({ type: ACTION.SIGNIN_SUCCESS, payload: { id: user.uid, type: 'client' }});
      } catch (e) {
        yield put({ type: ACTION.SIGNOUT });
        console.log(e);
      }
      break;
    default:
      return;
  }
}

export default authSaga;
