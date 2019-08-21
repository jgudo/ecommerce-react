import React, { useState, useEffect } from 'react';
import AppRouter from './routers/AppRouter';
import Preloader from './components/ui/Preloader';

const App = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isLoaded, setLoaded] = useState(false);


  const timer = setTimeout(() => {
    setLoaded(true);
  }, 3000);
  
  return isLoaded ? <AppRouter /> : <Preloader />
};

export default App;
