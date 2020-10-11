/* eslint-disable indent */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { displayDate } from 'helpers/utils';
import { Route } from 'constants/routes';
import ImageLoader from 'components/ui/ImageLoader';
import { IMobileInfo, RootState } from 'types/typings';

const UserProfile: React.FC = () => {
	const history = useHistory();
	const profile = useSelector((state: RootState) => state.profile);

	return (
		<div className="user-profile">
			<div className="user-profile-block">
				<div className="user-profile-banner">
					<div className="user-profile-banner-wrapper">
						<ImageLoader
							alt="Banner"
							className="user-profile-banner-img"
							src={profile.banner}
						/>
					</div>
					<div className="user-profile-avatar-wrapper">
						<ImageLoader
							alt="Avatar"
							className="user-profile-img"
							src={profile.avatar}
						/>
					</div>
					<button
						className="button button-small user-profile-edit"
						onClick={() => history.push(Route.ACCOUNT_EDIT)}
					>
						Edit Account
					</button>
				</div>
				<div className="user-profile-details">
					<h2 className="user-profile-name">{profile.fullname}</h2>
					<span>Email</span>
					<br />
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
					{profile.mobile && (
						(profile.mobile as IMobileInfo).data.num ? (
							<h5>{(profile.mobile as IMobileInfo).data.num}</h5>
						) : (
								<h5 className="text-subtle text-italic">Mobile not set</h5>
							)
					)}
					<span>Date Joined</span>
					<br />
					{profile.dateJoined ? (
						<h5>{displayDate(profile.dateJoined)}</h5>
					) : (
							<h5 className="text-subtle text-italic">Not available</h5>
						)}
				</div>
			</div>
		</div>
	);
};

export default UserProfile;
