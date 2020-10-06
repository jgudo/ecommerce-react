import React from 'react';

interface IProps {
	style?: Record<string, string | number> | {};
	visible?: boolean;
	theme?: string;
}

const CircularProgress: React.FC<IProps> = ({ style, visible, theme }) => {
	const divClassName = (): string => {
		switch (theme) {
			case 'light':
				return 'circular-progress-light';
			case 'dark':
				return 'circular-progress-dark';
			default:
				return '';
		}
	};

	return visible ? (
		<div
			className={divClassName()}
			style={style}
		/>
	) : null;
};

CircularProgress.defaultProps = {
	visible: true,
	theme: 'dark',
	style: {}
};

export default CircularProgress;
