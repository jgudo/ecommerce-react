import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const EditProfile = (props) => {
  const profile = useSelector(state => state.profile);
  const [user, setProfile] = useState({
    fullname: profile.fullname ? profile.fullname : '',
    email: profile.email ? profile.email : '',
    address: profile.address ? profile.address : '',
    mobile: profile.mobile ? profile.mobile : '',
    avatar: profile.avatar ? profile.avatar : '',
    avatarFile: undefined,
    banner: profile.banner ? profile.banner : ''
  });

  const onAvatarChange = (e) => {
    const img = e.target.files[0];
    const url = URL.createObjectURL(img);

    console.log(url);
    setProfile({ ...user, avatar: url, avatarFile: img });
  };

  const onFullNameChange = (e) => {

  };

  const onEmailChange = (e) => {

  };

  const onAddressChange = (e) => {

  };

  const onMobileChange = (e) => {

  };

  return (
    <div className="edit-user">
      <div className="user-profile-banner">
        <div className="user-profile-banner-wrapper">
          <img 
              alt="Banner"
              className="user-profile-banner-img"
              src={user.banner} 
          />
        </div>
        <div className="user-profile-img-wrapper">
          <img 
              alt="Avatar"
              className="user-profile-img"
              src={user.avatar} 
          />
          <input 
              id="edit-avatar"
              hidden
              onChange={onAvatarChange}
              type="file" 
          />
          <label 
              className="edit-button edit-avatar-button"
              htmlFor="edit-avatar"
          >
            E
        </label>
        </div>
      </div>
      <div className="user-profile-details">
        <span className="d-block padding-s">Full Name</span>
        <input 
            className={`input-form d-block`}
            onChange={onFullNameChange}
            placeholder="Full Name"
            type="text"
            value={user.fullname}
        />
        <span className="d-block padding-s">Email</span>
        <input 
            className={`input-form d-block`}
            onChange={onEmailChange}
            placeholder="Email"
            type="email"
            value={user.email}
        />
        <span className="d-block padding-s">Address</span>
        <input 
            className={`input-form d-block`}
            placeholder="Complete Address"
            onChange={onAddressChange}
            type="text"
            value={user.address}
        />
        <span className="d-block padding-s">Mobile</span>
        <input 
            className={`input-form d-block`}
            onChange={onMobileChange}
            placeholder="Mobile Number"
            type="number"
            value={user.mobile}
        />
      </div>
    </div>
  );
};

export default EditProfile;
