import { 
  createStore, 
  combineReducers, 
  applyMiddleware, 
  compose
} from 'redux';
import productReducer from '../reducers/productReducer';
import basketReducer from '../reducers/basketReducer';
import authReducer from '../reducers/authReducer';
import profileReducer from '../reducers/profileReducer';
import filterReducer from '../reducers/filterReducer';

const middleWare = store => next => (action) => {
  console.log(store.getState());
  next(action);
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      products: productReducer,
      basket: basketReducer,
      auth: authReducer,
      profile: profileReducer,
      filter: filterReducer
    }),
    composeEnhancer(applyMiddleware(middleWare))
  );
  return store;
};
