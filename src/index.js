import React, { StrictMode } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import firebase from './firebase/firebase';
import 'normalize.css/normalize.css';
import 'react-phone-input-2/dist/style.css';
import './styles/style.scss';
import WebFont from 'webfontloader';
import AppRouter from './routers/AppRouter';
import Preloader from './components/ui/Preloader';
import configureStore from './store/store';
import { onAuthStateSuccess, onAuthStateFail } from './actions/authActions';

WebFont.load({
  google: {
    families: ['Tajawal']
  }
});

const { store, persistor } = configureStore();
const AppRoot = () => (
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Preloader />} persistor={persistor}>
        <AppRouter />
      </PersistGate>
    </Provider>
  </StrictMode>  
);

if (window.navigator.onLine) {
  // Render the preloader on initial load
  render(<Preloader />, document.getElementById('app'));

  firebase.auth.onAuthStateChanged((user) => {
    if (user) {
      store.dispatch(onAuthStateSuccess(user));
    } else {
      store.dispatch(onAuthStateFail('Failed to authenticate'));
    }

    // then render the app after checking the auth state
    render(<AppRoot/>, document.getElementById('app'));
  });
} else {
  render((
    <div className="loader">
      <h2>:( No internet connection.</h2>
    </div>
  ), document.getElementById('app'));
}

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then((registration) => {
    console.log('SW registered: ', registration);
  }).catch((registrationError) => {
    console.log('SW registration failed: ', registrationError);
  });
}
