import React, { useRef } from 'react';
import useIntersectionObserver from './Hook_scroll';

const AnimatedSection = ({ children, className = '' }) => {
    const sectionRef = useRef(null);
    const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.1 });

    return (
        <div ref={sectionRef} className={`${className} transition-opacity duration-1000 ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}>
            {children}
        </div>
    );
};

export default AnimatedSection;
