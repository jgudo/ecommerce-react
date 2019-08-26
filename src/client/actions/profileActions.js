import { CLEAR_PROFILE, SET_PROFILE } from '../constants/constants';

export const clearProfile = () => ({
  type: CLEAR_PROFILE
});

export const setProfile = user => ({
  type: SET_PROFILE,
  payload: user
});