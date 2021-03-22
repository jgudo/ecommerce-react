import PropType from 'prop-types';
import React, { Component } from 'react';

class Boundary extends Component {
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  constructor(props) {
    super(props);

    this.state = {
      hasError: false
    };
  }


  componentDidCatch(error) {
    console.log(error);
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className="loader">
          <h3>:( Something went wrong.</h3>
        </div>
      );
    }

    return children;
  }
}

Boundary.propTypes = {
  children: PropType.oneOfType([
    PropType.arrayOf(PropType.node),
    PropType.node
  ]).isRequired
};

export default Boundary;
