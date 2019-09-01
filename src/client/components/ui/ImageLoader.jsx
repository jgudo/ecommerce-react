import React, { useState } from 'react';
import CircularProgress from './CircularProgress';

const ImageLoader = (props) => {
  const _loaded = {};
  const spinnerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 'auto'
  };
  const [loaded, setLoaded] = useState(_loaded[props.src]);

  const onLoad = () => {
    _loaded[props.src] = true;
    setLoaded(true);
  };

  return (
    <>

      {!loaded && <CircularProgress style={spinnerStyle}/>} 
      <img 
          className={`${props.className} ${loaded ? 'is-img-loaded' : 'is-img-loading'}`} 
          onLoad={onLoad} 
          src={props.src} 
      />
    </>  
  );
};

ImageLoader.defaultProps = {
  className: ''
};

export default ImageLoader;