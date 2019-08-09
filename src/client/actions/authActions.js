import { SIGNIN, SIGNOUT } from '../constants/constants';

export const signIn = auth => ({
  type: SIGNIN,
  payload: auth
});

export const signOut = () => ({
  type: SIGNOUT
});
