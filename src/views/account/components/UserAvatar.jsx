import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom'; 

import SignOut from 'components/auth/SignOut';
import CircularProgress from 'components/ui/CircularProgress';
import { ACCOUNT } from 'constants/routes';

const UserNav = ({ profile, isAuthenticating }) => {
  useEffect(() => {
    document.addEventListener('click', toggleDropdown);

    return () => document.removeEventListener('click', toggleDropdown);
  }, []);
  const userNav = useRef(null);

  const onClickNav = (e) => {
    userNav.current.classList.toggle('user-sub-open');
  };

  const toggleDropdown = (e) => {
    const closest = e.target.closest('div.user-nav');

    try {
      if (!closest && userNav.current.classList.contains('user-sub-open')) {
        userNav.current.classList.remove('user-sub-open');
      }
    } catch (e) {}
  };

  
  return isAuthenticating ? (
    <div className="user-nav">
      <span>Signing Out</span>
      <CircularProgress />
    </div>
  ) : (
    <div 
        className="user-nav"
        onClick={onClickNav}
        ref={userNav}
    >
      <h5 className="text-overflow-ellipsis">{profile.fullname && profile.fullname.split(' ')[0]}</h5>
      <div className="user-nav-img-wrapper">
        <img 
            alt=""
            className="user-nav-img"
            src={profile.avatar} 
        />
      </div>
      <div className="icon-caret user-caret" />
      <div className="user-nav-sub">
        {profile.role !== 'ADMIN' && (
          <Link 
              to={ACCOUNT}
              className="user-nav-sub-link"
          >
            View Account
            <i className="fa fa-user" />
          </Link>
        )}
        <SignOut>
          {({ onSignOut }) => (
            <h6 
                className="user-nav-sub-link margin-0 d-flex"
                onClick={onSignOut}
            >
              Sign Out
              <i className="fa fa-sign-out-alt" />
            </h6>
          )}
        </SignOut>
      </div>
    </div>
  );
};

UserNav.propType = {
  profile: PropTypes.object.isRequired
};

export default withRouter(UserNav);
