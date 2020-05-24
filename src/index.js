import React from 'react';
import { render } from 'react-dom';

import 'normalize.css/normalize.css';
import 'react-phone-input-2/lib/style.css';
import 'styles/style.scss';

import WebFont from 'webfontloader';
import App from './App';
import Preloader from 'components/ui/Preloader';

import firebase from './firebase/firebase';
import { onAuthStateSuccess, onAuthStateFail } from 'actions/authActions';
import configureStore from 'store/store';

WebFont.load({
  google: {
    families: ['Tajawal']
  }
});

const { store, persistor } = configureStore();
const root = document.getElementById('app');

// Render the preloader on initial load
render(<Preloader />, root);

firebase.auth.onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(onAuthStateSuccess(user));
  } else {
    store.dispatch(onAuthStateFail('Failed to authenticate'));
  }
  // then render the app after checking the auth state
  render(<App store={store} persistor={persistor} />, root);
});

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      console.log('SW registered: ', registration);
    }).catch((registrationError) => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
