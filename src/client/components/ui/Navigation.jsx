import React from 'react';
import { NavLink } from 'react-router-dom';
import BasketToggle from '../basket/BasketToggle';

const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="logo">
        <h2>SALINAKA</h2>
      </div>
      <ul className="navigation-menu">
        <li className="navigation-menu-item">
          <NavLink 
              className="navigation-menu-link"
              exact
              to="/" 
          >
            Store
          </NavLink>
        </li>
        <li className="navigation-menu-item">
          <NavLink 
              className="navigation-menu-link"
              exact
              to="/profile" 
          >
            Account
          </NavLink>
        </li>
        <li className="navigation-menu-item">
          <BasketToggle>
             {({ onClickToggle }) => (
               <a href="" className="navigation-menu-link" onClick={onClickToggle}>Basket</a>
             )}
          </BasketToggle>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
