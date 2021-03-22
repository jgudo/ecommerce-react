import { useScrollTop } from 'hooks';
import PropType from 'prop-types';
import React from 'react';

const Error = ({ history }) => {
  useScrollTop();

  return (
    <div className="page-not-found">
      <h1>:( An error has occured. Please try again.</h1>
      <br />
      <button
        className="button"
        onClick={() => history.push('/')}
        type="button"
      >
        Try Again
      </button>
    </div>

  );
};

Error.propTypes = {
  history: PropType.shape({
    push: PropType.func
  }).isRequired
};

export default Error;
