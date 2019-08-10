import { ADD_USER, EDIT_USER, DELETE_USER } from '../constants/constants';

const initState = [
  {
    firstname: 'Gago',
    lastname: 'Ka',
    email: 'gagoka@mail.com',
    password: 'gagooo',
    avatar: '',
    banner: '',
    dateJoined: 0
  }
];

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.payload];
    case EDIT_USER:
      return state.map((user) => {
        if (user.id === action.payload.id) {
          return {
            ...user,
            ...action.payload
          };
        }
        return user;
      });
    case DELETE_USER:
      return state.filter(user => user.id !== action.payload);
    default:
      return state;
  }
};
