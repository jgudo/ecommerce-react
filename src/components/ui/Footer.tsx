import React from 'react';

import logo from '../../../static/logo-full.png';
import { useLocation } from 'react-router-dom';
import { Route } from 'constants/routes';

const Footer: React.FC = () => {
	const { pathname } = useLocation();
	// hide the footer to these routes

	const hiddenFooterPaths: string[] = [
		Route.ACCOUNT,
		Route.SIGNIN,
		Route.SIGNUP,
		Route.FORGOT_PASSWORD
	];

	return hiddenFooterPaths.includes(pathname) ? null : (
		<footer className="footer">
			<div className="footer-col-1">
				<strong><span>Developed by <a href="https://github.com/jgudo">JULIUS GUEVARRA</a></span></strong>
			</div>
			<div className="footer-col-2">
				<img className="footer-logo" src={logo} />
				<h5>&copy;&nbsp;{new Date().getFullYear()}</h5>
			</div>
			<div className="footer-col-3">
				<strong>
					<span>
						Fork this project &nbsp;
						<a href="https://github.com/jgudo/ecommerce-react">HERE</a>
					</span>
				</strong>
			</div>
		</footer>
	);
};

export default Footer;
