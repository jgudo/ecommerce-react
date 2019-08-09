import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../../../actions/authActions';

const AdminNavigation = ({ dispatchSignOut }) => {
  return (
    <nav className="navigation background-dark padding-left-l">
      <div className="logo">
        <Link to="/dashboard">
          <h2 className="color-light">DASHBOARD</h2>
        </Link>
      </div>
      <ul className="navigation-menu">
        <li className="navigation-menu-item">
          <button 
              className="button button-small color-light"
              onClick={dispatchSignOut}
          >
            Sign Out
          </button>
        </li>
      </ul>
    </nav>
  );
};

const mapDispatchToProps = dispatch => ({
  dispatchSignOut: () => dispatch(signOut())
});

export default connect(undefined, mapDispatchToProps)(AdminNavigation);
