import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Basket from '../components/basket/basket';
// ui
import Navigation from '../components/ui/Navigation';
import MobileNavigation from '../components/ui/mobile/MobileNavigation';
import Footer from '../components/ui/Footer';

const PrivateRoute = ({ 
  isAuthenticated, 
  userType, 
  component: Component, 
  path,
  ...rest 
}) => (
  <Route  
      {...rest} 
      component={props => (
        isAuthenticated && userType === 'client' 
        ? (
          <>
            {window.screen.width <= 480 ? <MobileNavigation path={path} /> : <Navigation path={path} />}
            <Basket />
            <main className="content">
              <Component {...props} />
            </main>
            <Footer />
          </>
        ) : isAuthenticated && userType === 'admin'
        ? <Redirect to="/dashboard" />
        :  <Redirect to="/signin" />
      )}
  />
);

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: !!auth.id,
  userType: auth.type
});

export default connect(mapStateToProps)(PrivateRoute);
