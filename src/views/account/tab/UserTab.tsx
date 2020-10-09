import React, { useState } from 'react';

const UserTab: React.FC<React.ReactNode> = ({ children }) => {
	const [activeTab, setActiveTab] = useState(children[0].props.index || 0);
	const onClickTabItem = index => setActiveTab(index);

	return (
		<div className="user-tab">
			<div className="user-tab-nav">
				<ul className="user-tab-menu">
					{children.map(child => (
						<li
							className={`user-tab-item ${child.index === activeTab ? 'user-tab-active' : ''}`}
							key={child.label}
							onClick={() => onClickTabItem(child.index)}
						>
							{child.label}
						</li>
					))}
				</ul>
			</div>
			<div className="user-tab-content">
				{children.map((child: React.ReactNode) => {
					if (child.index !== activeTab) return undefined;

					return child.children;
				})}
			</div>
		</div>
	);
};

export default UserTab;
