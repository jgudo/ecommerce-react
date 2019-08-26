import firebase from '../firebase/firebase';
import { call, put, cancel } from 'redux-saga/effects';
import * as ACTION from '../constants/constants';
import { displayActionMessage } from '../helpers/utils';
import { history } from '../routers/AppRouter';

function* initRequest() {
  yield put({ type: ACTION.LOADING, payload: true });
  yield put({ type: ACTION.SET_REQUEST_STATUS, payload: null });
}

function* handleError(e) {
  yield put({ type: ACTION.LOADING, payload: false });
  yield put({ type: ACTION.SET_REQUEST_STATUS, payload: e });
  console.log('ERROR: ', e);
}

function* handleAction(location, message) {
  if (location) yield call(history.push, location);
  yield call(displayActionMessage, message);
}

function* getProducts() {
  try {
    yield initRequest();
    
    const products = yield call(firebase.getProducts);

    yield put({ type: ACTION.GET_PRODUCTS_SUCCESS, payload: products });
    yield put({ type: ACTION.LOADING, payload: false });
  } catch (e) {
    yield handleError(e);
  }
}

function* productSaga({ type, payload }) {
  switch (type) {
    case ACTION.GET_PRODUCTS:
      yield getProducts();
      break;
    case ACTION.CANCEL_GET_PRODUCTS:
      yield cancel(getProducts);
      console.log('Task cancelled');
      break;
    case ACTION.ADD_PRODUCT:
      try {
        yield initRequest();

        const key = yield call(firebase.generateKey);
        const downloadURL = yield call(firebase.storeImage, key, payload.image);

        yield call(firebase.addProduct, key, {
          ...payload, 
          image: downloadURL
        });

        yield put({ type: ACTION.ADD_PRODUCT_SUCCESS, payload: {
          id: key,
          ...payload,
          image: downloadURL
        }});
        yield handleAction('/dashboard/products', 'Item succesfully added');
        yield put({ type: ACTION.LOADING, payload: false });
      } catch (e) {
        yield handleError(e);
        yield handleAction(undefined, 'Item failed to add: ' + e.message_);
      }
      break;
    case ACTION.EDIT_PRODUCT:
      try {
        yield initRequest();

        const { image } = payload.updates;

        if (image.constructor === File && typeof image === 'object') {
          yield call(firebase.deleteImage, payload.id);
          const downloadURL = yield call(firebase.storeImage, payload.id, image);
          const updates = { ...payload.updates, image: downloadURL };

          yield call(firebase.editProduct, payload.id, updates);
          yield put({ type: ACTION.EDIT_PRODUCT_SUCCESS, payload: { 
            id: payload.id, 
            updates
          }});
          
        } else {
          yield call(firebase.editProduct, payload.id, payload.updates);
          yield put({ type: ACTION.EDIT_PRODUCT_SUCCESS, payload: { 
            id: payload.id, 
            updates: payload.updates
          }});
          
        }

        yield handleAction('/dashboard/products', 'Item succesfully edited');
        yield put({ type: ACTION.LOADING, payload: false });
      } catch (e) {
        yield handleError(e);
        yield handleAction(undefined, 'Item failed to edit: ' + e.message_);
      }
      break;
    case ACTION.REMOVE_PRODUCT:
      try {
        yield initRequest();
        yield call(firebase.removeProduct, payload);
        yield put({ type: ACTION.REMOVE_PRODUCT_SUCCESS, payload });
        yield put({ type: ACTION.LOADING, payload: false });
        yield handleAction('/dashboard/products', 'Item succesfully removed');
      } catch (e) {
        yield handleError(e);
        yield handleAction(undefined, 'Item failed to remove: ' + e.message_);
      }
      break;
    default:
      return;
  }
}

export default productSaga;
