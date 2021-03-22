/* eslint-disable react/forbid-prop-types */
import { Preloader } from 'components/common';
import PropType from 'prop-types';
import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppRouter from 'routers/AppRouter';

const App = ({ store, persistor }) => (
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Preloader />} persistor={persistor}>
        <AppRouter />
      </PersistGate>
    </Provider>
  </StrictMode>
);

App.propTypes = {
  store: PropType.any.isRequired,
  persistor: PropType.any.isRequired
};

export default App;
