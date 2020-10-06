import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { ADMIN_DASHBOARD } from 'constants/routes';
import UserAvatar from 'views/account/components/UserAvatar';
import { RootState } from 'types/typings';

const AdminNavigation: React.FC = () => {
	const state = useSelector((state: RootState) => ({
		isAuthenticating: state.app.isAuthenticating,
		profile: state.profile
	}));

	return (
		<nav className="navigation navigation-admin">
			<div className="logo">
				<Link to={ADMIN_DASHBOARD}>
					<h2>ADMIN PANEL</h2>
				</Link>
			</div>
			<ul className="navigation-menu">
				<li className="navigation-menu-item">
					<UserAvatar
						isAuthenticating={state.isAuthenticating}
						profile={state.profile}
					/>
				</li>
			</ul>
		</nav>
	);
};

export default AdminNavigation;
