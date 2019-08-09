import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import BasketToggle from '../basket/BasketToggle';
import Badge from './Badge';
import UserNav from '../user/UserNav';

import { signOut } from '../../actions/authActions';
import { clearBasket } from '../../actions/basketActions';
import { clearProfile } from '../../actions/profileActions';

const Navigation = (props) => {
  const { 
    basket, 
    profile, 
    isAuth, 
    dispatchSignOut,
    dispatchClearBasket,
    dispatchClearProfile 
  } = props;
  const navbar = useRef(null);

  document.addEventListener('scroll', () => {
    if (navbar.current) {
      if (window.pageYOffset === 0) {
        navbar.current.style.background = getComputedStyle(document.documentElement).getPropertyValue('--nav-bg');
      } else {
        navbar.current.style.background = getComputedStyle(document.documentElement).getPropertyValue('--nav-bg-scrolled');
      }
    }
  });

  const onSignOut = () => {
    dispatchSignOut();
    dispatchClearBasket();
    dispatchClearProfile();
    props.history.push('/signin');
  };

  return (
    <nav 
        className="navigation"
        ref={navbar}
    >
      <div className="logo">
        <h2>SALINAKA</h2>
      </div>
      <ul className="navigation-menu">
        <li className="navigation-menu-item">
          <NavLink 
              activeClassName="navigation-menu-active"
              className="navigation-menu-link"
              exact
              to="/" 
          >
            Store
          </NavLink>
        </li>
        <li className="navigation-menu-item">
          <BasketToggle>
             {({ onClickToggle }) => (
                <a href="" className="navigation-menu-link" onClick={onClickToggle}>
                  <Badge count={basket.length}/>
                  Basket
                </a>
             )}
          </BasketToggle>
        </li>
        {isAuth ? (
          <li className="navigation-menu-item">
            <UserNav profile={profile} onSignOut={onSignOut}/>
          </li>
        ) : document.location.pathname !== '/signin' ? (
          <li className="navigation-menu-item">
            <NavLink 
                activeClassName="navigation-menu-active"
                className="navigation-menu-link button-border button-border-gray margin-left-xxl"
                exact
                to="/signin" 
            >
              Sign In
            </NavLink>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

const mapStateToProps = ({ basket, profile, auth }) => ({
  basket,
  profile,
  auth,
  isAuth: !!auth.id && !!auth.type
});

const mapDispatchToProps = dispatch => ({
  dispatchSignOut: () => dispatch(signOut()),
  dispatchClearBasket: () => dispatch(clearBasket()),
  dispatchClearProfile: () => dispatch(clearProfile())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));
