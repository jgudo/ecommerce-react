import firebase from '../firebase/firebase';
import { call, put, fork } from 'redux-saga/effects';
import * as ACTION from '../constants/constants';
import { history } from '../routers/AppRouter';
import { setAuthStatus, signInSuccess, signOut, signOutSuccess } from '../actions/authActions';
import { clearBasket } from '../actions/basketActions';
import { setProfile, clearProfile } from '../actions/profileActions';
import { resetFilter } from '../actions/filterActions';
import { resetShippingDetails } from '../actions/checkoutActions';

import defaultAvatar from '../images/defaultAvatar.jpg';
import defaultBanner from '../images/defaultBanner.jpg';

function* handleError(e) {
  yield put({ type: ACTION.IS_AUTHENTICATING, payload: false });
  
  switch (e.code) {
    case 'auth/network-request-failed':
      yield put(setAuthStatus({ success: false, message: 'Network error has occured. Please try again.'}));
      break;
    case 'auth/email-already-in-use':
      yield put(setAuthStatus({ success: false, message: 'Email is already in use. Please use another email'}));
      break;
    case 'auth/wrong-password':
      yield put(setAuthStatus({ success: false, message: 'Incorrect email or password'}));
      break;
    case 'auth/user-not-found':
      yield put(setAuthStatus({ success: false, message: 'Incorrect email or password'}));
      break;
    default:
      yield put(setAuthStatus({ success: false, message: e.message}));
      break;
  }
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
    
        const ref = yield call(firebase.createAccount, payload.email, payload.password);
        const fullname = payload.fullname.split(' ').map(name => name[0].toUpperCase().concat(name.substring(1))).join(' ');
        const user = {
          fullname: fullname,
          avatar: defaultAvatar,
          banner: defaultBanner,
          email: payload.email,
          address: '',
          mobile: ''
        };

        yield call(firebase.addUser, ref.user.uid, user);
        yield put(setProfile(user));
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
        yield put(resetShippingDetails());
        yield put(signOutSuccess());
        yield put({ type: ACTION.IS_AUTHENTICATING, payload: false });
        // yield call(history.push, '/signin');
      } catch (e) {
        console.log(e);
      }
      break;
    case ACTION.RESET_PASSWORD:
      try {
        yield initRequest();
        yield call(firebase.passwordReset, payload);
        yield put(setAuthStatus({success: true, message: 'Password reset email has been sent to your provided email.'}));
        yield put({ type: ACTION.IS_AUTHENTICATING, payload: false });
      } catch (e) {
        console.log('Failed to send password reset email.');
        yield put({ type: ACTION.IS_AUTHENTICATING, payload: false });
        yield put(setAuthStatus({success: false, message: 'Failed to send password reset email. Did you type your email correctly?'}));
      }
      break;
    case ACTION.ON_AUTHSTATE_SUCCESS:
      const snapshot = yield call(firebase.getUser, payload.uid);

      if (snapshot.val()) { // if user exists in database
        yield put(setProfile(snapshot.val()));
      } 

      if (payload.providerData[0].providerId !== 'password') { // add the user
        const user = {
          fullname: payload.displayName ? payload.displayName : 'User',
          avatar: payload.photoURL ? payload.photoURL : defaultAvatar,
          banner: defaultBanner,
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
      yield put(clearProfile());
      yield put(signOutSuccess());
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
