import React from 'react';
import PropTypes from 'prop-types';

const CircularProgress = ({ style, visible, theme }) => {
  const className = () => {
    return theme === 'light' ? 'circular-progress-light' : theme === 'dark' ? 'circular-progress-dark' : null; 
  };

  return visible ? <div className={className()} style={style} /> : null;
};

CircularProgress.defaultProps = {
  visible: true,
  theme: 'dark',
  style: {}
};

CircularProgress.propType = {
  visible: PropTypes.bool,
  theme: PropTypes.string
};

export default CircularProgress;
