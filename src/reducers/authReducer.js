import { SIGNIN_SUCCESS, SIGNOUT_SUCCESS } from 'constants/constants';

const initState = {
  id: 'test-123',
  type: 'client',
  provider: 'password'
};

export default (state = initState, action) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return {
        id: action.payload.id,
        type: action.payload.type,
        provider: action.payload.provider
      };
    case SIGNOUT_SUCCESS:
      return {};
    default: 
      return state;
  }
};
