import React from 'react';
import Hero from '../components/sections/Hero';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <>
            <Hero />
            <section className="home-links" style={{ marginTop: '2rem', textAlign: 'center' }}>
                <h2 style={{ color: 'var(--text-primary)', marginBottom: '1rem' }}>Cosa offriamo</h2>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem' }}>
                    <li><Link to="/statistics" className="home-link" style={{ color: 'var(--link-color)', textDecoration: 'none', fontWeight: '600' }}>Statistica</Link></li>
                    <li><Link to="/economy" className="home-link" style={{ color: 'var(--link-color)', textDecoration: 'none', fontWeight: '600' }}>Economia</Link></li>
                    <li><Link to="/tools" className="home-link" style={{ color: 'var(--link-color)', textDecoration: 'none', fontWeight: '600' }}>Strumenti</Link></li>
                </ul>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    In questo progetto può lavorarci <strong>ciunique</strong>. <a href="https://github.com/sarders/shongjog" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--link-color)' }}>GitHub</a>
                </p>
                <p style={{ color: 'var(--text-secondary)' }}>Questo progetto è nato per provare <em>vibecoading</em>.</p>
            </section>
        </>
    );
};

export default Home;
