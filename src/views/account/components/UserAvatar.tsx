/* eslint-disable indent */
import React, { useRef, useEffect } from 'react';
import { withRouter, Link, RouteComponentProps } from 'react-router-dom';

import SignOut from 'components/auth/SignOut';
import CircularProgress from 'components/ui/CircularProgress';
import { ACCOUNT } from 'constants/routes';
import { IUser } from 'types/typings';

interface IProps extends RouteComponentProps {
	profile: IUser;
	isAuthenticating: boolean;
}

const UserAvatar: React.FC<IProps> = ({ profile, isAuthenticating }) => {
	const userNav = useRef<HTMLDivElement>(null);
	const toggleDropdown = (e: MouseEvent) => {
		const closest = (e.target as HTMLDivElement).closest('div.user-nav');

		try {
			if (!closest && userNav.current && userNav.current.classList.contains('user-sub-open')) {
				userNav.current.classList.remove('user-sub-open');
			}
		} catch (err) { }
	};

	useEffect(() => {
		document.addEventListener('click', toggleDropdown);

		return () => document.removeEventListener('click', toggleDropdown);
	}, []);

	const onClickNav = (): void => {
		if (userNav.current) {
			userNav.current.classList.toggle('user-sub-open');
		}
	};

	return isAuthenticating ? (
		<div className="user-nav">
			<span>Signing Out</span>
			<CircularProgress />
		</div>
	) : (
			<div
				className="user-nav"
				onClick={onClickNav}
				ref={userNav}
			>
				<h5 className="text-overflow-ellipsis">{profile.fullname && profile.fullname.split(' ')[0]}</h5>
				<div className="user-nav-img-wrapper">
					<img
						alt=""
						className="user-nav-img"
						src={profile.avatar}
					/>
				</div>
				<div className="icon-caret user-caret" />
				<div className="user-nav-sub">
					{profile.role !== 'ADMIN' && (
						<Link
							to={ACCOUNT}
							className="user-nav-sub-link"
						>
							View Account
							<i className="fa fa-user" />
						</Link>
					)}
					<SignOut>
						{({ onSignOut }) => (
							<h6
								className="user-nav-sub-link margin-0 d-flex"
								onClick={onSignOut}
							>
								Sign Out
								<i className="fa fa-sign-out-alt" />
							</h6>
						)}
					</SignOut>
				</div>
			</div>
		);
};

export default withRouter(UserAvatar);
