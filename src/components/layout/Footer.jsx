import React from 'react';
import './Footer.css';

import buildInfo from '../../build-info.json';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-links">
                    <p>&copy; {new Date().getFullYear()} Shongjog. All rights reserved.</p>
                </div>
                <div className="footer-version">
                    <p>v0.1.0 • {buildInfo.commitHash} • {buildInfo.commitDate}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
