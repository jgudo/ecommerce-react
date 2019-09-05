import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Basket from '../components/basket/basket';
// ui
import Navigation from '../components/ui/Navigation';
import Footer from '../components/ui/Footer';

import { SIGNIN } from '../constants/routes';

const PrivateRoute = ({ isAuth, userType, component: Component, path, ...rest }) => (
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
                pathname: SIGNIN,
                state: { from: props.location }
              }} 
            />
      )}
  />
);

const mapStateToProps = ({ auth }) => ({
  isAuth: !!auth.id && !!auth.type,
  userType: auth.type
});

export default connect(mapStateToProps)(PrivateRoute);
