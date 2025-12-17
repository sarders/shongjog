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
                    <div style={{ padding: '0 1rem' }}>

                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
