import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppRouter from 'routers/AppRouter';
import Preloader from 'components/ui/Preloader';
import { Store } from 'redux';
import { Persistor } from 'redux-persist';

interface IProps {
	store: Store;
	persistor: Persistor;
}

const App: React.FC<IProps> = ({ store, persistor }) => (
	<StrictMode>
		<Provider store={store}>
			<PersistGate loading={<Preloader />} persistor={persistor}>
				<AppRouter />
			</PersistGate>
		</Provider>
	</StrictMode>
);

export default App;
