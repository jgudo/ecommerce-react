import PropType from 'prop-types';
import React from 'react';

const Tick = ({ tick, count, format }) => (
  <div>
    <div
      style={{
        position: 'absolute',
        marginTop: 17,
        width: 1,
        height: 5,
        backgroundColor: 'rgb(200,200,200)',
        left: `${tick.percent}%`
      }}
    />
    <div
      style={{
        position: 'absolute',
        marginTop: 25,
        fontSize: 10,
        textAlign: 'center',
        marginLeft: `${-(100 / count) / 2}%`,
        width: `${100 / count}%`,
        left: `${tick.percent}%`
      }}
    >
      {format(tick.value)}
    </div>
  </div>
);

Tick.propTypes = {
  tick: PropType.shape({
    id: PropType.string.isRequired,
    value: PropType.number.isRequired,
    percent: PropType.number.isRequired
  }).isRequired,
  count: PropType.number.isRequired,
  format: PropType.func
};

Tick.defaultProps = {
  format: (d) => d
};

export default Tick;
