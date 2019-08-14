import { SET_PROFILE, EDIT_PROFILE, CLEAR_PROFILE } from '../constants/constants';
import profile from '../../../static/profile.jpg';
import banner from '../../../static/banner.jpg';

const initState = {
  firstname: 'Pedro',
  lastname: 'Juan',
  avatar: profile,
  banner
};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return action.payload
    case EDIT_PROFILE:
      return {
        ...state,
        ...action.payload
      };
    case CLEAR_PROFILE:
      return {};
    default:
      return state;
  }
};
