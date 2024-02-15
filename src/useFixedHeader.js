// useFixedHeader.js
import { useState, useEffect } from 'react';

const useFixedHeader = (scrollThreshold) => {
    const [isFixed, setIsFixed] = useState(true);

    useEffect(() => {
        const checkScroll = () => {
            setIsFixed(window.scrollY < scrollThreshold);
        };

        window.addEventListener('scroll', checkScroll);

        return () => {
            window.removeEventListener('scroll', checkScroll);
        };
    }, [scrollThreshold]);

    return isFixed;
};

export default useFixedHeader;
