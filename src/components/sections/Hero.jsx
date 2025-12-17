import React from 'react';
import Section from '../common/Section';
import './Hero.css';

const Hero = () => {
    return (
        <Section id="hero" className="hero-section">
            <div className="hero-content text-center">
                <h1 className="hero-title">Shongjog</h1>
                <p className="hero-subtitle">Semplice. Intuitivo. Per tutti.</p>
            </div>
        </Section>
    );
};

export default Hero;
