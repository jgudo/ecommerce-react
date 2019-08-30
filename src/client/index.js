import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import firebase from './firebase/firebase';
import 'normalize.css/normalize.css';
import 'react-phone-input-2/dist/style.css';
import './styles/style.scss';
import WebFont from 'webfontloader';
import App from './App';
import AppRouter from './routers/AppRouter';
import Preloader from './components/ui/Preloader';
import configureStore from './store/store';
import { onAuthStateSuccess, onAuthStateFail } from './actions/authActions';

WebFont.load({
  google: {
    families: ['Tajawal']
  }
});

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then((registration) => {
    console.log('SW registered: ', registration);
  }).catch((registrationError) => {
    console.log('SW registration failed: ', registrationError);
  });
}

const { store, persistor } = configureStore();
ReactDOM.render(<Preloader />, document.getElementById('app'));


firebase.auth.onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
    store.dispatch(onAuthStateSuccess(user));
  } else {
    store.dispatch(onAuthStateFail('Fail'));
  }

  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={<Preloader />} persistor={persistor}>
        <AppRouter />
      </PersistGate>
    </Provider>, 
    document.getElementById('app')
  );
  
});

// ReactDOM.render(
//   <Provider store={store}>
//     <PersistGate loading={<Preloader />} persistor={persistor}>
//       <AppRouter />
//     </PersistGate>
//   </Provider>, 
//   document.getElementById('app')
// );