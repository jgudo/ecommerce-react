import { LoadingOutlined } from '@ant-design/icons';
import React, { useState } from 'react';

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
      {!loaded && <LoadingOutlined style={{ position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, margin: 'auto' }} />}
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