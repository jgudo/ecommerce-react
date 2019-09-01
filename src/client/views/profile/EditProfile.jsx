import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPhoneInput from 'react-phone-input-2';
import Modal from '../../components/ui/Modal';
import CircularProgress from '../../components/ui/CircularProgress';

import { displayActionMessage } from '../../helpers/utils';
import { updateEmail, updateProfile } from '../../actions/profileActions';

const EditProfile = (props) => {
  const { profile, auth, isLoading } = useSelector(state => ({
    profile: state.profile,
    auth: state.auth,
    isLoading: state.app.loading
  }));
  const dispatch = useDispatch();
  const [user, setProfile] = useState({
    fullname: profile.fullname ? profile.fullname : '',
    email: profile.email ? profile.email : '',
    address: profile.address ? profile.address : '',
    mobile: profile.mobile ? profile.mobile : '',
    avatar: profile.avatar ? profile.avatar : '',
    banner: profile.banner ? profile.banner : '',
  });
  const [isOpenModal, setModalOpen] = useState(false);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState({});
  const [imageFile, setImageFile] = useState({});
  const [password, setPassword] = useState(null);

  const handleFile = (e, field) => {
    const val = e.target.value;
    const img = e.target.files[0];
    const size = img.size / 1024 / 1024;
    const regex = /(\.jpg|\.png)$/i;

    setLoading({ ...loading, [field]: true });

    if (!regex.exec(val)) {
      displayActionMessage('File type must be JPEG or PNG', 'error');
      setLoading({ ...loading, [field]: false });
    } else if (size > 1) {
      displayActionMessage('File size exceeds 1MB', 'error');
      setLoading({ ...loading, [field]: false });
    } else {
      const reader = new FileReader();
      reader.addEventListener('load', (e) => {
        setProfile({ ...user, [field]: e.target.result });
        setImageFile({ ...imageFile, [field]: img });
        setLoading({ ...loading, [field]: false });
      });
      reader.readAsDataURL(img);
    }
  }

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
    const val = e.target.value.replace(/[^a-zA-Z\s]/g, '').trimStart();

    setProfile({ ...user, fullname: val });

    if (user.fullname === '') {
      setError({ ...error, fullname: 'Full name is required' });
    } else if (user.fullname.length < 5) {
      setError({ ...error, fullname: 'Full name must be at least 5 letters' });
    } else {
      setError({ ...error, fullname: '' });
    }
  };

  const onAddressChange = (e) => {
    const val = e.target.value.trimStart();
    setProfile({ ...user, address: val });
  };

  const onMobileChange = (mob, data) => {
    const mobile = mob.replace(/[^0-9]+/g,'').slice(data.dialCode.length);
    const len = mobile.toString().length;
    setProfile({ ...user, mobile});

    if (!user.mobile) {
      setError({ ...error, mobile: 'Mobile number is required' });
    } else if (len <= 9) {
      setError({ ...error, mobile: 'Mobile number invalid' });
    }else {
      setError({ ...error, mobile: '' });
    }
  };

  const onCloseModal = () => {
    setModalOpen(false);
  };

  const onPassworInput = (e) => {
    setPassword(e.target.value.trim());
  };

  const onConfirmUpdate = () => {
    if (password) {
      dispatch(updateProfile({ 
        updates: { ...user },
        files: { bannerFile: imageFile.banner, avatarFile: imageFile.avatar },
        credentials: { email: user.email, password }
      }));
      setModalOpen(false);
    }
  };

  const onSubmitUpdate = () => {
    if (Object.keys(error).every(key => error[key] === '')) {
      if (user.email !== profile.email) {
        setModalOpen(true);
      } else if (Object.keys(user).some(key => profile[key] !== user[key])) {
        dispatch(updateProfile({ 
          updates: { ...user },
          files: { bannerFile: imageFile.banner, avatarFile: imageFile.avatar },
          credentials: {}
        }));
      }
    }
  };

  const errorClassName = (field) => {
    return error[field] ? 'input-error' : '';
  };

  return (
    <div className="edit-user">
      <Modal 
          isOpen={isOpenModal}
          onRequestClose={onCloseModal}
      >
        <div className="text-center padding-l">
          <h4>Confirm Update</h4>
          <p>To continue updating profile including your <strong>email</strong>, <br/> please confirm by entering your password</p>
          <input 
              className="input-form d-block"
              onChange={onPassworInput}
              placeholder="Enter your password"
              type="password"
          />
        </div>
        <br/>
        <div className="d-flex-center">
        <button 
            className="button"
            onClick={onConfirmUpdate}
        >
          Confirm
        </button>
        </div>
        <button 
            className="modal-close-button button button-border button-border-gray button-small"
            onClick={onCloseModal}
        >
          X
        </button>
      </Modal>
      <h3 className="text-center">Update Your Profile</h3>
      <div className="user-profile-banner">
        <div className="user-profile-banner-wrapper">
          <img 
              alt="Banner"
              className="user-profile-banner-img"
              src={user.banner} 
          />
          <input 
              accept="image/x-png,image/jpeg"
              disabled={isLoading}
              id="edit-banner"
              hidden
              onChange={(e) => handleFile(e, 'banner')}
              type="file" 
          />
          {loading.banner ? (
            <div className="loading-wrapper">
              <CircularProgress visible={true} theme="light" />
            </div>
          ) : (
            <div className="edit-button-wrapper">
                <label 
                    className="edit-button edit-banner-button"
                    htmlFor="edit-banner"
                >
                  Change
              </label>
            </div>
          )}
        </div>
        <div className="user-profile-img-wrapper">
          <img 
              alt="Avatar"
              className="user-profile-img"
              src={user.avatar} 
          />
          <input 
              accept="image/x-png,image/jpeg"
              id="edit-avatar"
              disabled={isLoading}
              hidden
              onChange={(e) => handleFile(e, 'avatar')}
              type="file" 
          />
          {loading.avatar ? (
            <div className="loading-wrapper">
              <CircularProgress visible={true} theme="light" />
            </div>
          ) : (
            <div className="edit-button-wrapper">
                <label 
                    className="edit-button edit-avatar-button"
                    htmlFor="edit-avatar"
                >
                  Change
              </label>
            </div>
          )}
        </div>
      </div>
      <div className="user-profile-details">
        {error.fullname && <span className="input-message">{error.fullname}</span>}
        <span className="d-block padding-s">Full Name</span>
        <input 
            className={`input-form d-block ${errorClassName('fullname')}`}
            maxLength={30}
            onChange={onFullNameChange}
            placeholder="Full Name"
            readOnly={isLoading}
            style={{ textTransform: 'capitalize' }}
            type="text"
            value={user.fullname}
        />
        {error.email && <span className="input-message">{error.email}</span>}
        <span className="d-block padding-s">Email</span>
        <input 
            className={`input-form d-block ${errorClassName('email')}`}
            maxLength={40}
            onChange={onEmailChange}
            placeholder="Email"
            readOnly={auth.provider !== 'password' || isLoading}
            type="email"
            value={user.email}
        />
        <span className="d-block padding-s">Address</span>
        <input 
            className={`input-form d-block`}
            maxLength={120}
            placeholder="Complete Address"
            onChange={onAddressChange}
            readOnly={isLoading}
            type="text"
            value={user.address}
        />
        {error.mobile && <span className="input-message">{error.mobile}</span>}
        <span className="d-block padding-s">Mobile</span>
        <ReactPhoneInput 
            defaultCountry={'ph'} 
            disabled={isLoading}
            inputExtraProps={{ required: true }}
            inputClass={`input-form d-block ${errorClassName('mobile')}`}
            masks={{'ph': '+.. .... ... ....'}}
            onChange={onMobileChange}
            placeholder="09264538861"
            value={user.mobile} 
        />
        <br/>
        <div>
          <button
              className="button w-100-mobile"
              disabled={isLoading}
              onClick={onSubmitUpdate}
          >
            <CircularProgress visible={isLoading} theme="light" />
            {isLoading ? 'Updating Profile' : 'Update Profile'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
