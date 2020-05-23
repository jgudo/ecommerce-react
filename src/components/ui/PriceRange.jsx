import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { displayMoney } from 'helpers/utils';

const PriceRange = (props) => {
  const [minState, setMinState] = useState(props.initMin ? props.initMin : props.min);
  const [maxState, setMaxState] = useState(props.initMax ? props.initMax : props.max);
  const slider = useRef(null);
  const inputMin = useRef(null);
  const inputMax = useRef(null);
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
    props.onPriceChange(slide1, slide2);
  };

  const onInputChange = () => {
    const valMin = +inputMin.current.value;
    const valMax = +inputMax.current.value;
    
    if (valMin > valMax) {
      const tmp = valMin;
      inputMin.current.value = valMax;
      inputMax.current.value = tmp;
    }

    setMinState(valMin);
    setMaxState(valMax);
    props.onPriceChange(valMin, valMax);
  };

  return (
    <div 
        className="price-range" 
        ref={slider}
    >
      <div className="price-range-control">
        <input 
            className="price-range-input"
            disabled={props.productsLength === 0}
            max={props.max}
            min={props.min} 
            onChange={onInputChange}
            ref={inputMin}
            type="number" 
            value={minState}
          />
        — 
        <input 
            className="price-range-input"
            disabled={props.productsLength === 0}
            max={props.max}
            min={props.min}
            onChange={onInputChange}
            ref={inputMax}
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
        <span className="price-range-price">{displayMoney(props.min)}</span>
        <span className="price-range-price">{displayMoney(props.max)}</span>
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
