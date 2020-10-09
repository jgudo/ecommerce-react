import React, { ReactElement, useState } from 'react';

interface IProps {
	children: ReactElement | ReactElement[];
}

const UserTab: React.FC<IProps> = ({ children }) => {
	const [activeTab, setActiveTab] = useState(children[0].props.index || 0);
	const onClickTabItem = (index: number) => setActiveTab(index);

	return (
		<div className="user-tab">
			<div className="user-tab-nav">
				<ul className="user-tab-menu">
					{children.map((child: any) => (
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
				{children.map((child: any) => {
					if (child.index !== activeTab) return undefined;

					return child.children;
				})}
			</div>
		</div>
	);
};

export default UserTab;
