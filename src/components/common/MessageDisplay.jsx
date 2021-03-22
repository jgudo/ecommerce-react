import PropType from 'prop-types';
import React from 'react';

const MessageDisplay = ({
  message, description, buttonLabel, action
}) => (
  <div className="loader">
    <h2 className="text-center" style={{ wordBreak: 'break-all' }}>{message || 'Message'}</h2>
    {description && <span>{description}</span>}
    <br />
    {action && (
      <button
        className="button button-small"
        onClick={action}
        type="button"
      >
        {buttonLabel || 'Okay'}
      </button>
    )}
  </div>
);

MessageDisplay.defaultProps = {
  description: undefined,
  buttonLabel: 'Okay',
  action: undefined
};

MessageDisplay.propTypes = {
  message: PropType.string.isRequired,
  description: PropType.string,
  buttonLabel: PropType.string,
  action: PropType.func
};

export default MessageDisplay;
