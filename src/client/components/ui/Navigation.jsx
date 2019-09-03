import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { withRouter, NavLink, Link} from 'react-router-dom';
import BasketToggle from '../basket/BasketToggle';
import Badge from './Badge';
import UserAvatar from '../../views/profile/UserAvatar';
import MobileNavigation from './mobile/MobileNavigation';

import * as ROUTE from '../../constants/routes';

const Navigation = ({ path }) => {
  const { basketLength, profile, isAuth, isAuthenticating } = useSelector(state => ({
    basketLength: state.basket.length,
    profile: state.profile,
    isAuth: !!state.auth.id && !!state.auth.type,
    isAuthenticating: state.app.isAuthenticating
  }));
  const navbar = useRef(null);

  const getStyleProperty = (property) => {
    return getComputedStyle(document.documentElement).getPropertyValue(property);
  };

  document.addEventListener('scroll', () => {
    if (navbar.current && window.screen.width > 480) {
      if (window.pageYOffset >= 70) {
        Object.assign(navbar.current.style, {
          position: 'fixed',
          animation: 'slide-down .3s ease 1',
          animationFillMode: 'forwards',
          top: 0,
          background: getStyleProperty('--nav-bg-scrolled'),
          boxShadow: getStyleProperty('--nav-bg-shadow')
        });
      } else {
        Object.assign(navbar.current.style, {
          position: 'absolute',
          animation: 'none',
          background: getStyleProperty('--nav-bg'),
          boxShadow: 'none'
        });
      }
    }
  });

  // disable the basket toggle to these paths
  const basketDisabledPaths = [
    ROUTE.CHECKOUT_STEP_1, 
    ROUTE.CHECKOUT_STEP_2, 
    ROUTE.CHECKOUT_STEP_3,
    ROUTE.SIGNIN,
    ROUTE.SIGNUP,
    ROUTE.FORGOT_PASSWORD
  ];

  return window.screen.width <= 480 ? (
    <MobileNavigation 
        basketLength={basketLength}
        profile={profile}
        isAuth={isAuth}
        isAuthenticating={isAuthenticating}
        path={path} 
        disabledPaths={basketDisabledPaths} 
    />
  ) : (
    <nav 
        className="navigation"
        ref={navbar}
    >
      <div className="logo">
        <Link to="/">
          <h3>SALINAKA</h3>
        </Link>
      </div>
      <ul className="navigation-menu">
        <li className="navigation-menu-item">
          <NavLink 
              activeClassName="navigation-menu-active"
              className="navigation-menu-link"
              exact
              to={ROUTE.HOME} 
          >
            Home
          </NavLink>
        </li>
        <li className="navigation-menu-item">
          <BasketToggle>
            {({ onClickToggle }) => (
              <button 
                  className="button-link navigation-menu-link basket-toggle" 
                  disabled={basketDisabledPaths.includes(path)}
                  onClick={onClickToggle}
              >
                <span>
                  <Badge count={basketLength}/>
                  My Basket 
                </span>
              </button>
            )}
          </BasketToggle>
        </li>
        {isAuth ? (
          <li className="navigation-menu-item">
            <UserAvatar isAuthenticating={isAuthenticating} profile={profile} />
          </li>
        ) : (
          <li className="navigation-action">
            {(path === ROUTE.SIGNIN || path === ROUTE.HOME) && (
              <NavLink 
                  activeClassName="navigation-menu-active"
                  className="button button-small"
                  exact
                  to={ROUTE.SIGNUP} 
              >
                Sign Up
              </NavLink>
            )}
            {(path === ROUTE.SIGNUP || path === ROUTE.FORGOT_PASSWORD || path === ROUTE.HOME) && (
                <NavLink 
                    activeClassName="navigation-menu-active"
                    className="button button-small button-muted margin-left-s"
                    exact
                    to={ROUTE.SIGNIN} 
                >
                  Sign In
                </NavLink>
            )}
          </li>
        )} 
      </ul>
    </nav>
  );
};

export default withRouter(Navigation);
