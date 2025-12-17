import React from 'react';
import Section from '../common/Section';
import './Hero.css';

const Hero = () => {
    return (
        <Section id="hero" className="hero-section">
            <div className="hero-content text-center">
                <h1 className="hero-title">Shongjog</h1>
                <p className="hero-subtitle">Semplice. Intuitivo. Per tutti.</p>

                <div className="hero-description-anim">
                    <p>Un progetto <strong>open source</strong> aperto alla collaborazione della community. <a href="https://github.com/sarders/shongjog" target="_blank" rel="noopener noreferrer">Contribuisci su GitHub</a></p>
                    <p className="vibecoding-text">Sviluppato sperimentando la metodologia <em>Vibecoding</em>.</p>
                </div>
            </div>
        </Section>
    );
};

export default Hero;
