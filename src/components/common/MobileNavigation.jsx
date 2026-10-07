import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { BasketToggle } from '@/components/basket';
import {
  FEATURED_PRODUCTS, HOME, RECOMMENDED_PRODUCTS, SHOP, SIGNIN
} from '@/constants/routes';
import PropType from 'prop-types';
import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import UserNav from '@/views/account/components/UserAvatar';
import Badge from './Badge';
import FiltersToggle from './FiltersToggle';
import SearchBar from './SearchBar';

const Navigation = (props) => {
  const {
    isAuthenticating, basketLength, disabledPaths, user
  } = props;
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onClickLink = (e) => {
    if (isAuthenticating) e.preventDefault();
  };

  const onClickNavigationLink = (e) => {
    onClickLink(e);
    if (!isAuthenticating) setIsMenuOpen(false);
  };

  return (
    <nav className="mobile-navigation">
      <div className="mobile-navigation-main">
        <div className="mobile-navigation-logo">
          <Link onClick={onClickLink} to={HOME}>
            <h2>SALINAKA</h2>
          </Link>
        </div>

        <button
          aria-controls="mobile-navigation-routes"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="button-link mobile-navigation-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
        >
          {isMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>

        <BasketToggle>
          {({ onClickToggle }) => (
            <button
              className="button-link navigation-menu-link basket-toggle"
              onClick={onClickToggle}
              disabled={disabledPaths.includes(pathname)}
              type="button"
            >

              <Badge count={basketLength}>
                <i className="fa fa-shopping-bag" style={{ fontSize: '2rem' }} />
              </Badge>
            </button>
          )}
        </BasketToggle>
        <ul className="mobile-navigation-menu">
          {user ? (
            <li className="mobile-navigation-item">
              <UserNav />
            </li>
          ) : (
            <>
              {pathname !== SIGNIN && (
                <li className="mobile-navigation-item">
                  <Link
                    className="navigation-menu-link"
                    onClick={onClickLink}
                    to={SIGNIN}
                  >
                    Sign In
                  </Link>
                </li>
              )}
            </>
          )}
        </ul>
      </div>
      {isMenuOpen && (
        <ul className="mobile-navigation-routes" id="mobile-navigation-routes">
          <li><NavLink activeClassName="navigation-menu-active" exact onClick={onClickNavigationLink} to={HOME}>Home</NavLink></li>
          <li><NavLink activeClassName="navigation-menu-active" onClick={onClickNavigationLink} to={SHOP}>Shop</NavLink></li>
          <li><NavLink activeClassName="navigation-menu-active" onClick={onClickNavigationLink} to={FEATURED_PRODUCTS}>Featured</NavLink></li>
          <li><NavLink activeClassName="navigation-menu-active" onClick={onClickNavigationLink} to={RECOMMENDED_PRODUCTS}>Recommended</NavLink></li>
        </ul>
      )}
      <div className="mobile-navigation-sec">
        <SearchBar />
        <FiltersToggle>
          <button className="button-link button-small" type="button">
            <i className="fa fa-filter" />
          </button>
        </FiltersToggle>
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  isAuthenticating: PropType.bool.isRequired,
  basketLength: PropType.number.isRequired,
  disabledPaths: PropType.arrayOf(PropType.string).isRequired,
  user: PropType.oneOfType([
    PropType.bool,
    PropType.object
  ]).isRequired
};

export default Navigation;
