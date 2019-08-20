import firebase from '../firebase/firebase';
import { call, put } from 'redux-saga/effects';
import * as ACTION from '../constants/constants';
import { history } from '../routers/AppRouter';

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
        yield call(firebase.signIn, payload.email, payload.password);
      } catch (e) {
        yield handleError(e);
      }
      break;
    case ACTION.SIGNIN_WITH_GOOGLE:
      try {
        yield initRequest();
        yield call(firebase.signInWithGoogle);
      } catch (e) {
        yield handleError(e);
      }
      break;
    case ACTION.SIGNIN_WITH_FACEBOOK:
      try {
        yield initRequest();
        yield call(firebase.signInWithFacebook);
      } catch (e) {
        yield handleError(e);
      }
      break;
    case ACTION.SIGNUP:
      try {
        yield initRequest();
    
        const auth = yield call(firebase.createAccount, payload.email, payload.password);
        const uid = auth.user.uid;
        const ref = yield call(firebase.addUser, uid, {
          fullname: payload.fullname,
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
        yield initRequest();
        yield call(firebase.signOut);
        yield put({ type: ACTION.CLEAR_BASKET });
        yield put({ type: ACTION.CLEAR_PROFILE });
        yield put({ type: ACTION.RESET_FILTER });
        yield put({ type: ACTION.SIGNOUT_SUCCESS });
        yield put({ type: ACTION.IS_AUTHENTICATING, payload: false });
        yield call(history.push, '/signin');
      } catch (e) {
        console.log(e);
      }
      break;
    case ACTION.ON_AUTHSTATE_SUCCESS:
      const snapshot = yield call(firebase.getUser, payload.uid);

      if (snapshot.val()) { // if user exists in database
        yield put({ type: ACTION.SET_PROFILE, payload: snapshot.val() });
      } else { // add the user
        const user = {
          fullname: payload.displayName ? payload.displayName : 'User',
          avatar: payload.photoURL,
          email: payload.email,
          address: '',
          mobile: ''
        };
        yield call(firebase.addUser, payload.uid, user);
        yield put({ type: ACTION.SET_PROFILE, payload: user });
      }
     
      yield put({ type: ACTION.SIGNIN_SUCCESS, payload: { id: payload.uid, type: 'client' }});
      yield put({ type: ACTION.IS_AUTHENTICATING, payload: false });
      break;
    case ACTION.ON_AUTHSTATE_FAIL:
      yield put({ type: ACTION.SIGNOUT });
      yield handleError(payload);
      break;
    case ACTION.SET_AUTH_PERSISTENCE:
      try {
        yield call(firebase.setAuthPersistence);
      } catch (e) {
        console.log(e);
      }
      break;
    default:
      return;
  }
}

export default authSaga;
