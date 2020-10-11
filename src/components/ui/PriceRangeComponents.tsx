import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { SliderItem } from 'react-compound-slider';

// *******************************************************
// TOOLTIP RAIL
// *******************************************************
const railStyle: React.CSSProperties = {
	position: 'absolute',
	width: '100%',
	transform: 'translate(0%, -50%)',
	height: 20,
	cursor: 'pointer',
	zIndex: 300
	// border: '1px solid grey',
};

const railCenterStyle: React.CSSProperties = {
	position: 'absolute',
	width: '100%',
	transform: 'translate(0%, -50%)',
	height: 14,
	borderRadius: 7,
	cursor: 'pointer',
	pointerEvents: 'none',
	backgroundColor: '#d0d0d0'
};

interface IProps {
	activeHandleID: string;
	getEventData: any;
	getRailProps: (props: any) => void;
}

export class TooltipRail extends Component<IProps> {
	static defaultProps = {
		disabled: false
	};

	state = {
		value: null,
		percent: null
	};

	onMouseEnter = () => {
		document.addEventListener('mousemove', this.onMouseMove);
	}

	onMouseLeave = () => {
		this.setState({ value: null, percent: null })
		document.removeEventListener('mousemove', this.onMouseMove);
	}

	onMouseMove = (e: MouseEvent) => {
		const { activeHandleID, getEventData } = this.props;

		if (activeHandleID) {
			this.setState({ value: null, percent: null });
		} else {
			this.setState(getEventData(e));
		}
	}

	render() {
		const { value, percent } = this.state;
		const { activeHandleID, getRailProps } = this.props;

		return (
			<Fragment>
				{!activeHandleID && value ? (
					<div
						style={{
							left: `${percent}%`,
							position: 'absolute',
							marginLeft: '-11px',
							marginTop: '-35px',
						}}
					>
						<div className="tooltip">
							<span className="tooltiptext">Value: {value}</span>
						</div>
					</div>
				) : null}
				<div
					style={railStyle}
					{...getRailProps({
						onMouseEnter: this.onMouseEnter,
						onMouseLeave: this.onMouseLeave,
					})}
				/>
				<div style={railCenterStyle} />
			</Fragment>
		);
	}
}

// *******************************************************
// SLIDER RAIL (no tooltips)
// *******************************************************
const railOuterStyle: React.CSSProperties = {
	position: 'absolute',
	transform: 'translate(0%, -50%)',
	width: '100%',
	height: 42,
	borderRadius: 7,
	cursor: 'pointer',
	// border: '1px solid grey',
};

const railInnerStyle: React.CSSProperties = {
	position: 'absolute',
	width: '100%',
	height: 14,
	transform: 'translate(0%, -50%)',
	borderRadius: 7,
	pointerEvents: 'none',
	backgroundColor: '#d0d0d0',
};

export function SliderRail({ getRailProps }) {
	return (
		<Fragment>
			<div style={railOuterStyle} {...getRailProps()} />
			<div style={railInnerStyle} />
		</Fragment>
	);
}

SliderRail.propTypes = {
	getRailProps: PropTypes.func.isRequired,
};

// *******************************************************
// HANDLE COMPONENT
// *******************************************************

interface IHandleProps {
	domain: number[];
	handle: SliderItem;
	isActive: boolean;
	disabled: boolean;
	getHandleProps: any;
}

export class Handle extends Component<IHandleProps> {
	static defaultProps = {
		disabled: false
	};

	state = {
		mouseOver: false
	};

	onMouseEnter = () => {
		this.setState({ mouseOver: true });
	}

	onMouseLeave = () => {
		this.setState({ mouseOver: false });
	}

	render() {
		const {
			domain: [min, max],
			handle: { id, value, percent },
			isActive,
			disabled,
			getHandleProps
		} = this.props;
		const { mouseOver } = this.state;

		return (
			<Fragment>
				{(mouseOver || isActive) && !disabled ? (
					<div
						style={{
							left: `${percent}%`,
							position: 'absolute',
							marginLeft: '-11px',
							marginTop: '-35px',
						}}
					>
						<div className="tooltip">
							<span className="tooltiptext">Value: {value}</span>
						</div>
					</div>
				) : null}
				<div
					style={{
						left: `${percent}%`,
						position: 'absolute',
						transform: 'translate(-50%, -50%)',
						WebkitTapHighlightColor: 'rgba(0,0,0,0)',
						zIndex: 400,
						width: 26,
						height: 42,
						cursor: 'pointer',
						// border: '1px solid grey',
						backgroundColor: 'none',
					}}
					{...getHandleProps(id, {
						onMouseEnter: this.onMouseEnter,
						onMouseLeave: this.onMouseLeave,
					})}
				/>
				<div
					role="slider"
					aria-valuemin={min}
					aria-valuemax={max}
					aria-valuenow={value}
					style={{
						left: `${percent}%`,
						position: 'absolute',
						transform: 'translate(-50%, -50%)',
						WebkitTapHighlightColor: 'rgba(0,0,0,0)',
						zIndex: 300,
						width: 24,
						height: 24,
						border: 0,
						borderRadius: '50%',
						boxShadow: '1px 1px 1px 1px rgba(0, 0, 0, 0.2)',
						backgroundColor: disabled ? '#666' : '#1a1a1a',
					}}
				/>
			</Fragment>
		);
	}
}

// *******************************************************
// TRACK COMPONENT
// *******************************************************
export function Track({ source, target, getTrackProps, disabled }) {
	return (
		<div
			style={{
				position: 'absolute',
				transform: 'translate(0%, -50%)',
				height: 14,
				zIndex: 1,
				backgroundColor: disabled ? '#ffd993' : '#ffa500',
				borderRadius: 7,
				cursor: 'pointer',
				left: `${source.percent}%`,
				width: `${target.percent - source.percent}%`,
			}}
			{...getTrackProps()}
		/>
	);
}

Track.propTypes = {
	source: PropTypes.shape({
		id: PropTypes.string.isRequired,
		value: PropTypes.number.isRequired,
		percent: PropTypes.number.isRequired,
	}).isRequired,
	target: PropTypes.shape({
		id: PropTypes.string.isRequired,
		value: PropTypes.number.isRequired,
		percent: PropTypes.number.isRequired,
	}).isRequired,
	getTrackProps: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
};

Track.defaultProps = {
	disabled: false,
};

// *******************************************************
// TICK COMPONENT
// *******************************************************
export function Tick({ tick, count, format }) {
	return (
		<div>
			<div
				style={{
					position: 'absolute',
					marginTop: 17,
					width: 1,
					height: 5,
					backgroundColor: 'rgb(200,200,200)',
					left: `${tick.percent}%`,
				}}
			/>
			<div
				style={{
					position: 'absolute',
					marginTop: 25,
					fontSize: 10,
					textAlign: 'center',
					marginLeft: `${-(100 / count) / 2}%`,
					width: `${100 / count}%`,
					left: `${tick.percent}%`,
				}}
			>
				{format(tick.value)}
			</div>
		</div>
	);
}

Tick.propTypes = {
	tick: PropTypes.shape({
		id: PropTypes.string.isRequired,
		value: PropTypes.number.isRequired,
		percent: PropTypes.number.isRequired,
	}).isRequired,
	count: PropTypes.number.isRequired,
	format: PropTypes.func.isRequired
};

Tick.defaultProps = {
	format: d => d
};
