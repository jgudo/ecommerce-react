import { BasketToggle } from 'components/basket';
import { HOME, SIGNIN } from 'constants/routes';
import PropTypes from 'prop-types';
import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import UserNav from 'views/account/components/UserAvatar';
import Badge from './Badge';
import FiltersToggle from './FiltersToggle';
import SearchBar from './SearchBar';

const Navigation = (props) => {
	const history = useHistory();
	const { pathname } = useLocation();

	const onClickLink = (e) => {
		if (props.isAuthenticating) e.preventDefault();
	};

	return (
		<nav className="mobile-navigation">
			<div className="mobile-navigation-main">
				<div className="mobile-navigation-logo">
					<Link onClick={onClickLink} to={HOME}>
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
					{props.user ? (
						<li className="mobile-navigation-item">
							<UserNav />
						</li>
					) : (
						<>
							{pathname !== SIGNIN && (
								<li className="mobile-navigation-item">
									<Link
										className="navigation-menu-link"
										onClick={onClickLink}
										to={SIGNIN}
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
				<SearchBar />
				<FiltersToggle>
					<button className="button-link button-small">
						<i className="fa fa-filter" />
					</button>
				</FiltersToggle>
			</div>
		</nav>
	);
}

Navigation.propType = {
	path: PropTypes.string.isRequired,
	disabledPaths: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Navigation;
