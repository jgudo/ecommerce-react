import React from 'react';
import { connect } from 'react-redux';

const Users = ({ users }) => {
  return (
    <div>
      <div className="product-admin-header">
        <h2 className="product-admin-header-title">
          Users &nbsp;
          <span className="text-subtle">
            {users.length} {users.length > 1 ? 'users ' : 'user '}
          </span>
        </h2>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users }) => ({ 
  users
});

export default connect(mapStateToProps)(Users);
