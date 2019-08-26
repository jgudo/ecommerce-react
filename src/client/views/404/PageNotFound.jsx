import React from 'react';
import { withRouter } from 'react-router-dom';

const PageNotFound = (props) => {
  return (
    <div className="page-not-found">
      <h1>:( Page you are looking for doesn't exists.</h1>
      <br/>
      <button
          className="button"
          onClick={props.history.goBack}
      >
        Go back
      </button>
    </div>
  );
};

export default withRouter(PageNotFound);
