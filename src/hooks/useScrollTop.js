import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useScrollTop = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
};

export default useScrollTop;
