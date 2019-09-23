import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import AdminNavigation from 'components/ui/admin/Navigation';
import SideNavigation from 'components/ui/admin/SideNavigation'

const AdminRoute = ({ component: Component, ...rest }) => {
  const isAuth = useSelector(state => !!state.auth.id && state.auth.type === 'admin');

  return (
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
}; 

export default AdminRoute;
