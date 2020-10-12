/* eslint-disable indent */
import { call, put, select, all } from 'redux-saga/effects';
import firebase from 'firebase/firebase';

import { EProductActionType, EMiscActionType } from 'constants/constants';

import {
	getProductsSuccess,
	addProductSuccess,
	editProductSuccess,
	removeProductSuccess
} from '../actions/productActions';

import { displayActionMessage } from 'helpers/utils';
import { history } from 'routers/AppRouter';
import { Route } from 'constants/routes';
import { IImageFile } from 'types/types';

function* initRequest() {
	yield put({ type: EMiscActionType.LOADING, payload: true });
	yield put({ type: EMiscActionType.SET_REQUEST_STATUS, payload: null });
}

function* handleError(e) {
	yield put({ type: EMiscActionType.LOADING, payload: false });
	yield put({ type: EMiscActionType.SET_REQUEST_STATUS, payload: e });
	console.log('ERROR: ', e);
}

function* handleAction(location, message, status) {
	if (location) yield call(history.push, location);
	yield call(displayActionMessage, message, status);
}

function* productSaga({ type, payload }) {
	switch (type) {
		case EProductActionType.GET_PRODUCTS:
			try {
				yield initRequest();
				const state = yield select();
				const result = yield call(firebase.getProducts, payload);

				yield put(getProductsSuccess({
					items: result.products,
					lastRefKey: result.lastKey ? result.lastKey : state.products.lastRefKey,
					total: result.total ? result.total : state.products.total
				}));
				// yield put({ type: SET_LAST_REF_KEY, payload: result.lastKey });
				yield put({ type: EMiscActionType.LOADING, payload: false });
			} catch (e) {
				yield handleError(e);
			}
			break;
		case EProductActionType.ADD_PRODUCT:
			try {
				yield initRequest();

				const { imageCollection } = payload;
				const key = yield call(firebase.generateKey);
				const downloadURL = yield call(firebase.storeImage, key, 'products', payload.image);
				const image = { id: key, url: downloadURL };
				let images = [];

				if (imageCollection.length !== 0) {
					const imageKeys = yield all(imageCollection.map(() => firebase.generateKey));
					const imageUrls = yield all(imageCollection.map((img, i) => firebase.storeImage(imageKeys[i](), 'products', img.file)));
					images = imageUrls.map((url, i) => ({
						id: imageKeys[i](),
						url
					}));
				}

				const product = {
					...payload,
					image: downloadURL,
					imageCollection: [image, ...images]
				};

				yield call(firebase.addProduct, key, product);
				yield put(addProductSuccess({
					id: key,
					...product
				}));
				yield handleAction(Route.ADMIN_PRODUCTS, 'Item succesfully added', 'success');
				yield put({ type: EMiscActionType.LOADING, payload: false });
			} catch (e) {
				yield handleError(e);
				yield handleAction(undefined, `Item failed to add: ${e.message_}`, 'error');
			}
			break;
		case EProductActionType.EDIT_PRODUCT:
			try {
				yield initRequest();

				const { image, imageCollection } = payload.updates;
				let newUpdates = { ...payload.updates };

				if (image.constructor === File && typeof image === 'object') {
					try {
						yield call(firebase.deleteImage, payload.id);
					} catch (e) {
						console.error('Cannot delete image. ', e);
					}

					const url = yield call(firebase.storeImage, payload.id, 'products', image);
					newUpdates = { ...newUpdates, image: url }; // image == thumbnail
				}

				if (imageCollection.length > 1) {
					const existingUploads: IImageFile[] = [];
					const newUploads: IImageFile[] = [];

					imageCollection.forEach((img: IImageFile) => {
						if (img.file) {
							newUploads.concat([img]);
						} else {
							existingUploads.concat([img]);
						}
					});

					const imageKeys = yield all(newUploads.map(() => firebase.generateKey));
					const imageUrls = yield all(newUploads.map((img: IImageFile, i: number) => {
						if (!img.file) throw new Error('No file supplied.');
						firebase.storeImage('products', imageKeys[i](), img.file);
					}));
					const images = imageUrls.map((url: string, i: number) => ({
						id: imageKeys[i](),
						url
					}));
					newUpdates = { ...newUpdates, imageCollection: [...existingUploads, ...images] };
				} else {
					newUpdates = { ...newUpdates, imageCollection: [{ id: new Date().getTime(), url: newUpdates.image }] };
					// add image thumbnail to image collection from newUpdates to make sure you're adding the url not the file object.
				}

				yield call(firebase.editProduct, payload.id, newUpdates);
				yield put(editProductSuccess({
					id: payload.id,
					updates: newUpdates
				}));
				yield handleAction(Route.ADMIN_PRODUCTS, 'Item succesfully edited', 'success');
				yield put({ type: EMiscActionType.LOADING, payload: false });
			} catch (e) {
				yield handleError(e);
				yield handleAction(undefined, `Item failed to edit: ${e.message}`, 'error');
			}
			break;
		case EProductActionType.REMOVE_PRODUCT:
			try {
				yield initRequest();
				yield call(firebase.removeProduct, payload);
				yield put(removeProductSuccess(payload));
				yield put({ type: EMiscActionType.LOADING, payload: false });
				yield handleAction(Route.ADMIN_PRODUCTS, 'Item succesfully removed', 'success');
			} catch (e) {
				yield handleError(e);
				yield handleAction(undefined, `Item failed to remove: ${e.message}`, 'error');
			}
			break;
		default:
			throw new Error(`Unexpected action type ${type}`);
	}
}

export default productSaga;
