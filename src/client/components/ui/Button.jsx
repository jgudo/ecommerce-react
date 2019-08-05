import React from 'react';

const Button = (props) => {
  return (
    <button {...props} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
