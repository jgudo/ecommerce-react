import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const CheckOut = ({ isAuth, basket }) => {
  return (
    <div>
      {!isAuth ? (
        <Redirect to="/signin" />
      ) : basket.length === 0 ? (
        <Redirect to="/" />
      ) : null}
      <h1>Check Out</h1>
    </div>
  );
};

const mapStateToProps = ({ auth, basket }) => ({
  isAuth: !!auth.id && !!auth.type,
  basket
});

export default connect(mapStateToProps)(CheckOut);
