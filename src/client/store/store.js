import { 
  createStore, 
  combineReducers, 
  applyMiddleware, 
  compose
} from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga';
import productReducer from '../reducers/productReducer';
import basketReducer from '../reducers/basketReducer';
import authReducer from '../reducers/authReducer';
import profileReducer from '../reducers/profileReducer';
import filterReducer from '../reducers/filterReducer';
import userReducer from '../reducers/userReducer';
import appReducer from '../reducers/appReducer';

import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const authPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'profile', 'basket']
}

const rootReducer = {
  products: productReducer,
  basket: basketReducer,
  auth: authReducer,
  profile: profileReducer,
  filter: filterReducer,
  users: userReducer,
  app: appReducer,
}

export default () => {
  const store = createStore(
    persistCombineReducers(authPersistConfig, rootReducer),
    composeEnhancer(applyMiddleware(sagaMiddleware))
  );
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return { store, persistor };
};
