import React from 'react';
import { useSelector } from 'react-redux';

const UserProfile = () => {
  const profile = useSelector(state => state.profile);

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
          <h2>{profile.fullname}</h2>
          <span>Email</span>
          <br/>
          <h5>{profile.email}</h5>
          <span>Address</span>
          <br />
          {profile.address ? (
            <h5>{profile.address}</h5>
          ) : (
            <h5 className="text-subtle text-italic">Address not set</h5>
          )}
          <span>Mobile</span>
          <br />
          {profile.mobile ? (
            <h5>{profile.mobile}</h5>
          ) : (
            <h5 className="text-subtle text-italic">Mobile not set</h5>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
