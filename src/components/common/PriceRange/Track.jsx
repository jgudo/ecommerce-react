import PropType from 'prop-types';
import React from 'react';

const Track = ({
  source, target, getTrackProps, disabled
}) => (
  <div
    style={{
      position: 'absolute',
      transform: 'translate(0%, -50%)',
      height: 14,
      zIndex: 1,
      backgroundColor: disabled ? '#ffd993' : '#ffa500',
      borderRadius: 7,
      cursor: 'pointer',
      left: `${source.percent}%`,
      width: `${target.percent - source.percent}%`
    }}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...getTrackProps()}
  />
);

Track.propTypes = {
  source: PropType.shape({
    id: PropType.string.isRequired,
    value: PropType.number.isRequired,
    percent: PropType.number.isRequired
  }).isRequired,
  target: PropType.shape({
    id: PropType.string.isRequired,
    value: PropType.number.isRequired,
    percent: PropType.number.isRequired
  }).isRequired,
  getTrackProps: PropType.func.isRequired,
  disabled: PropType.bool
};

Track.defaultProps = {
  disabled: false
};


export default Track;
