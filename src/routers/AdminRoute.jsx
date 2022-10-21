/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { AdminNavigation, AdminSideBar } from '@/components/common';
import PropType from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const AdminRoute = ({
  isAuth, role, component: Component, ...rest
}) => (
  <Route
    {...rest}
    component={(props) => (
      isAuth && role === 'ADMIN' ? (
        <>
          <AdminNavigation />
          <main className="content-admin">
            <AdminSideBar />
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
  isAuth: !!auth,
  role: auth?.role || ''
});

AdminRoute.defaultProps = {
  isAuth: false,
  role: 'USER'
};

AdminRoute.propTypes = {
  isAuth: PropType.bool,
  role: PropType.string,
  component: PropType.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  rest: PropType.any
};

export default connect(mapStateToProps)(AdminRoute);
