import firebase from '../firebase/firebase';
import { call, put, select } from 'redux-saga/effects';
import { history } from '../routers/AppRouter';
import { 
  UPDATE_PROFILE, 
  UPDATE_EMAIL,
  UPDATE_PROFILE_SUCCESS,
  LOADING
} from '../constants/constants';
import { displayActionMessage } from '../helpers/utils';

function* profileSaga({ type, payload }) {
  switch (type) {
    case UPDATE_EMAIL:
      try {
        yield put({ type: LOADING, payload: false });
        yield call(firebase.updateEmail, payload.password, payload.newEmail);

        yield put({ type: LOADING, payload: false });
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

        yield put({ type: LOADING, payload: true });
        
        if (email && password && email !== state.profile.email) {
          yield call(firebase.updateEmail, password, email);
        }
        
        if (avatarFile || bannerFile) {
          const bannerURL = bannerFile ? yield call(firebase.storeBannerImage, state.auth.id, bannerFile) : payload.updates.banner;
          const avatarURL = avatarFile ? yield call(firebase.storeAvatarImage, state.auth.id, avatarFile) : payload.updates.avatar;
          const updates = { ...payload.updates, avatar: avatarURL, banner: bannerURL };

          yield call(firebase.updateProfile, state.auth.id, updates);
          yield put({ type: UPDATE_PROFILE_SUCCESS, payload: updates });
        } else {
          yield call(firebase.updateProfile, state.auth.id, payload.updates);
          yield put({ type: UPDATE_PROFILE_SUCCESS, payload: payload.updates });
        }

        yield put({ type: LOADING, payload: false });
        yield call(history.push, '/profile');
        yield call(displayActionMessage, 'Profile Updated Successfully!', 'success');
      } catch (e) {
        console.log(e);
        yield put({ type: LOADING, payload: false });
        if (e.code === 'auth/wrong-password') {
          yield call(displayActionMessage, 'Wrong password, email update failed :(', 'error');
        } else {
          yield call(displayActionMessage, `:( Failed to update profile. ${e.message ? e.message : ''}`, 'error');
        }
      }
    default:
      return;
  }
}

export default profileSaga;
