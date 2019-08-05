import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// ui
import Navigation from '../components/ui/Navigation';
import Sidebar from '../components/ui/Sidebar';

const PrivateRoute = ({ 
  isAuthenticated, 
  userType, 
  component: Component, 
  ...rest 
}) => (
  <Route  
      {...rest} 
      component={props => (
        isAuthenticated && userType === 'client' 
        ? (
          <>
            <Navigation />
            <main className="content">
              <Sidebar />
              <Component {...props} />
            </main>
          </>
        ) : isAuthenticated && userType === 'admin'
        ? <Redirect to="/dashboard" />
        :  <Redirect to="/" />
      )}
  />
);

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: !!auth.id,
  userType: auth.type
});

export default connect(mapStateToProps)(PrivateRoute);
