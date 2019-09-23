import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { displayActionMessage } from 'helpers/utils';

const UserItem = ({ user, onDeleteUser }) => {
  const userRef = useRef(null);

  const onClickDeleteUser = () => {
    userRef.current.classList.toggle('item-active');
  };

  const onConfirmDelete = () => {
    onDeleteUser(user.id);
    displayActionMessage('User successfully deleted');
  };

  const onCancelDelete = () => {
    userRef.current.classList.remove('item-active');
  };

  return (
    <div 
        className="item"
        ref={userRef}
    >
      <div className="grid grid-count-4">
        <div className="grid-col">
          <span>{user.firstname}</span>
        </div>
        <div className="grid-col">
          <span>{user.lastname}</span>
        </div>
        <div className="grid-col">
          <span>{user.email}</span>
        </div>
      </div>
      <div className="item-action">
        <button 
            className="button button-border button-small"
            // onClick={onClickEdit}
        >
          Edit
        </button>
        &nbsp;
        <button
            className="button button-border button-small"
            onClick={onClickDeleteUser}
        >
          Delete
        </button>
        <div className="item-action-confirm">
          <h5>Are you sure you want to delete this?</h5>
          <button 
              className="button button-small"
              onClick={onConfirmDelete}
          >
            Yes
          </button>
          &nbsp;
          <button 
              className="button button-small button-border"
              onClick={onCancelDelete}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

UserItem.propType = {
  user: PropTypes.object.isRequired,
  onDeleteUser: PropTypes.func.isRequired
};

export default UserItem;
