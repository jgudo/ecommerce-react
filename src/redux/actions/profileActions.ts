import { EProfileActionType } from 'constants/constants';
import { IUser, PartialBy } from 'types/typings';

export const clearProfile = () => (<const>{
	type: EProfileActionType.CLEAR_PROFILE
});

export const setProfile = (user: IUser) => (<const>{
	type: EProfileActionType.SET_PROFILE,
	payload: user
});

export const updateEmail = (password: string, newEmail: string) => (<const>{
	type: EProfileActionType.UPDATE_EMAIL,
	payload: {
		password,
		newEmail
	}
});

interface IUpdateProfile {
	updates: Partial<IUser>;
	files: Record<string, File | undefined | null>;
	credentials?: {
		email: string;
		password: string;
	};
}

export const updateProfile = (newProfile: IUpdateProfile) => (<const>{
	type: EProfileActionType.UPDATE_PROFILE,
	payload: {
		updates: newProfile.updates,
		files: newProfile.files,
		credentials: newProfile.credentials
	}
});

export const updateProfileSuccess = (updates: Partial<IUser>) => (<const>{
	type: EProfileActionType.UPDATE_PROFILE_SUCCESS,
	payload: updates
});

export type ProfileActionType =
	| ReturnType<typeof clearProfile>
	| ReturnType<typeof setProfile>
	| ReturnType<typeof updateEmail>
	| ReturnType<typeof updateProfile>
	| ReturnType<typeof updateProfileSuccess>;