import { 
  SET_TEXT_FILTER, 
  SET_BRAND_FILTER,
  SET_MAX_PRICE_FILTER,
  SET_MIN_PRICE_FILTER,
  RESET_FILTER,
  APPLY_FILTER,
  CLEAR_RECENT_SEARCH 
} from '../constants/constants';

const initState = {
  recent: ['gago', 'sira'],
  keyword: '',
  brand: '',
  minPrice: 0,
  maxPrice: 0
};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_TEXT_FILTER:
      return {
        ...state,
        recent: [action.payload, ...state.recent],
        keyword: action.payload
      };
    case SET_BRAND_FILTER:
      return {
        ...state,
        brand: action.payload
      };
    case SET_MAX_PRICE_FILTER:
      return {
        ...state,
        maxPrice: action.payload
      };
    case SET_MIN_PRICE_FILTER:
      return {
        ...state,
        minPrice: action.payload
      };
    case RESET_FILTER:
      return initState;
    case CLEAR_RECENT_SEARCH:
      return {
        ...state,
        recent: []
      };
    case APPLY_FILTER:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
