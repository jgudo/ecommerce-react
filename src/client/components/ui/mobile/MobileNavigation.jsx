import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BasketToggle from '../../basket/BasketToggle';
import Badge from '../Badge';
import UserNav from '../../user/UserNav';

const Navigation = () => {
  const { basket, isAuthenticating, profile} = useSelector(state => ({
    basket: state.basket,
    isAuthenticating: state.app.isAuthenticating,
    profile: state.profile
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
          <h5 className="text-subtle mobile-navigation-search-title">Search for product</h5>
          <div className="icon-magnify" />
        </div>
      </div>
      <ul className="mobile-navigation-menu"> 
        <BasketToggle>
          {({ onClickToggle }) => (
            <li 
                className="mobile-navigation-item"
                onClick={onClickToggle}
            >
              <a href="" className="navigation-menu-link">
                <Badge count={basket.length}/>
                My Basket
              </a>
            </li>
          )}
        </BasketToggle>
        <li className="mobile-navigation-item">
          <UserNav isAuthenticating={isAuthenticating} profile={profile} />
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
