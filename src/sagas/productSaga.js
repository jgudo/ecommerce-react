import { call, put, select } from 'redux-saga/effects';
import firebase from 'firebase/firebase';

import {
  LOADING,
  SET_REQUEST_STATUS,
  GET_PRODUCTS,
  CANCEL_GET_PRODUCTS,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  REMOVE_PRODUCT,
  SET_LAST_REF_KEY
} from 'constants/constants';

import { 
  getProductsSuccess, 
  addProductSuccess, 
  editProductSuccess,
  removeProductSuccess 
} from 'actions/productActions';

import { displayActionMessage } from 'helpers/utils';
import { history } from 'routers/AppRouter';
import { ADMIN_PRODUCTS } from 'constants/routes';

function* initRequest() {
  yield put({ type: LOADING, payload: true });
  yield put({ type: SET_REQUEST_STATUS, payload: null });
}

function* handleError(e) {
  yield put({ type: LOADING, payload: false });
  yield put({ type: SET_REQUEST_STATUS, payload: e });
  console.log('ERROR: ', e);
}

function* handleAction(location, message, status) {
  if (location) yield call(history.push, location);
  yield call(displayActionMessage, message, status);
}

function* productSaga({ type, payload }) {
  switch (type) {
    case GET_PRODUCTS:
      try {
        yield initRequest();
        const state = yield select();
        const result = yield call(firebase.getProducts, payload);
    
        yield put(getProductsSuccess({ 
          products: result.products, 
          lastKey: result.lastKey ? result.lastKey : state.products.lastRefKey,
          total: result.total ? result.total : state.products.total
        }));
        // yield put({ type: SET_LAST_REF_KEY, payload: result.lastKey });
        yield put({ type: LOADING, payload: false });
      } catch (e) {
        yield handleError(e);
      }
      break;
    case ADD_PRODUCT:
      try {
        yield initRequest();

        const key = yield call(firebase.generateKey);
        const downloadURL = yield call(firebase.storeImage, key, 'products', payload.image);

        yield call(firebase.addProduct, key, { ...payload, image: downloadURL });

        yield put(addProductSuccess({
          id: key,
          ...payload,
          image: downloadURL
        }));
        yield handleAction(ADMIN_PRODUCTS, 'Item succesfully added', 'success');
        yield put({ type: LOADING, payload: false });
      } catch (e) {
        yield handleError(e);
        yield handleAction(undefined, 'Item failed to add: ' + e.message_, 'error');
      }
      break;
    case EDIT_PRODUCT:
      try {
        yield initRequest();

        const { image } = payload.updates;

        if (image.constructor === File && typeof image === 'object') {
          yield call(firebase.deleteImage, payload.id);
          const downloadURL = yield call(firebase.storeImage, 'products', payload.id, image);
          const updates = { ...payload.updates, image: downloadURL };

          yield call(firebase.editProduct, payload.id, updates);
          yield put(editProductSuccess({ 
            id: payload.id, 
            updates
          }));
          
        } else {
          yield call(firebase.editProduct, payload.id, payload.updates);
          yield put(editProductSuccess({ 
            id: payload.id, 
            updates: payload.updates
          }));
          
        }

        yield handleAction(ADMIN_PRODUCTS, 'Item succesfully edited', 'success');
        yield put({ type: LOADING, payload: false });
      } catch (e) {
        yield handleError(e);
        yield handleAction(undefined, 'Item failed to edit: ' + e.message, 'error');
      }
      break;
    case REMOVE_PRODUCT:
      try {
        yield initRequest();
        yield call(firebase.removeProduct, payload);
        yield put(removeProductSuccess(payload));
        yield put({ type: LOADING, payload: false });
        yield handleAction(ADMIN_PRODUCTS, 'Item succesfully removed', 'success');
      } catch (e) {
        yield handleError(e);
        yield handleAction(undefined, 'Item failed to remove: ' + e.message, 'error');
      }
      break;
    default:
      return;
  }
}

export default productSaga;
