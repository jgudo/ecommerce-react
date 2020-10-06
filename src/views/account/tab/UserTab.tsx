import React, { useState } from 'react';

const UserTab = (props) => {
	const [activeTab, setActiveTab] = useState(props.children[0].props.index || 0);
	const onClickTabItem = index => setActiveTab(index);

	return (
		<div className="user-tab">
			<div className="user-tab-nav">
				<ul className="user-tab-menu">
					{props.children.map(child => (
						<li
							className={`user-tab-item ${child.props.index === activeTab ? 'user-tab-active' : ''}`}
							key={child.props.label}
							onClick={() => onClickTabItem(child.props.index)}
						>
							{child.props.label}
						</li>
					))}
				</ul>
			</div>
			<div className="user-tab-content">
				{props.children.map((child) => {
					if (child.props.index !== activeTab) return undefined;

					return child.props.children;
				})}
			</div>
		</div>
	);
};

export default UserTab;
