import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { displayMoney } from 'helpers/utils';

interface IProps {
	initMin: number;
	initMax: number;
	min: number;
	max: number;
	productsLength: number;
	onPriceChange: (min: number, max: number) => void;
}

const PriceRange: React.FC<IProps> = (props) => {
	const [minState, setMinState] = useState(props.initMin ? props.initMin : props.min);
	const [maxState, setMaxState] = useState(props.initMax ? props.initMax : props.max);
	const [inputError, setInputError] = useState(false);
	const slider = useRef<HTMLDivElement>(null);
	const rangeMin = useRef<HTMLInputElement>(null);
	const rangeMax = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setMinState(props.initMin ? props.initMin : props.min);
		setMaxState(props.initMax ? props.initMax : props.max);
	}, [props.initMin, props.initMax]);

	const onRangeChange = () => {
		let slide1 = rangeMin.current ? +rangeMin.current.value : 0;
		let slide2 = rangeMax.current ? +rangeMax.current.value : 0;

		if (slide1 > slide2) {
			[slide1, slide2] = [slide2, slide1];
		}

		setMinState(slide1);
		setMaxState(slide2);
		setInputError(false);
		props.onPriceChange(slide1, slide2);
	};

	const onInputMinChange = (e: ChangeEvent<HTMLInputElement>) => setMinState(Number(e.target.value));
	const onInputMaxChange = (e: ChangeEvent<HTMLInputElement>) => setMaxState(Number(e.target.value));

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

export default PriceRange;
