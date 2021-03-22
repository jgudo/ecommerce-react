/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import { ADMIN_DASHBOARD, SIGNIN, SIGNUP } from 'constants/routes';
import PropType from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PublicRoute = ({
  isAuth, role, component: Component, path, ...rest
}) => (
  <Route
    {...rest}
    // eslint-disable-next-line consistent-return
    render={(props) => {
      // eslint-disable-next-line react/prop-types
      const { from } = props.location.state || { from: { pathname: '/' } };

      if (isAuth && role === 'ADMIN') {
        return <Redirect to={ADMIN_DASHBOARD} />;
      }

      if ((isAuth && role === 'USER') && (path === SIGNIN || path === SIGNUP)) {
        return <Redirect to={from} />;
      }

      return (
        <main className="content">
          <Component {...props} />
        </main>
      );
    }}
  />
);

PublicRoute.defaultProps = {
  isAuth: false,
  role: 'USER',
  path: '/'
};

PublicRoute.propTypes = {
  isAuth: PropType.bool,
  role: PropType.string,
  component: PropType.func.isRequired,
  path: PropType.string,
  // eslint-disable-next-line react/require-default-props
  rest: PropType.any
};

const mapStateToProps = ({ auth }) => ({
  isAuth: !!auth,
  role: auth?.role || ''
});

export default connect(mapStateToProps)(PublicRoute);
