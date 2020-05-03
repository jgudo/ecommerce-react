import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPhoneInput from 'react-phone-input-2';

import Modal from 'components/ui/Modal';
import Boundary from 'components/ui/Boundary';
import CircularProgress from 'components/ui/CircularProgress';
import ImageLoader from 'components/ui/ImageLoader';

import { displayActionMessage } from 'helpers/utils';
import { isLoading as dispatchIsLoading } from 'actions/appActions';
import { updateProfile } from 'actions/profileActions';
import useFileHandler from 'hooks/useFileHandler';
import useFieldHandler from 'hooks/useFieldHandler';
import { ACCOUNT } from 'constants/routes';

const EditProfile = (props) => {
  useEffect(() => {
    return () => {
      dispatch(dispatchIsLoading(false));
    };
  }, []);

  const { profile, auth, isLoading } = useSelector(state => ({
    profile: state.profile,
    auth: state.auth,
    isLoading: state.app.loading
  }));

  const dispatch = useDispatch();
  const { field, setField, onFieldChange, errorField } = useFieldHandler({
    fullname: profile.fullname ? profile.fullname : '',
    email: profile.email ? profile.email : '',
    address: profile.address ? profile.address : '',
    mobile: profile.mobile ? profile.mobile : '',
    avatar: profile.avatar ? profile.avatar : '',
    banner: profile.banner ? profile.banner : '',
  });

  useEffect(() => {
    setField(profile);
  }, [profile]);

  const [isOpenModal, setModalOpen] = useState(false);
  const [password, setPassword] = useState(null);
  const { 
    imageFile, 
    setImageFile, 
    isFileLoading, 
    onFileChange 
  } = useFileHandler({ avatar: {}, banner: {} });

  const onEmailChange = (e) => onFieldChange(e, 'email', false);

  const onFullNameChange = (e) => onFieldChange(e, 'fullname', false);

  const onAddressChange = (e) => onFieldChange(e, 'address', true);

  const onMobileChange = (mob, data) => onFieldChange(mob, 'mobile', true, data);

  const onCloseModal = () => setModalOpen(false);

  const onPasswordInput = (e) => setPassword(e.target.value.trim());

  const onConfirmUpdate = () => {
    if (password) {
      dispatch(updateProfile({ 
        updates: field,
        files: { 
          bannerFile: imageFile.banner.file, 
          avatarFile: imageFile.avatar.file 
        },
        credentials: { email: field.email, password }
      }));

      setModalOpen(false);
    }
  };

  const onSubmitUpdate = () => {
    const noError = Object.keys(errorField).every(key => errorField[key] === '');
    const allFieldsFilled = Object.keys(field).some(key => profile[key] !== field[key]);
    const filesUpdated = imageFile.banner.file || imageFile.avatar.file

    if (noError) {
      if (field.email !== profile.email) {
        setModalOpen(true);
      } else if (allFieldsFilled || filesUpdated) {
        dispatch(updateProfile({ 
          updates: field,
          files: { 
            bannerFile: imageFile.banner.file, 
            avatarFile: imageFile.avatar.file 
          },
          credentials: {}
        }));
      }
    }
  };

  const errorClassName = (key) => {
    return errorField[key] ? 'input-error' : '';
  };

  return (
    <Boundary>
      <div className="edit-user">
        <h3 className="text-center">Edit Account Details</h3>
        <div className="user-profile-banner">
          <div className="user-profile-banner-wrapper">
            <ImageLoader  
                alt="Banner"
                className="user-profile-banner-img"
                src={imageFile.banner.url || field.banner} 
            />
            <input 
                accept="image/x-png,image/jpeg"
                disabled={isLoading}
                id="edit-banner"
                hidden
                onChange={(e) => onFileChange(e, 'banner')}
                type="file" 
            />
            {isFileLoading ? (
              <div className="loading-wrapper">
                <CircularProgress visible={true} theme="light" />
              </div>
            ) : (
              <div className="edit-wrapper">
                  <label 
                      className="edit-button edit-banner-button"
                      htmlFor="edit-banner"
                  >
                    Change
                </label>
              </div>
            )}
          </div>
          <div className="user-profile-avatar-wrapper">
            <ImageLoader 
                alt="Avatar"
                className="user-profile-img"
                src={imageFile.avatar.url || field.avatar} 
            />
            <input 
                accept="image/x-png,image/jpeg"
                id="edit-avatar"
                disabled={isLoading}
                hidden
                onChange={(e) => onFileChange(e, 'avatar')}
                type="file" 
            />
            {isFileLoading ? (
              <div className="loading-wrapper">
                <CircularProgress visible={true} theme="light" />
              </div>
            ) : (
              <div className="edit-wrapper">
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
          {errorField.fullname ? <span className="input-message">{errorField.fullname}</span> : (
            <span className="d-block padding-s">Full Name</span>
          )}
          <input 
              className={`input-form d-block ${errorClassName('fullname')}`}
              maxLength={30}
              onChange={onFullNameChange}
              placeholder="Full Name"
              readOnly={isLoading}
              style={{ textTransform: 'capitalize' }}
              type="text"
              value={field.fullname}
          />
          {errorField.email ? <span className="input-message">{errorField.email}</span> : (
            <span className="d-block padding-s">Email</span>
          )}
          <input 
              className={`input-form d-block ${errorClassName('email')}`}
              maxLength={40}
              onChange={onEmailChange}
              placeholder="test@example.com"
              readOnly={auth.provider !== 'password' || isLoading}
              type="email"
              value={field.email}
          />
          <span className="d-block padding-s">Shipping Address</span>
          <input 
              className={`input-form d-block`}
              maxLength={120}
              placeholder="eg: #245 Brgy. Maligalig, Arayat Pampanga, Philippines"
              onChange={onAddressChange}
              readOnly={isLoading}
              type="text"
              value={field.address}
          />
          {errorField.mobile && <span className="input-message">{errorField.mobile}</span>}
          <span className="d-block padding-s">Mobile</span>
          <ReactPhoneInput 
              defaultCountry={'ph'} 
              disabled={isLoading}
              inputExtraProps={{ required: true }}
              inputClass={`input-form d-block ${errorClassName('mobile')}`}
              masks={{'ph': '+.. .... ... ....'}}
              onChange={onMobileChange}
              placeholder="09264538861"
              value={field.mobile} 
          />
          <br/>
          <div className="edit-user-action">
            <button
                className="button button-muted w-100-mobile"
                disabled={isLoading}
                onClick={() => props.history.push(ACCOUNT)}
            >
              Back to Profile
            </button>
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
      <Modal 
          isOpen={isOpenModal}
          onRequestClose={onCloseModal}
      >
        <div className="text-center padding-l">
          <h4>Confirm Update</h4>
          <p>
            To continue updating profile including your &nbsp;
            <strong>email</strong>,
            <br/> 
            please confirm by entering your password
          </p>
          <input 
              className="input-form d-block"
              onChange={onPasswordInput}
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
    </Boundary>
  );
};

export default EditProfile;
