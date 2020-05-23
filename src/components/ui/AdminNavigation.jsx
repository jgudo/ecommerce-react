import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import UserAvatar from 'views/account/components/UserAvatar';
import CircularProgress from './CircularProgress';
import { ADMIN_DASHBOARD } from 'constants/routes';
 
const AdminNavigation = () => {
  const { isAuthenticating, profile } = useSelector(state => ({
    isAuthenticating: state.app.isAuthenticating,
    profile: state.profile
  }));

  return (
    <nav className="navigation navigation-admin">
      <div className="logo">
        <Link to={ADMIN_DASHBOARD}>
          <h2>ADMIN PANEL</h2>
        </Link>
      </div>
      <ul className="navigation-menu">
        <li className="navigation-menu-item">
          <UserAvatar 
              isAuthenticating={isAuthenticating} 
              profile={profile} 
          />
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavigation;
