import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { displayMoney } from 'helpers/utils';

const PriceRange = (props) => {
	const [minState, setMinState] = useState(props.initMin ? props.initMin : props.min);
	const [maxState, setMaxState] = useState(props.initMax ? props.initMax : props.max);
	const [inputError, setInputError] = useState(false);
	const slider = useRef(null);
	const rangeMin = useRef(null);
	const rangeMax = useRef(null);

	useEffect(() => {
		setMinState(props.initMin ? props.initMin : props.min);
		setMaxState(props.initMax ? props.initMax : props.max);
	}, [props.initMin, props.initMax]);

	const onRangeChange = () => {
		let slide1 = +rangeMin.current.value;
		let slide2 = +rangeMax.current.value;

		if (slide1 > slide2) {
			[slide1, slide2] = [slide2, slide1];
		}

		setMinState(slide1);
		setMaxState(slide2);
		setInputError(false);
		props.onPriceChange(slide1, slide2);
	};

	const onInputMinChange = e => setMinState(e.target.value);
	const onInputMaxChange = e => setMaxState(e.target.value);

	const onBlurInput = () => {
		let valMin = +minState;
		let valMax = +maxState;

		if (valMin < props.min) {
			valMin = props.min;
		} else if (valMax > props.max) {
			valMax = props.max;
		}

		if (valMin > valMax) {
			setInputError(true);
		} else {
			setInputError(false);
		}

		setMinState(valMin);
		setMaxState(valMax);
		props.onPriceChange(valMin, valMax);
	};

	const inputClassName = () => {
		return inputError ? 'price-range-input price-input-error' : 'price-range-input';
	};

	return (
		<div
			className="price-range"
			ref={slider}
		>
			<div className="price-range-control">
				<input
					className={inputClassName()}
					disabled={props.productsLength === 0}
					max={props.max}
					min={props.min}
					onBlur={onBlurInput}
					onChange={onInputMinChange}
					type="number"
					value={minState}
				/>
        —
				<input
					className={inputClassName()}
					disabled={props.productsLength === 0}
					max={props.max}
					min={props.min}
					onBlur={onBlurInput}
					onChange={onInputMaxChange}
					type="number"
					value={maxState}
				/>
			</div>
			<div className="price-range-control">
				<input
					className="price-range-slider"
					disabled={props.productsLength === 0}
					max={props.max}
					min={props.min}
					onChange={onRangeChange}
					ref={rangeMin}
					step="50"
					type="range"
					value={minState}
				/>
				<input
					className="price-range-slider"
					disabled={props.productsLength === 0}
					max={props.max}
					min={props.min}
					onChange={onRangeChange}
					ref={rangeMax}
					step="20"
					type="range"
					value={maxState}
				/>
			</div>
			<div className="price-range-scale">
				<span className="price-range-price">MIN: {displayMoney(props.min)}</span>
				<span className="price-range-price">MAX: {displayMoney(props.max)}</span>
			</div>
		</div>
	);
};

PriceRange.propType = {
	min: PropTypes.number,
	max: PropTypes.number,
	initMin: PropTypes.number,
	initMax: PropTypes.number,
	productsLength: PropTypes.number,
	onPriceChange: PropTypes.func
};

export default PriceRange;
