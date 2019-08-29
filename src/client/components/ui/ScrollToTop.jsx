import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthStatus, isAuthenticating } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';

const ScrollToTop = Component => withRouter((props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const { pathname } = props.location;

        window.scrollTo(0, 0);
        if (pathname === '/signin' || pathname === '/signup' || pathname === '/forgot_password') {
            dispatch(setAuthStatus(null));
            dispatch(isAuthenticating(false));
        }
    }, [])

    return <Component {...props}/>
});

export default ScrollToTop;
