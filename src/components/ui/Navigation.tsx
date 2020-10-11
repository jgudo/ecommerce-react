/* eslint-disable indent */
import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Link, useLocation } from 'react-router-dom';

import { Route } from 'constants/routes';
import UserAvatar from 'views/account/components/UserAvatar';
import BasketToggle from '../basket/BasketToggle';
import Badge from './Badge';
import SearchBar from './SearchBar';
import FiltersToggle from './FiltersToggle';
import MobileNavigation from './MobileNavigation';

import logo from '../../../static/logo_horizontal.png';
import { RootState } from 'types/types';

interface IProps {
	isAuth: boolean;
	[propName: string]: any;
}

const Navigation: React.FC<IProps> = ({ isAuth }) => {
	const navbar = useRef<HTMLDivElement>(null);
	const { pathname } = useLocation();
	const scrollHandler = () => {
		if (navbar.current && window.screen.width > 480) {
			if (window.pageYOffset >= 70) {
				navbar.current.classList.add('is-nav-scrolled');
			} else {
				navbar.current.classList.remove('is-nav-scrolled');
			}
		}
	};

	useEffect(() => {
		window.addEventListener('scroll', scrollHandler);

		return () => window.removeEventListener('scroll', scrollHandler);
	}, []);

	const store = useSelector((state: RootState) => ({
		filter: state.filter,
		products: state.products.items,
		basketLength: state.basket.length,
		profile: state.profile,
		isLoading: state.app.loading,
		isAuthenticating: state.app.isAuthenticating,
		productsLength: state.products.items.length
	}));

	const onClickLink = (e) => {
		if (store.isAuthenticating) e.preventDefault();
	};

	// disable the basket toggle to these paths
	const basketDisabledPaths: string[] = [
		Route.CHECKOUT_STEP_1,
		Route.CHECKOUT_STEP_2,
		Route.CHECKOUT_STEP_3,
		Route.SIGNIN,
		Route.SIGNUP,
		Route.FORGOT_PASSWORD
	];

	return window.screen.width <= 480 ? (
		<MobileNavigation
			basketLength={store.basketLength}
			disabledPaths={basketDisabledPaths}
			isAuth={isAuth}
			isAuthenticating={store.isAuthenticating}
			profile={store.profile}
		/>
	) : (
			<nav
				className="navigation"
				ref={navbar}
			>
				<div className="logo">
					<Link onClick={onClickLink} to="/">
						<img src={logo} />
					</Link>
				</div>
				{pathname === Route.HOME && (
					<>
						<SearchBar
							isLoading={store.isLoading}
							filter={store.filter}
							productsLength={store.productsLength}
						/>
						&nbsp;
						<FiltersToggle
							filter={store.filter}
							isLoading={store.isLoading}
							products={store.products}
							productsLength={store.productsLength}
						>
							<button className="button-muted button-small">
								More Filters &nbsp;<i className="fa fa-chevron-right" />
							</button>
						</FiltersToggle>
					</>
				)}
				<ul className="navigation-menu">
					<li className="navigation-menu-item">
						<BasketToggle>
							{({ onClickToggle }) => (
								<button
									className="button-link navigation-menu-link basket-toggle"
									disabled={basketDisabledPaths.includes(pathname)}
									onClick={onClickToggle}
								>

									<Badge count={store.basketLength}>
										<i className="fa fa-shopping-bag" style={{ fontSize: '2rem' }} />
									</Badge>
								</button>
							)}
						</BasketToggle>
					</li>
					{isAuth ? (
						<li className="navigation-menu-item">
							<UserAvatar isAuthenticating={store.isAuthenticating} profile={store.profile} />
						</li>
					) : (
							<li className="navigation-action">
								{pathname === Route.SIGNUP && (
									<NavLink
										activeClassName="navigation-menu-active"
										className="button button-small"
										exact
										onClick={onClickLink}
										to={Route.SIGNUP}
									>
										Sign Up
									</NavLink>
								)}
								{pathname !== Route.SIGNIN && (
									<NavLink
										activeClassName="navigation-menu-active"
										className="button button-small button-muted margin-left-s"
										exact
										onClick={onClickLink}
										to={Route.SIGNIN}
									>
										Sign In
									</NavLink>
								)}
							</li>
						)}
				</ul>
			</nav>
		);
};

export default Navigation;
