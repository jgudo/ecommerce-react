import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Basket from 'components/basket/Basket';
import Navigation from 'components/ui/Navigation';
import Footer from 'components/ui/Footer';

import { SIGNIN, ADMIN_DASHBOARD } from 'constants/routes';

const PrivateRoute = ({ isAuth, userType, component: Component, path, ...rest }) => (
  <Route  
      {...rest} 
      component={props => (
        isAuth && userType === 'USER' 
        ? (
          <>
            <Navigation path={path} isAuth={isAuth} />
            <Basket isAuth={isAuth} />
            <main className="content">
              <Component {...props} />
            </main>
            <Footer path={path}/>
          </>
        ) 
        : isAuth && userType === 'ADMIN' ? <Redirect to={ADMIN_DASHBOARD} />
        :  <Redirect to={{
                pathname: SIGNIN,
                state: { from: props.location }
              }} 
            />
      )}
  />
);

const mapStateToProps = ({ auth }) => ({
  isAuth: !!auth.id && !!auth.role,
  userType: auth.role
});

export default connect(mapStateToProps)(PrivateRoute);
