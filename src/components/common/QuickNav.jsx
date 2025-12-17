import React, { useEffect, useState } from 'react';
import './QuickNav.css';

const links = [
    { id: 'room-rental-calculator', label: 'Affitto' },
    { id: 'salary-calculator', label: 'Stipendio' },
    { id: 'interest-calculator', label: 'Interessi' },
    { id: 'expense-splitter', label: 'Spese' },
];

const QuickNav = () => {
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            const sections = links.map(link => document.getElementById(link.id));
            const scrollPosition = window.scrollY + 150; // Offset for header + padding

            for (const section of sections) {
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;

                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        setActiveSection(section.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [links]);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <nav className="quick-nav">
            <div className="quick-nav-container">
                <ul className="quick-nav-list">
                    {links.map(link => (
                        <li key={link.id} className="quick-nav-item">
                            <button
                                className={`quick-nav-link ${activeSection === link.id ? 'active' : ''}`}
                                onClick={() => scrollToSection(link.id)}
                            >
                                {link.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default QuickNav;
