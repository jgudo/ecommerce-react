import { LOADING, IS_AUTHENTICATING } from '../constants/constants';

const initState = {
  loading: false,
  isAuthenticating: false,
  theme: 'default'
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload
      };
    case IS_AUTHENTICATING:
      return {
        ...state,
        isAuthenticating: action.payload
      };
    default:
      return state;
  }
};
