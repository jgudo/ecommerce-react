import React from 'react';
import { connect } from 'react-redux';

const UserProfile = ({ profile }) => {
  return (
    <div>
      <h1>Profile</h1>
      <h2>{`${profile.firstname} ${profile.lastname}`}</h2>
    </div>
  );
};

const mapStateToProps = ({ profile }) => ({
  profile
});

export default connect(mapStateToProps)(UserProfile);
