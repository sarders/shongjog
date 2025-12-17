import React, { useRef, useEffect, useState } from 'react';
import './Section.css';

const Section = ({ id, title, children, className = '' }) => {
    const sectionRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = sectionRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(element); // Stop observing once visible
                }
            },
            {
                threshold: 0, // Trigger as soon as any part is visible
                rootMargin: '0px 0px -50px 0px' // Slightly easier trigger than -100px
            }
        );

        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.disconnect();
            }
        };
    }, []);

    return (
        <section
            id={id}
            ref={sectionRef}
            className={`section ${isVisible ? 'fade-in' : ''} ${className}`}
        >
            <div className="container">
                {title && <h2 className="section-title">{title}</h2>}
                <div className="section-content">
                    {children}
                </div>
            </div>
        </section>
    );
};

export default Section;
