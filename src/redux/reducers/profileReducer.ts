import { EProfileActionType } from 'constants/constants';
import { IUser } from 'types/types';
import { ProfileActionType } from '../actions/profileActions';
// import profile from 'static/profile.jpg';
// import banner from 'static/banner.jpg';

type State = IUser | {};

const initState: State = {
	//   fullname: 'Pedro Juan',
	//   email: 'juanpedro@gmail.com',
	//   address: '',
	//   mobile: {},
	//   avatar: profile,
	//   banner,
	//   dateJoined: 1954234787348
};

export default (state = initState, action: ProfileActionType): State => {
	switch (action.type) {
		case EProfileActionType.SET_PROFILE:
			return action.payload;
		case EProfileActionType.UPDATE_PROFILE_SUCCESS:
			return {
				...state,
				...action.payload
			};
		case EProfileActionType.CLEAR_PROFILE:
			return initState;
		default:
			return state;
	}
};
