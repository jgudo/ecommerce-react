import { 
  LOADING, 
  IS_AUTHENTICATING, 
  SET_AUTH_STATUS,
  SET_REQUEST_STATUS,
  SET_LAST_REF_KEY 
} from '../constants/constants';

const initState = {
  loading: false,
  isAuthenticating: false,
  authStatus: null,
  requestStatus: null,
  lastRefKey: '',
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
    case SET_REQUEST_STATUS:
      return {
        ...state,
        requestStatus: action.payload
      };
    case SET_LAST_REF_KEY:
        return {
          ...state,
          lastRefKey: action.payload
        };
    case SET_AUTH_STATUS:
      return {
        ...state,
        authStatus: action.payload
      }
    default:
      return state;
  }
};
