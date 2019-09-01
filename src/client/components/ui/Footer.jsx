import React from 'react';

import * as ROUTE from '../../constants/routes';

const Footer = ({ path }) => {
  const hiddenPaths = [
    ROUTE.SIGNIN,
    ROUTE.SIGNUP,
    ROUTE.FORGOT_PASSWORD,
    ROUTE.PROFILE,
    ROUTE.PROFILE_EDIT,
    ROUTE.CHECKOUT_STEP_1,
    ROUTE.CHECKOUT_STEP_2,
    ROUTE.CHECKOUT_STEP_3
  ];

  return hiddenPaths.includes(path) ? null : (
    <footer className="footer">
      <div className="footer-col-1">
        <h4>SALINAKA &nbsp;<span>{new Date().getFullYear()}</span></h4>
      </div>
      <div className="footer-col-2">
        <span>Created by <strong><a href="https://github.com/jgudo">Julius Guevarra</a></strong></span>
      </div>
      <div className="footer-col-3">
        <span>
          Fork this project &nbsp;
          <strong>
            <a href="https://github.com/jgudo/ecommerce-react">here</a>
          </strong>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
