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
  const [error, setError] = useState({});

  const onAvatarChange = (e) => {
    const img = e.target.files[0];
    const url = URL.createObjectURL(img);

    console.log(url);
    setProfile({ ...user, avatar: url, avatarFile: img });
  };

  const onEmailChange = (e) => {
    const val = e.target.value.trim();
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    
    setProfile({ ...user, email: val });

    if (val === '') {
      setError({ ...error, email: 'Email is required' });
    } else if (!regex.test(val)) {
      setError({ ...error, email: 'Email is invalid' });
    } else {
      setError({ ...error, email: '' });
    }
  };

  const onFullNameChange = (e) => {
    const val = e.target.value.trimStart();
    const regex = /[a-zA-Z]{5,}/;
    
    setProfile({ ...user, fullname: val });

    if (val === '') {
      setError({ ...error, fullname: 'Full name is required' });
    } else if (!regex.test(val)) {
      setError({ ...error, fullname: 'Full name must be at least 5 letters' });
    } else {
      setError({ ...error, fullname: '' });
    }
  };

  const onAddressChange = (e) => {
    const val = e.target.value.trim();
    setProfile({ ...user, address: val });
  };

  const onMobileChange = (e) => {
    const val = e.target.value.trim();
    setProfile({ ...user, mobile: val });
  };

  const errorClassName = (field) => {
    return error[field] ? 'input-error' : '';
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
          <div className="edit-button-wrapper">
              <label 
                  className="edit-button edit-avatar-button"
                  htmlFor="edit-avatar"
              >
                Change
            </label>
          </div>
        </div>
      </div>
      <div className="user-profile-details">
        {error.fullname && <span className="input-message">{error.fullname}</span>}
        <span className="d-block padding-s">Full Name</span>
        <input 
            className={`input-form d-block ${errorClassName('fullname')}`}
            maxlength={30}
            onChange={onFullNameChange}
            placeholder="Full Name"
            style={{ textTransform: 'capitalize' }}
            type="text"
            value={user.fullname}
        />
        {error.email && <span className="input-message">{error.email}</span>}
        <span className="d-block padding-s">Email</span>
        <input 
            className={`input-form d-block ${errorClassName('email')}`}
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
