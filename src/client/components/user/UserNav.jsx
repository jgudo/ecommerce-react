import React from 'react';
import { Link } from 'react-router-dom'; 
import SignOut from '../auth/SignOut';

const UserNav = ({ profile }) => (
  <div className="user-nav">
    <h5>{profile.firstname}</h5>
    <div className="user-nav-img-wrapper">
      <img 
          alt={profile.firstname}
          className="user-nav-img"
          src={profile.avatar} 
      />
    </div>
    <div className="user-nav-sub">
      <Link 
          to="/profile"
          className="user-nav-sub-link"
      >
        View Profile
      </Link>
      <SignOut>
        {({ onSignOut }) => (
          <span 
              className="user-nav-sub-link"
              onClick={onSignOut}
          >
            <strong>Logout</strong>
          </span>
        )}
      </SignOut>
    </div>
  </div>
);

export default UserNav;
