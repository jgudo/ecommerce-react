import React from 'react';
import { useLocation } from 'react-router-dom';

import { HOME } from 'constants/routes';
import logo from '../../../static/logo_vertical_cropped.png';

const Footer = () => {
	const { pathname } = useLocation();

	return pathname !== HOME ? null : (
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
