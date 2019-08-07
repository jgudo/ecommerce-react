import React from 'react';
import { connect } from 'react-redux';

const UserProfile = ({ profile }) => {
  return (
    <div className="user-profile">
      <div className="user-profile-block">
        <div className="user-profile-banner">
          <img 
              alt="Banner"
              className="user-profile-banner-img"
              src={profile.banner} 
          />
          <img 
              alt="Avatar"
              className="user-profile-img"
              src={profile.avatar} 
          />
        </div>
        <div className="user-profile-details">
          <h2>{`${profile.firstname} ${profile.lastname}`}</h2>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ profile }) => ({
  profile
});

export default connect(mapStateToProps)(UserProfile);
