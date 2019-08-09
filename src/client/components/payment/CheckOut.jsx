import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const CheckOut = ({ isAuth, basket }) => {
  // console.log(props);
  return (
    <div>
      {(!isAuth && basket.length === 0) && (
          <Redirect to="/signin" />
      )}
      <h1>Check Out</h1>
    </div>
  );
};

const mapStateToProps = ({ auth, basket }) => ({
  isAuth: !!auth.id && !!auth.type,
  basket
});

export default connect(mapStateToProps)(CheckOut);
