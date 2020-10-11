import {
	createStore,
	applyMiddleware,
	compose
} from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas/rootSaga';
<<<<<<< HEAD:src/redux/store/store.ts

declare global {
	interface Window {
		__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
	}
}
=======
>>>>>>> 8577603228250acd4278f07b4a77199e7a391d5f:src/redux/store/store.js

const sagaMiddleware = createSagaMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const authPersistConfig = {
	key: 'root',
	storage,
	whitelist: ['auth', 'profile', 'basket', 'checkout']
};

export default () => {
	const store = createStore(
		persistCombineReducers(authPersistConfig, rootReducer),
		composeEnhancer(applyMiddleware(sagaMiddleware))
	);
	const persistor = persistStore(store);
	sagaMiddleware.run(rootSaga);
	return { store, persistor };
};
