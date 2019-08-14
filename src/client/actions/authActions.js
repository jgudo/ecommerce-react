import { 
  SIGNIN, 
  SIGNIN_SUCCESS,
  SIGNUP,
  SIGNUP_SUCCESS, 
  SIGNOUT, 
  SET_AUTH_STATUS 
} from '../constants/constants';

export const signIn = (email, password) => ({
  type: SIGNIN,
  payload: {
    email,
    password 
  }
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
