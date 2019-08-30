import firebase from '../firebase/firebase';
import { call, put, cancel } from 'redux-saga/effects';

import {
  LOADING,
  SET_REQUEST_STATUS,
  GET_PRODUCTS,
  CANCEL_GET_PRODUCTS,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  REMOVE_PRODUCT
} from '../constants/constants';

import { 
  getProductsSuccess, 
  addProductSuccess, 
  editProductSuccess,
  removeProductSuccess 
} from '../actions/productActions';

import { displayActionMessage } from '../helpers/utils';
import { history } from '../routers/AppRouter';

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

function* getProducts() {
  try {
    yield initRequest();
    
    const products = yield call(firebase.getProducts);

    yield put(getProductsSuccess(products));
    yield put({ type: LOADING, payload: false });
  } catch (e) {
    yield handleError(e);
  }
}

function* productSaga({ type, payload }) {
  switch (type) {
    case GET_PRODUCTS:
      yield getProducts();
      break;
    case CANCEL_GET_PRODUCTS:
      yield cancel(getProducts);
      console.log('Task cancelled');
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
        yield handleAction('/dashboard/products', 'Item succesfully added', 'success');
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

        yield handleAction('/dashboard/products', 'Item succesfully edited', 'success');
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
        yield handleAction('/dashboard/products', 'Item succesfully removed', 'success');
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
