import { LOGIN, LOGOUT } from '../constants/constants';

const initState = {
  id: 'test-123',
  type: 'client'
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        id: action.payload.uid,
        type: action.payload.type
      };
    case LOGOUT:
      return {};
    default: 
      return state;
  }
};
