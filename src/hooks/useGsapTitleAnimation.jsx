import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export const useGsapTitleAnimation = ({ selector = '.letter', animationOptions = {}, dependencies = [] }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            const elements = containerRef.current.querySelectorAll(selector);
            gsap.fromTo(elements, animationOptions.from, { ...animationOptions.to, stagger: animationOptions.stagger, delay: animationOptions.delay });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, dependencies); // Pass dependencies to re-run animation if anything changes

    return containerRef; // Return the ref so the component can attach it to the DOM element
};

