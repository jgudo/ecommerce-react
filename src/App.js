import React, { StrictMode, useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppRouter from 'routers/AppRouter';
import Preloader from 'components/ui/Preloader';
import ReactGA from "react-ga";


const App = ({ store, persistor }) => {
	useEffect(()=>{
		ReactGA.initialize('UA-128284894-4')
	}, [])
	return(
	<StrictMode>
		<Provider store={store}>
			<PersistGate loading={<Preloader />} persistor={persistor}>
				<AppRouter />
			</PersistGate>
		</Provider>
	</StrictMode>
)};

export default App;
