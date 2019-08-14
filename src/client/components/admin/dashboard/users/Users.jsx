import React from 'react';
import { connect } from 'react-redux';
import { deleteUser } from '../../../../actions/userActions';
import firebase from '../../../../firebase/firebase';
import UserItem from './UserItem';

const Users = ({ users, dispatchDeleteUser }) => {
  firebase.createAccount('juliusguevarra101@gmail.com', '09154982243');
  return (
    <>
      <div className="product-admin-header">
        <h2 className="product-admin-header-title">
          Users &nbsp;
          <span className="text-subtle">
            {users.length} {users.length > 1 ? 'users ' : 'user '}
          </span>
        </h2>
      </div>
      {users.length > 0 ? (
        <div className="grid grid-product grid-count-4 padding-s w-90">
          <div className="grid-col">
            <h5>First Name</h5>
          </div>
          <div className="grid-col">
            <h5>Last Name</h5>
          </div>
          <div className="grid-col">
            <h5>Email</h5>
          </div>
          <div className="grid-col">
            <h5>Date Joined</h5>
          </div>
        </div>
      ) : (
        <div className="product-list-empty">
          <h4>There are no items found</h4>
          <span>Try using correct filters and keyword</span>
        </div>
      )}
      {users.map(user => (
        <UserItem 
            key={user.email} 
            onDeleteUser={dispatchDeleteUser}
            user={user} 
        />
      ))}
    </>
  );
};

const mapStateToProps = ({ users }) => ({ 
  users
});

const mapDispatchToProps = dispatch => ({
  dispatchDeleteUser: id => dispatch(deleteUser(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
