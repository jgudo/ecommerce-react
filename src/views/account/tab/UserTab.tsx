import React, { useState } from 'react';

interface IProps {
	children: any;
	[prop: string]: any;
}

const UserTab: React.FC<IProps> = ({ children }) => {
	const [activeTab, setActiveTab] = useState(children[0].props['data-index'] || 0);
	const onClickTabItem = (index: number) => setActiveTab(index);

	return (
		<div className="user-tab">
			<div className="user-tab-nav">
				<ul className="user-tab-menu">
					{children.map((child: any) => (
						<li
							className={`user-tab-item ${child.props['data-index'] === activeTab ? 'user-tab-active' : ''}`}
							key={child.props['data-label']}
							onClick={() => onClickTabItem(child.props['data-index'])}
						>
							{child.props['data-label']}
						</li>
					))}
				</ul>
			</div>
			<div className="user-tab-content">
				{children.map((child: any) => {
					if (child.props['data-index'] !== activeTab) return undefined;

					return child.props.children;
				})}
			</div>
		</div>
	);
};

export default UserTab;
