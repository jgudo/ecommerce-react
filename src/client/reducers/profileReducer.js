import { EDIT_PROFILE } from '../constants/constants';

const initState = {
  firstname: 'Pedro',
  lastname: 'Juan'
};

export default (state = initState, action) => {
  switch (action.type) {
    case EDIT_PROFILE:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
