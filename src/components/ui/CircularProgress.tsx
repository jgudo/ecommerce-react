import { THEME_DARK, THEME_DEFAULT } from 'constants/constants';
import React from 'react';

interface IProps {
	style?: Record<string, string | number> | {};
	visible?: boolean;
	theme?: string;
}

const CircularProgress: React.FC<IProps> = ({ style, visible, theme }) => {
	const divClassName = (): string => {
		switch (theme) {
			case THEME_DEFAULT:
				return 'circular-progress-light';
			case THEME_DARK:
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
	theme: THEME_DARK,
	style: {}
};

export default CircularProgress;
