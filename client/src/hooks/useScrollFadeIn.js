import { useEffect, useRef } from 'react';

export const useScrollFadeIn = (options = { threshold: 0.1, rootMargin: '0px' }) => {
    const ref = useRef(null);

    useEffect(() => {
        const currentRef = ref.current;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [options]);

    return ref;
};

export const useMultiScrollFadeIn = (options = { threshold: 0.1, rootMargin: '0px' }) => {
    const elementsRef = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        elementsRef.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => {
            elementsRef.current.forEach((el) => {
                if (el) observer.unobserve(el);
            });
        };
    }, [options]);

    // Callback ref function
    const setRef = (el) => {
        if (el && !elementsRef.current.includes(el)) {
            elementsRef.current.push(el);
        }
    };

    return setRef;
};
