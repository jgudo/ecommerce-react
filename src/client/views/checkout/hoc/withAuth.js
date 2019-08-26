import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const withAuth = (Component) => {
  return withRouter((props) => {
    const { isAuth, basket, profile } = useSelector(state => ({
      isAuth: !!state.auth.id && !!state.auth.type,
      basket: state.basket,
      profile: state.profile
    }));
    const dispatch = useDispatch();

    return (
      <>
        {!isAuth ? (
          <Redirect to="/signin" />
        ) : basket.length === 0 ? (
          <Redirect to="/" />
        ) : null}
        <Component 
            {...props} 
            basket={basket}
            dispatch={dispatch}
            profile={profile} 
        />
      </>
    );
  });
};

export default withAuth;
