import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const AdminRoute = ({ isAuth, component: Component, ...rest }) => (
  <Route 
      {...rest} 
      component={props => (
        isAuth ? <Component {...props} /> : <Redirect to="/" /> 
      )}
  />
);

const mapStateToProps = ({ auth }) => ({
  isAuth: !!auth.id && auth.type === 'admin'
});

export default connect(mapStateToProps)(AdminRoute);
