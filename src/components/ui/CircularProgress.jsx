import React from 'react';
import PropTypes from 'prop-types';

const CircularProgress = ({ style, visible, theme }) => {
	const className = () => {
		switch (theme) {
			case 'light':
				return 'circular-progress-light';
			case 'dark':
				return 'circular-progress-dark';
			default:
				return null;
		}
	};

	return visible ? (
		<div
			className={className()}
			style={style}
		/>
	) : null;
};

CircularProgress.defaultProps = {
	visible: true,
	theme: 'dark',
	style: {}
};

CircularProgress.propType = {
	visible: PropTypes.bool,
	theme: PropTypes.string
};

export default CircularProgress;
