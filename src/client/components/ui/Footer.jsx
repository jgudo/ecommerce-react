import React from 'react';

const Footer = () => (
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

export default Footer;
