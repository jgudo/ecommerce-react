import React from 'react';

const CircularProgress = ({ visible, theme }) => {
  const className = () => {
    return theme === 'light' ? 'circular-progress-light' : theme === 'dark' ? 'circular-progress-dark' : null; 
  };

  return visible ? <div className={className()} /> : null;
};

export default CircularProgress;
