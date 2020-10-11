import React, { useState } from 'react';
import CircularProgress from './CircularProgress';

interface IProps {
	className?: string;
	alt?: string;
	src: string;
}

const spinnerStyle: React.CSSProperties = {
	position: 'absolute',
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	margin: 'auto'
};

const ImageLoader: React.FC<IProps> = (props) => {
	const _loaded = {};
	const [loaded, setLoaded] = useState(_loaded[props.src]);
	const onLoad = () => {
		_loaded[props.src] = true;
		setLoaded(true);
	};

	return (
		<>
			{!loaded && <CircularProgress style={spinnerStyle} />}
			<img
				alt={props.alt || ''}
				className={`${props.className || ''} ${loaded ? 'is-img-loaded' : 'is-img-loading'}`}
				onLoad={onLoad}
				src={props.src}
			/>
		</>
	);
};

export default ImageLoader;