import React, { Component } from 'react'
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'
import { SliderRail, Handle, Track, Tick } from './PriceRangeComponents' // example render components - source below

const sliderStyle = {
	position: 'relative',
	width: '100%',
}

class PriceRange extends Component {
	state = {
		domain: [
			this.props?.initMin || this.props.min,
			this.props?.initMax || this.props.max
		],
		values: [this.props?.initMin || this.props.min, this.props?.initMax || this.props.max].slice(),
		update: [this.props.min, this.props.max].slice(),
		inputMin: this.props?.initMin || this.props.min,
		inputMax: this.props?.initMax || this.props.max,
		inputError: false,
		reversed: false,
	}

	onUpdate = update => {
		this.setState({ update, inputMin: update[0], inputMax: update[1] })
	}

	onChange = values => {
		this.setState({ values, inputMin: values[0], inputMax: values[1] });
		this.props.onPriceChange(...values);
	}

	setDomain = domain => {
		this.setState({ domain })
	}

	inputClassName = () => {
		return this.state.inputError ? 'price-range-input price-input-error' : 'price-range-input';
	};

	onBlurInput = () => {
		let valMin = +this.state.inputMin;
		let valMax = +this.state.inputMax;

		if (valMin < this.props.min) {
			valMin = this.props.min;
		} else if (valMax > this.props.max) {
			valMax = this.props.max;
		}

		if (valMin > valMax) {
			this.setState({ inputError: true });
		} else {
			this.setState({ inputError: false });
		}

		this.setState({ inputMin: valMin, inputMax: valMax, values: [valMin, valMax] });
		this.props.onPriceChange(valMin, valMax);
	};

	onInputMinChange = e => {
		const val = e.target.value;
		this.setState({ inputMin: val, values: [val, this.state.values[1]] });
	}

	onInputMaxChange = e => {
		const val = e.target.value;
		this.setState({ inputMax: val, values: [this.state.values[0], 1] });
	}

	render() {
		const {
			state: { values, update, inputMin, inputMax },
		} = this

		return (
			<div style={{ height: 120, width: '100%' }}>
				<div className="price-range-control">
					<input
						className={this.inputClassName()}
						disabled={this.props.productsLength === 0}
						max={this.props.max}
						min={this.props.min}
						onBlur={this.onBlurInput}
						onChange={this.onInputMinChange}
						type="number"
						value={inputMin}
					/>
        —
				<input
						className={this.inputClassName()}
						disabled={this.props.productsLength === 0}
						max={this.props.max}
						min={this.props.min}
						onBlur={this.onBlurInput}
						onChange={this.onInputMaxChange}
						type="number"
						value={inputMax}
					/>
				</div>
				<Slider
					mode={1}
					step={1}
					domain={this.state.domain}
					rootStyle={sliderStyle}
					onUpdate={this.onUpdate}
					onChange={this.onChange}
					values={values}
				>
					<Rail>
						{({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
					</Rail>
					<Handles>
						{({ handles, activeHandleID, getHandleProps }) => (
							<div className="slider-handles">
								{handles.map(handle => (
									<Handle
										key={handle.id}
										handle={handle}
										domain={this.state.values}
										isActive={handle.id === activeHandleID}
										getHandleProps={getHandleProps}
									/>
								))}
							</div>
						)}
					</Handles>
					<Tracks left={false} right={false}>
						{({ tracks, getTrackProps }) => (
							<div className="slider-tracks">
								{tracks.map(({ id, source, target }) => (
									<Track
										key={id}
										source={source}
										target={target}
										getTrackProps={getTrackProps}
									/>
								))}
							</div>
						)}
					</Tracks>
					<Ticks count={5}>
						{({ ticks }) => (
							<div className="slider-ticks">
								{ticks.map(tick => (
									<Tick key={tick.id} tick={tick} count={ticks.length} />
								))}
							</div>
						)}
					</Ticks>
				</Slider>
			</div>
		)
	}
}

export default PriceRange;
