import React from 'react';
import Hero from '../components/sections/Hero';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <Hero />
            <section className="home-links" style={{ marginTop: '-15vh', position: 'relative', zIndex: 10, textAlign: 'center', paddingBottom: '4rem' }}>
                <h2 style={{ color: 'var(--text-primary)', marginBottom: '1.5rem', fontSize: '1.5rem' }}>Cosa offriamo</h2>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                    <li><Link to="/statistics" className="home-link" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: '700', fontSize: '1.1rem', background: 'var(--bg-secondary)', padding: '10px 20px', borderRadius: '20px' }}>Statistica</Link></li>
                    <li><Link to="/economy" className="home-link" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: '700', fontSize: '1.1rem', background: 'var(--bg-secondary)', padding: '10px 20px', borderRadius: '20px' }}>Economia</Link></li>
                    <li><Link to="/tools" className="home-link" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: '700', fontSize: '1.1rem', background: 'var(--bg-secondary)', padding: '10px 20px', borderRadius: '20px' }}>Strumenti</Link></li>
                </ul>
                <div style={{ padding: '0 1rem' }}>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                        Un progetto <strong>open source</strong> aperto alla collaborazione della community. <a href="https://github.com/sarders/shongjog" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--link-color)' }}>Contribuisci su GitHub</a>
                    </p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Sviluppato sperimentando la metodologia <em>Vibecoding</em>.</p>
                </div>
            </section>
        </>
    );
};

export default Home;
