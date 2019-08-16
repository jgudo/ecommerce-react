import { 
  SIGNIN, 
  SIGNIN_SUCCESS,
  SIGNUP,
  ON_AUTHSTATE_CHANGED, 
  SIGNOUT, 
  SET_AUTH_STATUS,
  SIGNIN_WITH_GOOGLE,
} from '../constants/constants';

export const signIn = (email, password) => ({
  type: SIGNIN,
  payload: {
    email,
    password 
  }
});

export const signInWithGoogle = () => ({
  type: SIGNIN_WITH_GOOGLE
});

export const signUp = user => ({
  type: SIGNUP,
  payload: user
});

export const signInSuccess = auth => ({
  type: SIGNIN_SUCCESS,
  payload: auth
});

export const signOut = () => ({
  type: SIGNOUT
});

export const setAuthStatus = status => ({
  type: SET_AUTH_STATUS,
  payload: status
});

export const onAuthStateChanged = () => ({
  type: ON_AUTHSTATE_CHANGED
});
