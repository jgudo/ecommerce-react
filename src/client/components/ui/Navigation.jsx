import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import BasketToggle from '../basket/BasketToggle';
import Badge from './Badge';
import UserNav from '../user/UserNav';

const Navigation = (props) => {
  const { basket, profile, isAuth } = props;
  const navbar = useRef(null);
  const getStyleProperty = (property) => {
    return getComputedStyle(document.documentElement).getPropertyValue(property);
  };

  document.addEventListener('scroll', () => {
    if (navbar.current) {
      if (window.pageYOffset === 0) {
        navbar.current.style.background = getStyleProperty('--nav-bg');
        navbar.current.style.boxShadow = 'none';
      } else {
        navbar.current.style.background = getStyleProperty('--nav-bg-scrolled');
        navbar.current.style.boxShadow = getStyleProperty('--nav-bg-shadow');
      }
    }
  });

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
            <UserNav profile={profile} />
          </li>
        ) : document.location.pathname !== '/signin' ? (
          <li className="navigation-menu-item">
            <NavLink 
                activeClassName="navigation-menu-active"
                className="button button-small margin-left-xxl"
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

export default withRouter(connect(mapStateToProps)(Navigation));
