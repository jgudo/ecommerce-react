import React, { useRef } from 'react';
import { withRouter, Link } from 'react-router-dom'; 
import SignOut from '../auth/SignOut';

const UserNav = (props) => {
  const { profile } = props;
  const userNav = useRef(null);
  const onClickNav = () => {
    userNav.current.classList.toggle('user-sub-open');
  };

  return (
    <div 
        className="user-nav"
        onClick={onClickNav}
        ref={userNav}
    >
      <h5>{profile.firstname}</h5>
      <div className="user-nav-img-wrapper">
        <img 
            alt=""
            className="user-nav-img"
            data-alt={profile.firstname[0]}
            src={profile.avatar} 
        />
      </div>
      <div className="user-carret" />
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
                  className="user-nav-sub-link"
                  onClick={() => {
                    onSignOut();
                    props.history.push('/signin');
                  }}
              >
                Sign Out
              </span>
            </strong>
          )}
        </SignOut>
      </div>
    </div>
  );
};

export default withRouter(UserNav);
