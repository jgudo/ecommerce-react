import React from 'react';
import PropTypes from 'prop-types';

const Badge = ({ count }) => {
  return (
    <div className="badge">
      <span className="badge-count">{count}</span>
    </div>
  );
};

Badge.propType = {
  count: PropTypes.number.isRequired
};

export default Badge;
