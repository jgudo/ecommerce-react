import React from 'react';

interface IProps {
	message: string;
	desc?: string;
	buttonLabel?: string;
	action?: () => void;
}

const MessageDisplay: React.FC<IProps> = ({ message, desc, buttonLabel, action }) => (
	<div className="loader">
		<h2 className="text-center">{message || 'Message'}</h2>
		{desc && <span>{desc}</span>}
		<br />
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
