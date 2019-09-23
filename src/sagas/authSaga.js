import { call, put } from 'redux-saga/effects';

import firebase from 'firebase/firebase';
import { history } from 'routers/AppRouter';

import {
  SIGNIN,
  SIGNUP,
  ON_AUTHSTATE_FAIL,
  SIGNIN_WITH_GOOGLE,
  SIGNIN_WITH_FACEBOOK,
  RESET_PASSWORD,
  SIGNOUT,
  ON_AUTHSTATE_SUCCESS,
  SET_AUTH_PERSISTENCE
} from 'constants/constants';

import { 
  setAuthStatus, 
  signInSuccess, 
  signOutSuccess,
  isAuthenticating 
} from 'actions/authActions';

import { clearBasket } from 'actions/basketActions';
import { setProfile, clearProfile } from 'actions/profileActions';
import { resetFilter } from 'actions/filterActions';
import { resetShippingDetails } from 'actions/checkoutActions';

import defaultAvatar from 'images/defaultAvatar.jpg';
import defaultBanner from 'images/defaultBanner.jpg';

function* handleError(e) {
  yield put(isAuthenticating(false));
  
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
    case 'auth/reset-password-error':
      yield put(setAuthStatus({ success: false, message: 'Failed to send password reset email. Did you type your email correctly?'}));
      break;
    default:
      yield put(setAuthStatus({ success: false, message: e.message}));
      break;
  }
}

function* initRequest() {
  yield put(isAuthenticating());
  yield put(setAuthStatus(null));
}

function* authSaga({ type, payload }) {
  switch (type) {
    case SIGNIN:
      try {
        yield initRequest();
        yield call(firebase.signIn, payload.email, payload.password);
      } catch (e) {
        yield handleError(e);
      }
      break;
    case SIGNIN_WITH_GOOGLE:
      try {
        yield initRequest();
        yield call(firebase.signInWithGoogle);
      } catch (e) {
        yield handleError(e);
      }
      break;
    case SIGNIN_WITH_FACEBOOK:
      try {
        yield initRequest();
        yield call(firebase.signInWithFacebook);
      } catch (e) {
        yield handleError(e);
      }
      break;
    case SIGNUP:
      try {
        yield initRequest();
    
        const ref = yield call(firebase.createAccount, payload.email, payload.password);
        const fullname = payload.fullname.split(' ').map(name => name[0].toUpperCase().concat(name.substring(1))).join(' ');
        const user = {
          fullname,
          avatar: defaultAvatar,
          banner: defaultBanner,
          email: payload.email,
          address: '',
          mobile: '',
          dateJoined: ref.user.metadata.creationTime || new Date().getTime()
        };

        yield call(firebase.addUser, ref.user.uid, user);
        yield put(setProfile(user));
        yield put(isAuthenticating(false));
      } catch (e) {
        yield handleError(e);
      }
      break;
    case SIGNOUT:
      try {
        yield initRequest();
        yield call(firebase.signOut);
        yield put(clearBasket());
        yield put(clearProfile());
        yield put(resetFilter());
        yield put(resetShippingDetails());
        yield put(signOutSuccess());
        yield put(isAuthenticating(false));
        yield call(history.push, '/signin');
      } catch (e) {
        console.log(e);
      }
      break;
    case RESET_PASSWORD:
      try {
        yield initRequest();
        yield call(firebase.passwordReset, payload);
        yield put(setAuthStatus({
          success: true, 
          message: 'Password reset email has been sent to your provided email.'
        }));
        yield put(isAuthenticating(false));
      } catch (e) {
        handleError({ code: 'auth/reset-password-error' });
      }
      break;
    case ON_AUTHSTATE_SUCCESS:
      yield put(setAuthStatus({ success: true, message: 'Successfully signed in.'}));
      const snapshot = yield call(firebase.getUser, payload.uid);

      if (snapshot.val()) { // if user exists in database
        yield put(setProfile(snapshot.val()));
      } else if (payload.providerData[0].providerId !== 'password') { 
        // add the user if auth provider is not password
        const user = {
          fullname: payload.displayName ? payload.displayName : 'User',
          avatar: payload.photoURL ? payload.photoURL : defaultAvatar,
          banner: defaultBanner,
          email: payload.email,
          address: '',
          mobile: '',
          dateJoined: payload.metadata.creationTime
        };
        yield call(firebase.addUser, payload.uid, user);
        yield put(setProfile(user));
      }
      
      yield put(signInSuccess({ 
        id: payload.uid, 
        type: 'client', 
        provider: payload.providerData[0].providerId 
      }));
      yield put(isAuthenticating(false));
      break;
    case ON_AUTHSTATE_FAIL:
      yield put(clearProfile());
      yield put(signOutSuccess());
      break;
    case SET_AUTH_PERSISTENCE:
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
