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
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            }
        );

        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
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
