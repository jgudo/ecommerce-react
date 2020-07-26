/* eslint-disable react/no-multi-comp */
import React, { lazy, Suspense } from 'react';
import CircularProgress from 'components/ui/CircularProgress';
import UserTab from '../tab/UserTab';

const UserAccountTab = lazy(() => import('../tab/UserAccountTab'));
const UserWishListTab = lazy(() => import('../tab/UserWishListTab'));
const UserOrdersTab = lazy(() => import('../tab/UserOrdersTab'));

const Loader = () => (
	<div className="loader" style={{ minHeight: '80vh' }}>
		<CircularProgress />
		<h6>Loading ... </h6>
	</div>
);

const UserAccount = () => {
	return (
		<UserTab>
			<div index={0} label="Account">
				<Suspense fallback={<Loader />}>
					<UserAccountTab />
				</Suspense>
			</div>
			<div index={1} label="My Wish List">
				<Suspense fallback={<Loader />}>
					<UserWishListTab />
				</Suspense>
			</div>
			<div index={2} label="My Orders">
				<Suspense fallback={<Loader />}>
					<UserOrdersTab />
				</Suspense>
			</div>
		</UserTab>
	);
};

export default UserAccount;
