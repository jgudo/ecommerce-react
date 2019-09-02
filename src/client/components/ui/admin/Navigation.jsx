import React from 'react';
import { Link } from 'react-router-dom';

import SignOut from '../../auth/SignOut';

const AdminNavigation = () => {
  return (
    <nav className="navigation navigation-admin">
      <div className="logo">
        <Link to="/dashboard">
          <h2>DASHBOARD</h2>
        </Link>
      </div>
      <ul className="navigation-menu">
        <li className="navigation-menu-item">
          <SignOut>
           {({ onSignOut }) => (
               <button 
                    className="button button-small"
                    onClick={onSignOut}
                >
                  Sign Out
                </button>
           )} 
          </SignOut>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavigation;
