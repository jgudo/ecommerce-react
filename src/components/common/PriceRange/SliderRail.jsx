/* eslint-disable react/jsx-props-no-spreading */
import PropType from 'prop-types';
import React from 'react';

const railOuterStyle = {
  position: 'absolute',
  transform: 'translate(0%, -50%)',
  width: '100%',
  height: 42,
  borderRadius: 7,
  cursor: 'pointer'
  // border: '1px solid grey',
};

const railInnerStyle = {
  position: 'absolute',
  width: '100%',
  height: 14,
  transform: 'translate(0%, -50%)',
  borderRadius: 7,
  pointerEvents: 'none',
  backgroundColor: '#d0d0d0'
};

const SliderRail = ({ getRailProps }) => (
  <div>
    <div style={railOuterStyle} {...getRailProps()} />
    <div style={railInnerStyle} />
  </div>
);

SliderRail.propTypes = {
  getRailProps: PropType.func.isRequired
};

export default SliderRail;
