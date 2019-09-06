import { SET_PROFILE, UPDATE_PROFILE_SUCCESS, CLEAR_PROFILE } from '../constants/constants';
import profile from '../../static/profile.jpg';
import banner from '../../static/banner.jpg';

const initState = {
  fullname: 'Pedro Juan',
  email: 'juanpedro@gmail.com',
  address: '',
  mobile: '09264546942',
  avatar: profile,
  banner,
  dateJoined: 1954234787348
};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return action.payload
    case UPDATE_PROFILE_SUCCESS:
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
