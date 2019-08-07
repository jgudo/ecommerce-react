import React from 'react';

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
  </div>
);

export default UserNav;
