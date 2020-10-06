import React from 'react';

interface IProps {
	count: number;
	children?: React.ReactNode;
}

const Badge: React.FC<IProps> = ({ count, children }) => {
	return (
		<div className="badge">
			{children && children}
			{count >= 1 && <span className="badge-count">{count}</span>}
		</div>
	);
};

export default Badge;
