import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Ensures the window smoothly scrolls back to the top whenever the route pathname changes.
 */
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;
