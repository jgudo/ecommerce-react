import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Basket from '../components/basket/basket';
// ui
import Navigation from '../components/ui/Navigation';
import Footer from '../components/ui/Footer';

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { isAuth, userType } = useSelector(state => ({
    isAuth: !!state.auth.id && !!state.auth.type,
    userType: state.auth.type
  }));

  return (
    <Route  
        {...rest} 
        component={props => (
          isAuth && userType === 'client' 
          ? (
            <>
              <Navigation path={path} />
              <Basket />
              <main className="content">
                <Component {...props} />
              </main>
              <Footer path={path}/>
            </>
          ) 
          : isAuth && userType === 'admin' ? <Redirect to="/dashboard" />
          :  <Redirect to={{
                  pathname: '/signin',
                  state: { from: props.location }
                }} 
              />
        )}
    />
  );
};

export default PrivateRoute;
