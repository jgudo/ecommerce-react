import React from 'react';
import { useSelector } from 'react-redux';

const UserProfile = (props) => {
  const profile = useSelector(state => state.profile);

  return (
    <div className="user-profile">
      <div className="user-profile-block">
        <div className="user-profile-banner">
          <div className="user-profile-banner-wrapper">
            <img 
                alt="Banner"
                className="user-profile-banner-img"
                src={profile.banner} 
            />
          </div>
          <div className="user-profile-img-wrapper">
            <img 
                alt="Avatar"
                className="user-profile-img"
                src={profile.avatar} 
            />
          </div>
          <button 
              className="button button-muted button-small user-profile-edit"
              onClick={() => props.history.push('/profile/edit')}
          >
            Edit Profile
          </button>
        </div>
        <div className="user-profile-details">
          <h2 className="user-profile-name">{profile.fullname}</h2>
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
