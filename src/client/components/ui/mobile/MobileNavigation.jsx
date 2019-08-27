import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BasketToggle from '../../basket/BasketToggle';
import Badge from '../Badge';
import UserNav from '../../../views/profile/UserAvatar';

const Navigation = ({ path }) => {
  const { basket, isAuthenticating, profile, isAuth} = useSelector(state => ({
    basket: state.basket,
    isAuthenticating: state.app.isAuthenticating,
    profile: state.profile,
    isAuth: !!state.auth.id && !!state.auth.type
  }));

  return (
    <nav className="mobile-navigation">
      <div className="mobile-navigation-main"> 
        <div className="mobile-navigation-logo">
          <Link to="/">
            <h3 className="margin-0 color-light">SALINAKA</h3>
          </Link>
        </div>
        <div className="mobile-navigation-search">
          <Link className="d-flex" to="/search">
            <h5 className="text-subtle mobile-navigation-search-title">Search for product</h5>
            <div className="icon-magnify" />
          </Link>
        </div>
      </div>
      <ul className="mobile-navigation-menu"> 
        <BasketToggle>
          {({ onClickToggle }) => (
            <li className="basket-toggle mobile-navigation-item">
              <button 
                  className="navigation-menu-link button-link"
                  disabled={path === '/checkout/step1' || path === '/checkout/step2' || path === '/checkout/step3'}
                  onClick={onClickToggle}
              >
                <span>
                  <Badge count={basket.length}/>
                  My Basket
                </span>
              </button>
            </li>
          )}
        </BasketToggle>
        {isAuth ? (
          <li className="mobile-navigation-item">
            <UserNav isAuthenticating={isAuthenticating} profile={profile} />
          </li>
        ) : (
          <>
            {path !== '/signup' && (
              <li className="mobile-navigation-item">
                <Link 
                    className="navigation-menu-link"
                    to="/signup"
                >
                  Sign Up
                </Link>
              </li>
            )}
            {path !== '/signin' && (
              <li className="mobile-navigation-item">
                <Link 
                    className="navigation-menu-link"
                    to="/signin"
                >
                  Sign In
                </Link>
              </li>
            )}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
