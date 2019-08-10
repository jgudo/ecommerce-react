import React from 'react';
import { connect } from 'react-redux';

import { signOut } from '../../actions/authActions';
import { clearBasket } from '../../actions/basketActions';
import { clearProfile } from '../../actions/profileActions';
import { resetFilter } from '../../actions/filterActions';

const SignOut = (props) => {
  const { 
    dispatchSignOut, 
    dispatchClearBasket, 
    dispatchClearProfile,
    dispatchResetFilter 
  } = props;

  const onSignOut = () => {
    dispatchSignOut();
    dispatchClearBasket();
    dispatchClearProfile();
    dispatchResetFilter();
  };

  return props.children({ onSignOut });
};

const mapDispatchToProps = dispatch => ({
  dispatchSignOut: () => dispatch(signOut()),
  dispatchClearBasket: () => dispatch(clearBasket()),
  dispatchClearProfile: () => dispatch(clearProfile()),
  dispatchResetFilter: () => dispatch(resetFilter())
});

export default connect(undefined, mapDispatchToProps)(SignOut);
