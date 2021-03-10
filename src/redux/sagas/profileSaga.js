import { UPDATE_EMAIL, UPDATE_PROFILE } from 'constants/constants';
import { ACCOUNT } from 'constants/routes';
import firebase from 'firebase/firebase';
import { displayActionMessage } from 'helpers/utils';
import { call, put, select } from 'redux-saga/effects';
import { history } from 'routers/AppRouter';
import { setLoading } from '../actions/miscActions';
import { updateProfileSuccess } from '../actions/profileActions';

function* profileSaga({ type, payload }) {
	switch (type) {
		case UPDATE_EMAIL:
			try {
				yield put(setLoading(false));
				yield call(firebase.updateEmail, payload.password, payload.newEmail);

				yield put(setLoading(false));
				yield call(history.push, '/profile');
				yield call(displayActionMessage, 'Email Updated Successfully!', 'success');
			} catch (e) {
				console.log(e.message);
			}
			break;
		case UPDATE_PROFILE:
			try {
				const state = yield select();
				const { email, password } = payload.credentials;
				const { avatarFile, bannerFile } = payload.files;

				yield put(setLoading(true));

				// if email & password exist && the email has been edited
				// update the email
				if (email && password && email !== state.profile.email) {
					yield call(firebase.updateEmail, password, email);
				}

				if (avatarFile || bannerFile) {
					const bannerURL = bannerFile ? yield call(firebase.storeImage, state.auth.id, 'banner', bannerFile) : payload.updates.banner;
					const avatarURL = avatarFile ? yield call(firebase.storeImage, state.auth.id, 'avatar', avatarFile) : payload.updates.avatar;
					const updates = { ...payload.updates, avatar: avatarURL, banner: bannerURL };

					yield call(firebase.updateProfile, state.auth.id, updates);
					yield put(updateProfileSuccess(updates));
				} else {
					yield call(firebase.updateProfile, state.auth.id, payload.updates);
					yield put(updateProfileSuccess(payload.updates));
				}

				yield put(setLoading(false));
				yield call(history.push, ACCOUNT);
				yield call(displayActionMessage, 'Profile Updated Successfully!', 'success');
			} catch (e) {
				console.log(e);
				yield put(setLoading(false));
				if (e.code === 'auth/wrong-password') {
					yield call(displayActionMessage, 'Wrong password, profile update failed :(', 'error');
				} else {
					yield call(displayActionMessage, `:( Failed to update profile. ${e.message ? e.message : ''}`, 'error');
				}
			}
		default:
			return;
	}
}

export default profileSaga;
