import PropType from 'prop-types';
import React, { Component } from 'react';

class Handle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mouseOver: false
    };
  }


  onMouseEnter() {
    this.setState({ mouseOver: true });
  }

  onMouseLeave() {
    this.setState({ mouseOver: false });
  }

  render() {
    const {
      domain: [min, max],
      handle: { id, value, percent },
      isActive,
      disabled,
      getHandleProps
    } = this.props;
    const { mouseOver } = this.state;

    return (
      <>
        {(mouseOver || isActive) && !disabled ? (
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
          style={{
            left: `${percent}%`,
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            WebkitTapHighlightColor: 'rgba(0,0,0,0)',
            zIndex: 400,
            width: 26,
            height: 42,
            cursor: 'pointer',
            // border: '1px solid grey',
            backgroundColor: 'none'
          }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...getHandleProps(id, {
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave
          })}
        />
        <div
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          label="Slider"
          style={{
            left: `${percent}%`,
            position: 'absolute',
            transform: 'translate(-50%, -50%)',
            WebkitTapHighlightColor: 'rgba(0,0,0,0)',
            zIndex: 300,
            width: 24,
            height: 24,
            border: 0,
            borderRadius: '50%',
            boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)',
            backgroundColor: disabled ? '#666' : '#1a1a1a'
          }}
        />
      </>
    );
  }
}

Handle.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  domain: PropType.array.isRequired,
  handle: PropType.shape({
    id: PropType.string.isRequired,
    value: PropType.number.isRequired,
    percent: PropType.number.isRequired
  }).isRequired,
  getHandleProps: PropType.func.isRequired,
  isActive: PropType.bool.isRequired,
  disabled: PropType.bool
};

Handle.defaultProps = {
  disabled: false
};

export default Handle;
