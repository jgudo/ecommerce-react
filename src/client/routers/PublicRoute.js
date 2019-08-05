import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ userType, isAuth, component: Component, ...rest }) => (
  <Route 
      {...rest} 
      component={props => (
        isAuth && userType === 'admin'
        ? (
          <Redirect to="/dashboard"/>
        ) 
        : isAuth && userType === 'client'
        ? (
          <Redirect to="/"/>
        ) 
        : (
          <Component {...props} />
        )
      )}
  />
);

const mapStateToProps = ({ auth }) => ({
  isAuth: !!auth.id && !!auth.type,
  userType: auth.type
});

export default connect(mapStateToProps)(PublicRoute);
