import {
	createStore,
	applyMiddleware,
	compose
} from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import rootReducer from 'reducers';
import rootSaga from 'sagas/rootSaga';

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
