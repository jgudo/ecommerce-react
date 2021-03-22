/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import { ADMIN_DASHBOARD, SIGNIN } from 'constants/routes';
import PropType from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({
  isAuth, role, component: Component, ...rest
}) => (
  <Route
    {...rest}
    component={(props) => (
      isAuth && role === 'USER'
        ? (
          <main className="content">
            <Component {...props} />
          </main>
        )
        : isAuth && role === 'ADMIN' ? <Redirect to={ADMIN_DASHBOARD} />
          : (
            <Redirect to={{
              pathname: SIGNIN,
              // eslint-disable-next-line react/prop-types
              state: { from: props.location }
            }}
            />
          )
    )}
  />
);

PrivateRoute.defaultProps = {
  isAuth: false,
  role: 'USER'
};

PrivateRoute.propTypes = {
  isAuth: PropType.bool,
  role: PropType.string,
  component: PropType.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  rest: PropType.any
};

const mapStateToProps = ({ auth }) => ({
  isAuth: !!auth,
  role: auth?.role || ''
});

export default connect(mapStateToProps)(PrivateRoute);
