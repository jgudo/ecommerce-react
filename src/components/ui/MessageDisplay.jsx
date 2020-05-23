import React from 'react';

const MessageDisplay = ({ message, desc, buttonLabel, action }) => (
	<div className="loader">
    <h2 className="text-center">{message || 'Message'}</h2>
    {desc && <span>{desc}</span>}
    <br/>
    {action && (
  		<button 
		      className="button button-small"
		      onClick={action}
		  >
		    {buttonLabel || 'Okay'}
		  </button>
    )}
  </div>
);

export default MessageDisplay;
