import { SET_TEXT_FILTER } from '../constants/constants';

export default (state = {
  name: ''
}, action) => {
  switch (action.type) {
    case SET_TEXT_FILTER:
      return {
        ...state,
        name: action.payload
      };
    default:
      return state;
  }
};
