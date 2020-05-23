import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ count, children }) => {
  return (
    <div className="badge">
    	{children}
    	{count >= 1 && <span className="badge-count">{count}</span>}
    </div>
  );
};

Badge.propType = {
  count: PropTypes.number.isRequired
};

export default Badge;
