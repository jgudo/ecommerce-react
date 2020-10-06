import { EProfileActionType } from 'constants/constants';
import { IUser, ProfileActionType } from 'types/typings';

export const clearProfile = (): ProfileActionType => ({
	type: EProfileActionType.CLEAR_PROFILE
});

export const setProfile = (user: IUser): ProfileActionType => ({
	type: EProfileActionType.SET_PROFILE,
	payload: user
});

export const updateEmail = (password: string, newEmail: string) => ({
	type: EProfileActionType.UPDATE_EMAIL,
	payload: {
		password,
		newEmail
	}
});

export const updateProfile = newProfile => ({
	type: EProfileActionType.UPDATE_PROFILE,
	payload: {
		updates: newProfile.updates,
		files: newProfile.files,
		credentials: newProfile.credentials
	}
});

export const updateProfileSuccess = (updates: Partial<IUser>): ProfileActionType => ({
	type: EProfileActionType.UPDATE_PROFILE_SUCCESS,
	payload: updates
});
