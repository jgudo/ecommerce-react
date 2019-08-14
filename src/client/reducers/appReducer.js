import { LOADING } from '../constants/constants';

const initState = {
  loading: false,
  theme: 'default'
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload
      };
    default:
      return state;
  }
};
