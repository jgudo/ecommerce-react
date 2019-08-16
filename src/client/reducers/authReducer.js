import { SIGNIN_SUCCESS, SIGNOUT, SET_AUTH_STATUS } from '../constants/constants';

const initState = {
  id: 'test-123',
  type: 'admin',
  authStatus: null
};

export default (state = {}, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return {
        id: action.payload.id,
        type: action.payload.type
      };
    case SIGNOUT:
      return {};
    case SET_AUTH_STATUS:
      return {
        ...state,
        authStatus: action.payload
      }
    default: 
      return state;
  }
};
