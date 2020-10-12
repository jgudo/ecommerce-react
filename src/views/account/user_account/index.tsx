/* eslint-disable react/no-multi-comp */
import React, { lazy, Suspense } from 'react';
import useDocumentTitle from 'hooks/useDocumentTitle';
import CircularProgress from 'components/ui/CircularProgress';
import UserTab from '../tab/UserTab';
import useScrollTop from 'hooks/useScrollTop';

const UserAccountTab = lazy(() => import('../tab/UserAccountTab'));
const UserWishListTab = lazy(() => import('../tab/UserWishListTab'));
const UserOrdersTab = lazy(() => import('../tab/UserOrdersTab'));

const Loader: React.FC = () => (
	<div className="loader" style={{ minHeight: '80vh' }}>
		<CircularProgress />
		<h6>Loading ... </h6>
	</div>
);

const UserAccount: React.FC = () => {
	useDocumentTitle('My Account | Salinaka');
	useScrollTop();

	return (
		<UserTab>
			<div data-index={0} data-label="Account">
				<Suspense fallback={<Loader />}>
					<UserAccountTab />
				</Suspense>
			</div>
			<div data-index={1} data-label="My Wish List">
				<Suspense fallback={<Loader />}>
					<UserWishListTab />
				</Suspense>
			</div>
			<div data-index={2} data-label="My Orders">
				<Suspense fallback={<Loader />}>
					<UserOrdersTab />
				</Suspense>
			</div>
		</UserTab>
	);
};

export default UserAccount;
