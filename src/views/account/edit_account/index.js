/* eslint-disable indent */
/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-else-return */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PhoneInput from 'react-phone-input-2';

import Modal from 'components/ui/Modal';
import Boundary from 'components/ui/Boundary';
import Input from 'components/ui/Input';
import CircularProgress from 'components/ui/CircularProgress';
import ImageLoader from 'components/ui/ImageLoader';

import { setLoading } from 'redux/actions/miscActions';
import { updateProfile } from 'redux/actions/profileActions';
import useFileHandler from 'hooks/useFileHandler';
import { ACCOUNT } from 'constants/routes';
import useDocumentTitle from 'hooks/useDocumentTitle';
import useScrollTop from 'hooks/useScrollTop';

const EditProfile = (props) => {
	const dispatch = useDispatch();

	useDocumentTitle('Edit Account | Salinaka');
	useScrollTop();
	useEffect(() => {
		return () => {
			dispatch(setLoading(false));
		};
	}, []);

	const { profile, auth, isLoading } = useSelector(state => ({
		profile: state.profile,
		auth: state.auth,
		isLoading: state.app.loading
	}));

	const [field, setField] = useState({
		fullname: { value: profile.fullname ? profile.fullname : '' },
		email: { value: profile.email ? profile.email : '' },
		address: { value: profile.address ? profile.address : '' },
		mobile: profile.mobile.value ? profile.mobile : {
			value: '',
			data: {}
		},
		avatar: profile.avatar ? profile.avatar : '',
		banner: profile.banner ? profile.banner : ''
	});

	const [isOpenModal, setModalOpen] = useState(false);
	const [password, setPassword] = useState(null);
	const {
		imageFile,
		isFileLoading,
		onFileChange
	} = useFileHandler({ avatar: {}, banner: {} });

	const areFieldsChanged = () => {
		const fieldsChanged = Object.keys(field).some((key) => {
			if (typeof profile[key] === 'object' && typeof field[key] === 'object') {
				return profile[key].value !== field[key].value;
			} else if (typeof field[key] === 'object') {
				return field[key].value !== profile[key];
			} else {
				return field[key] !== profile[key];
			}
		});
		const filesUpdated = imageFile.banner.file || imageFile.avatar.file;

		return fieldsChanged || filesUpdated;
	};

	const onEmailChange = (value, error) => {
		setField({ ...field, email: { value, error } });
	};

	const onFullNameChange = (value, error) => {
		setField({ ...field, fullname: { value, error } });
	};

	const onAddressChange = (value, error) => {
		setField({ ...field, address: { value, error } });
	};

	const onMobileChange = (value, data) => {
		const obj = {
			dialCode: data.dialCode,
			countryCode: data.countryCode,
			num: value
		};

		setField({
			...field,
			mobile: {
				value: value.replace(/[^0-9]+/g, '').slice(data.dialCode.length),
				data: obj
			}
		});
	};

	const onCloseModal = () => setModalOpen(false);

	const onPasswordInput = (e) => {
		setPassword(e.target.value.trim());
	};

	const update = (credentials = {}) => {
		dispatch(updateProfile({
			updates: {
				fullname: field.fullname.value,
				email: field.email.value,
				address: field.address.value,
				mobile: field.mobile,
				avatar: field.avatar,
				banner: field.banner
			},
			files: {
				bannerFile: imageFile.banner.file,
				avatarFile: imageFile.avatar.file
			},
			credentials
		}));
	};

	const onConfirmUpdate = () => {
		if (password) {
			update({ email: field.email.value, password });
			setModalOpen(false);
		}
	};

	const onSubmitUpdate = () => {
		const noError = Object.keys(field).every(key => !!!field[key].error);

		if (noError) {
			if (field.email.value !== profile.email) {
				setModalOpen(true);
			} else if (areFieldsChanged()) {
				update();
			}
		}
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
							hidden
							id="edit-banner"
							onChange={e => onFileChange(e, { name: 'banner', type: 'single' })}
							type="file"
						/>
						{isFileLoading ? (
							<div className="loading-wrapper">
								<CircularProgress visible={true} theme="light" />
							</div>
						) : (
								<label
									className="edit-button edit-banner-button"
									htmlFor="edit-banner"
								>
									<i className="fa fa-pen" />
								</label>
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
							disabled={isLoading}
							hidden
							id="edit-avatar"
							onChange={e => onFileChange(e, { name: 'avatar', type: 'single' })}
							type="file"
						/>
						{isFileLoading ? (
							<div className="loading-wrapper">
								<CircularProgress visible={true} theme="light" />
							</div>
						) : (
								<label
									className="edit-button edit-avatar-button"
									htmlFor="edit-avatar"
								>
									<i className="fa fa-pen" />
								</label>
							)}
					</div>
				</div>
				<div className="user-profile-details">
					<Input
						label="* Full Name"
						maxLength={40}
						readOnly={isLoading}
						placeholder="Your Full Name"
						onInputChange={onFullNameChange}
						isRequired={true}
						field="fullname"
						style={{ textTransform: 'capitalize' }}
						type="text"
						value={field.fullname.value}
					/>
					<Input
						label="* Email"
						maxLength={40}
						readOnly={auth.provider !== 'password' || isLoading}
						placeholder="test@example.com"
						onInputChange={onEmailChange}
						isRequired={true}
						field="email"
						type="email"
						value={field.email.value}
					/>
					<Input
						label="Address"
						maxLength={120}
						readOnly={isLoading}
						placeholder="eg: #245 Brgy. Maligalig, Arayat Pampanga, Philippines"
						onInputChange={onAddressChange}
						isRequired={false}
						field="address"
						style={{ textTransform: 'capitalize' }}
						type="text"
						value={field.address.value}
					/>
					{field.mobile.error ? <span className="input-message">{field.mobile.error}</span> : (
						<span className="d-block padding-s">Mobile</span>
					)}
					<PhoneInput
						country={'ph'}
						disabled={isLoading}
						inputClass={`input-form d-block ${field.mobile.error ? 'input-error' : ''}`}
						inputExtraProps={{ required: true }}
						// eslint-disable-next-line quote-props
						masks={{ 'ph': '+.. .... ... ....' }}
						onChange={onMobileChange}
						placeholder="Enter your mobile number"
						readOnly={isLoading}
						value={field.mobile.data.num}
					/>
					<br />
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
							disabled={isLoading || !areFieldsChanged()}
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
            <br />
            please confirm by entering your password
          </p>
					<input
						className="input-form d-block"
						onChange={onPasswordInput}
						placeholder="Enter your password"
						type="password"
					/>
				</div>
				<br />
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
