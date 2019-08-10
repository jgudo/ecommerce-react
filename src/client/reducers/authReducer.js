import { SIGNIN, SIGNOUT } from '../constants/constants';

const initState = {
  id: 'test-123',
  type: 'admin'
};

export default (state = {}, action) => {
  switch (action.type) {
    case SIGNIN:
      return {
        id: action.payload.uid,
        type: action.payload.type
      };
    case SIGNOUT:
      return {};
    default: 
      return state;
  }
};
