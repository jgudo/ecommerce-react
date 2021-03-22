import PropType from 'prop-types';
import React, { Component } from 'react';

const railStyle = {
  position: 'absolute',
  width: '100%',
  transform: 'translate(0%, -50%)',
  height: 20,
  cursor: 'pointer',
  zIndex: 300
  // border: '1px solid grey',
};

const railCenterStyle = {
  position: 'absolute',
  width: '100%',
  transform: 'translate(0%, -50%)',
  height: 14,
  borderRadius: 7,
  cursor: 'pointer',
  pointerEvents: 'none',
  backgroundColor: '#d0d0d0'
};

class TooltipRail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: null,
      percent: null
    };
  }

  onMouseEnter() {
    document.addEventListener('mousemove', this.onMouseMove);
  }

  onMouseLeave() {
    this.setState({ value: null, percent: null });
    document.removeEventListener('mousemove', this.onMouseMove);
  }

  onMouseMove(e) {
    const { activeHandleID, getEventData } = this.props;

    if (activeHandleID) {
      this.setState({ value: null, percent: null });
    } else {
      this.setState(getEventData(e));
    }
  }

  render() {
    const { value, percent } = this.state;
    const { activeHandleID, getRailProps } = this.props;

    return (
      <>
        {!activeHandleID && value ? (
          <div
            style={{
              left: `${percent}%`,
              position: 'absolute',
              marginLeft: '-11px',
              marginTop: '-35px'
            }}
          >
            <div className="tooltip">
              <span className="tooltiptext">
                Value:
                {value}
              </span>
            </div>
          </div>
        ) : null}
        <div
          style={railStyle}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...getRailProps({
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave
          })}
        />
        <div style={railCenterStyle} />
      </>
    );
  }
}

TooltipRail.defaultProps = {
  getEventData: undefined,
  activeHandleID: undefined,
  disabled: false
};

TooltipRail.propTypes = {
  getEventData: PropType.func,
  activeHandleID: PropType.string,
  getRailProps: PropType.func.isRequired,
  disabled: PropType.bool
};

export default TooltipRail;
