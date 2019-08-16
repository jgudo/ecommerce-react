import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/style.scss';
import WebFont from 'webfontloader';
import App from './App';
import configureStore from './store/store';
import { onAuthStateChanged } from './actions/authActions';

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

const store = configureStore();
store.dispatch(onAuthStateChanged());

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('app'));
