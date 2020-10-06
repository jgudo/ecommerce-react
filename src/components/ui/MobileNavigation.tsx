import React from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import { HOME, SIGNIN, SEARCH } from 'constants/routes';
import UserNav from 'views/account/components/UserAvatar';
import BasketToggle from '../basket/BasketToggle';
import Badge from './Badge';
import logo from '../../../static/logo_horizontal.png';
import { IUser } from 'types/typings';

interface IProps extends RouteComponentProps {
	isAuthenticating: boolean;
	disabledPaths: string[];
	basketLength: number;
	path: string;
	isAuth: boolean;
	profile: IUser;
}

const Navigation: React.FC<IProps> = (props) => {
	const onClickLink = (e) => {
		if (props.isAuthenticating) e.preventDefault();
	};

	return (
		<nav className="mobile-navigation">
			<div className="mobile-navigation-main">
				<div className="mobile-navigation-logo">
					<Link onClick={onClickLink} to={HOME}>
						<img src={logo} style={{ width: '100px', height: '30px', objectFit: 'contain' }} />
					</Link>
				</div>

				<BasketToggle>
					{({ onClickToggle }) => (
						<button
							className="button-link navigation-menu-link basket-toggle"
							onClick={onClickToggle}
							disabled={props.disabledPaths.includes(props.path)}
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
								{props.path !== SIGNIN && (
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
				<button className="button-link" onClick={(e) => {
					if (props.isAuthenticating) e.preventDefault();
					props.history.push(SEARCH);
				}}>
					<i className="fa fa-search" />
				</button>
			</div>

		</nav>
	);
}

export default withRouter(Navigation);
