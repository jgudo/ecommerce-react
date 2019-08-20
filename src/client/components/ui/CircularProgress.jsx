import React from 'react';
import PropTypes from 'prop-types';

const CircularProgress = ({ visible, theme }) => {
  const className = () => {
    return theme === 'light' ? 'circular-progress-light' : theme === 'dark' ? 'circular-progress-dark' : null; 
  };

  return visible ? <div className={className()} /> : null;
};

CircularProgress.defaultProps = {
  visible: true,
  theme: 'dark'
};

CircularProgress.propType = {
  visible: PropTypes.bool,
  theme: PropTypes.string
};

export default CircularProgress;
