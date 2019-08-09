import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import AdminNavigation from '../components/admin/dashboard/components/Navigation';
import SideNavigation from '../components/admin/dashboard/components/SideNavigation'

const AdminRoute = ({ isAuth, component: Component, ...rest }) => (
  <Route 
      {...rest} 
      component={props => (
        isAuth ? (
          <>
            <AdminNavigation />
            <main className="content-admin">
              <SideNavigation />
              <div className="content-admin-wrapper">
                <Component {...props} />
              </div>
            </main>
          </>
        ) : <Redirect to="/" /> 
      )}
  />
);

const mapStateToProps = ({ auth }) => ({
  isAuth: !!auth.id && auth.type === 'admin'
});

export default connect(mapStateToProps)(AdminRoute);
