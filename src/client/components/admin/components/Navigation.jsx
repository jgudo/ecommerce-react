import React from 'react';
import { Link } from 'react-router-dom';

import SignOut from '../../auth/SignOut';

const AdminNavigation = () => {
  return (
    <nav className="navigation background-dark padding-left-l">
      <div className="logo">
        <Link to="/dashboard">
          <h2 className="color-light">DASHBOARD</h2>
        </Link>
      </div>
      <ul className="navigation-menu">
        <li className="navigation-menu-item">
          <SignOut>
           {({ onSignOut }) => (
               <button 
                    className="button button-small color-light"
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
