import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import './Header.css';

const Header = () => {
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    return (
        <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
            <div className="container header-container">
                <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
                    Shongjog
                </Link>

                <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
                    <ul className="nav-list">
                        <li>
                            <Link to="/statistics" onClick={() => setIsMenuOpen(false)}>Statistica</Link>
                        </li>
                        <li>
                            <Link to="/economy" onClick={() => setIsMenuOpen(false)}>Economia</Link>
                        </li>
                        <li>
                            <Link to="/tools" onClick={() => setIsMenuOpen(false)}>Strumenti</Link>
                        </li>
                        <li>
                            <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                                {theme === 'light' ? '🌙' : '☀️'}
                            </button>
                        </li>
                    </ul>
                </nav>

                {/* Mobile Menu Button - Moved to end for right alignment */}
                <button
                    className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle navigation"
                >
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>
            </div>
        </header>
    );
};

export default Header;
