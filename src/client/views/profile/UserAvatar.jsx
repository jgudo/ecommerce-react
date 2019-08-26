import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom'; 
import SignOut from '../../components/auth/SignOut';
import CircularProgress from '../../components/ui/CircularProgress';
import defaultAvatar from '../../images/defaultAvatar.jpg';

const UserNav = (props) => {
  const { profile } = props;
  const userNav = useRef(null);
  const onClickNav = (e) => {
    userNav.current.classList.toggle('user-sub-open');
  };

  document.addEventListener('click', (e) => {
    const closest = e.target.closest('div.user-nav');

    try {
      if (!closest && userNav.current.classList.contains('user-sub-open')) {
        userNav.current.classList.remove('user-sub-open');
      }
    } catch (e) {}
  });

  return (
    <div 
        className="user-nav"
        onClick={onClickNav}
        ref={userNav}
    >
      <h5>{profile.fullname && profile.fullname.split(' ')[0]}</h5>
      <div className="user-nav-img-wrapper">
        <img 
            alt=""
            className="user-nav-img"
            src={profile.avatar ? profile.avatar : defaultAvatar} 
        />
      </div>
      <div className="icon-caret user-caret" />
      <div className="user-nav-sub">
        <Link 
            to="/profile"
            className="user-nav-sub-link"
        >
          View Profile
        </Link>
        <SignOut>
          {({ onSignOut }) => (
            <strong>
              <span 
                  className="user-nav-sub-link d-flex-end"
                  onClick={onSignOut}
              >
                <CircularProgress visible={props.isAuthenticating}/>
                Sign Out
              </span>
            </strong>
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
