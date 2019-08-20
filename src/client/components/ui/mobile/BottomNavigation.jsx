import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BasketToggle from '../../basket/BasketToggle';

const BottomNavigation = () => {
  const profile = useSelector(state => state.profile);

  return (
    <div className="bottom-navigation">
      <ul className="bottom-navigation-menu">
        <li className="bottom-navigation-item">
          <Link 
              className="bottom-navigation-link"
              to="/"
          >
            <div className="bottom-navigation-icon">
            </div>
             <span className="color-light">Store</span>
          </Link>
        </li>
        <BasketToggle>
          {({ onClickToggle }) => (
            <li 
                className="bottom-navigation-item"
                onClick={onClickToggle}
            >
              <div className="bottom-navigation-icon">
              </div>
              <span className="color-light">Basket</span>
            </li>
          )}
        </BasketToggle>
        <li className="bottom-navigation-item">
          <div className="bottom-navigation-icon bottom-navigation-profile">
            <img 
                alt=""
                className="bottom-navigation-img"
                src={profile.avatar} 
            />
          </div>
          <span className="color-light">Profile</span>
        </li>
      </ul>
    </div>
  );
};

export default BottomNavigation;
