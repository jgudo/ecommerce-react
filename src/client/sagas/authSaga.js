import firebase from '../firebase/firebase';
import { call, put, fork } from 'redux-saga/effects';
import * as ACTION from '../constants/constants';
import { history } from '../routers/AppRouter';
import { setAuthStatus, signInSuccess, signOut, signOutSuccess } from '../actions/authActions';
import { clearBasket } from '../actions/basketActions';
import { setProfile, clearProfile } from '../actions/profileActions';
import { resetFilter } from '../actions/filterActions';

function* handleError(e) {
  yield put({ type: ACTION.IS_AUTHENTICATING, payload: false });
  
  switch (e.code) {
    case 'auth/network-request-failed':
      yield put(setAuthStatus('Network error has occured. Please try again.'));
      break;
    default:
      yield put(setAuthStatus(e.messsage));
      break;
  }
  console.log('ERROR: ', e);
}

function* initRequest() {
  yield put({ type: ACTION.IS_AUTHENTICATING, payload: true });
  yield put(setAuthStatus(null));
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

        yield put(setProfile(payload));
        yield put(signInSuccess({ id: uid, type: 'client' }));
        yield put({ type: ACTION.IS_AUTHENTICATING, payload: false });
      } catch (e) {
        yield handleError(e);
      }
      break;
    case ACTION.SIGNOUT:
      try {
        yield initRequest();
        yield call(firebase.signOut); // synchronously 
        yield put(clearBasket());
        yield put(clearProfile());
        yield put(resetFilter());
        yield put(signOutSuccess());
        yield put({ type: ACTION.IS_AUTHENTICATING, payload: false });
        yield call(history.push, '/signin');
      } catch (e) {
        console.log(e);
      }
      break;
    case ACTION.ON_AUTHSTATE_SUCCESS:
      const snapshot = yield call(firebase.getUser, payload.uid);

      if (snapshot.val()) { // if user exists in database
        yield put(setProfile(snapshot.val()));
      } else { // add the user
        const user = {
          fullname: payload.displayName ? payload.displayName : 'User',
          avatar: payload.photoURL,
          email: payload.email,
          address: '',
          mobile: ''
        };
        yield call(firebase.addUser, payload.uid, user);
        yield put(setProfile(user));
      }
     
      yield put(signInSuccess({ id: payload.uid, type: 'client' }));
      yield put({ type: ACTION.IS_AUTHENTICATING, payload: false });
      break;
    case ACTION.ON_AUTHSTATE_FAIL:
      yield put(signOut());
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
