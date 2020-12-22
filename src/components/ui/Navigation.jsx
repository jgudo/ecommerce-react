/* eslint-disable indent */
import React, { useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useLocation, NavLink, Link } from 'react-router-dom';

import * as ROUTE from 'constants/routes';
import UserAvatar from 'views/account/components/UserAvatar';
import BasketToggle from '../basket/BasketToggle';
import Badge from './Badge';
import SearchBar from './SearchBar';
import FiltersToggle from './FiltersToggle';
import MobileNavigation from './MobileNavigation';

import logo from '../../../static/logo-full.png';

const Navigation = ({ isAuth }) => {
	const navbar = useRef(null);
	const history = useHistory();
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

	const store = useSelector(state => ({
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

	// disable the basket toggle to these pathnames
	const basketDisabledpathnames = [
		ROUTE.CHECKOUT_STEP_1,
		ROUTE.CHECKOUT_STEP_2,
		ROUTE.CHECKOUT_STEP_3,
		ROUTE.SIGNIN,
		ROUTE.SIGNUP,
		ROUTE.FORGOT_PASSWORD
	];

	return window.screen.width <= 800 ? (
		<MobileNavigation
			basketLength={store.basketLength}
			disabledPaths={basketDisabledpathnames}
			isAuth={isAuth}
			products={store.products}
			isLoading={store.isLoading}
			productsCount={store.productsCount}
			filter={store.filter}
			isAuthenticating={store.isAuthenticating}
			pathname={pathname}
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
				<ul className="navigation-menu-main">
					<li>
						<Link to={ROUTE.HOME}>HOME</Link>
					</li>
					<li>
						<Link to={ROUTE.SHOP}>SHOP</Link>
					</li>
				</ul>
				{(pathname === ROUTE.SHOP || pathname === ROUTE.SEARCH) && (
					<FiltersToggle
						filter={store.filter}
						isLoading={store.isLoading}
						products={store.products}
						productsCount={store.productsLength}
					>
						<button className="button-muted button-small">
							Filters &nbsp;<i className="fa fa-filter" />
						</button>
					</FiltersToggle>
				)}
				<SearchBar
					isLoading={store.isLoading}
					filter={store.filter}
				/>

				<ul className="navigation-menu">
					<li className="navigation-menu-item">
						<BasketToggle>
							{({ onClickToggle }) => (
								<button
									className="button-link navigation-menu-link basket-toggle"
									disabled={basketDisabledpathnames.includes(pathname)}
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
								{pathname !== ROUTE.SIGNUP && (
									<NavLink
										activeClassName="navigation-menu-active"
										className="button button-small"
										exact
										onClick={onClickLink}
										to={ROUTE.SIGNUP}
									>
										Sign Up
									</NavLink>
								)}
								{pathname !== ROUTE.SIGNIN && (
									<NavLink
										activeClassName="navigation-menu-active"
										className="button button-small button-muted margin-left-s"
										exact
										onClick={onClickLink}
										to={ROUTE.SIGNIN}
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
