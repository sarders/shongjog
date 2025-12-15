import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import './Header.css';

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
            <div className="container header-container">
                <Link to="/" className="logo">
                    Shongjog
                </Link>

                <nav className="nav">
                    <ul className="nav-list">
                        <li><Link to="/statistics" className={location.pathname === '/statistics' ? 'active' : ''}>Statistica</Link></li>
                        <li><Link to="/culture" className={location.pathname === '/culture' ? 'active' : ''}>Cultura</Link></li>
                        <li><Link to="/economy" className={location.pathname === '/economy' ? 'active' : ''}>Economia</Link></li>
                    </ul>
                </nav>

                <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
            </div>
        </header>
    );
};

export default Header;
