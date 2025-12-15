import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-links">
                    <p>&copy; {new Date().getFullYear()} Shongjog. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
