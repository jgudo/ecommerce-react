import React, { useEffect } from 'react';

const ScrollToTop = Component => (props) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [props.location])

    return <Component {...props}/>
};

export default ScrollToTop;
