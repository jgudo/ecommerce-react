import React from 'react';
import { Link, RouteComponentProps, useLocation, withRouter } from 'react-router-dom';

import { Route } from 'constants/routes';
import UserNav from 'views/account/components/UserAvatar';
import BasketToggle from '../basket/BasketToggle';
import Badge from './Badge';
import { IFilter, IProduct, IUser } from 'types/types';
import SearchBar from './SearchBar';
import FiltersToggle from './FiltersToggle';

interface IProps extends RouteComponentProps {
	isAuthenticating: boolean;
	disabledPaths: string[];
	basketLength: number;
	filter: IFilter;
	isLoading: boolean;
	isAuth: boolean;
	products: IProduct[];
	profile: IUser;
	productsCount: number;
}

const Navigation: React.FC<IProps> = (props) => {
	const { pathname } = useLocation();
	const onClickLink = (e) => {
		if (props.isAuthenticating) e.preventDefault();
	};

	return (
		<nav className="mobile-navigation">
			<div className="mobile-navigation-main">
				<div className="mobile-navigation-logo">
					<Link onClick={onClickLink} to={Route.HOME}>
						{/* <img src={logo} style={{ width: '150px', height: 'inherit', objectFit: 'contain' }} /> */}
						<h2>SALINAKA</h2>
					</Link>
				</div>

				<BasketToggle>
					{({ onClickToggle }) => (
						<button
							className="button-link navigation-menu-link basket-toggle"
							onClick={onClickToggle}
							disabled={props.disabledPaths.includes(pathname)}
						>

							<Badge count={props.basketLength}>
								<i className="fa fa-shopping-bag" style={{ fontSize: '2rem' }} />
							</Badge>
						</button>
					)}
				</BasketToggle>
				<ul className="mobile-navigation-menu">
					{props.isAuth ? (
						<li className="mobile-navigation-item">
							<UserNav isAuthenticating={props.isAuthenticating} profile={props.profile} />
						</li>
					) : (
							<>
								{pathname !== Route.SIGNIN && (
									<li className="mobile-navigation-item">
										<Link
											className="navigation-menu-link"
											onClick={onClickLink}
											to={Route.SIGNIN}
										>
											Sign In
										</Link>
									</li>
								)}
							</>
						)}
				</ul>
			</div>
			<div className="mobile-navigation-sec">
				<SearchBar
					isLoading={props.isLoading}
					filter={props.filter}
				/>
				<FiltersToggle
					filter={props.filter}
					isLoading={props.isLoading}
					products={props.products}
					productsCount={props.productsCount}
				>
					<button className="button-link button-small">
						<i className="fa fa-filter" />
					</button>
				</FiltersToggle>
			</div>
		</nav>
	);
}

export default withRouter(Navigation);
