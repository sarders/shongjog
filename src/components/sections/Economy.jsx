import React from 'react';
import Section from '../common/Section';

const Economy = () => {
    return (
        <Section id="economy" title="Economia">
            <div className="flex flex-col items-center">
                <div style={{
                    background: 'linear-gradient(135deg, #FF6B6B 0%, #EE5253 100%)',
                    width: '100%',
                    maxWidth: '800px',
                    height: '300px',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: 'var(--font-size-xl)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
                }}>
                    Grafico Economico
                </div>
                <p style={{ marginTop: 'var(--spacing-lg)', color: 'var(--text-secondary)' }}>
                    Soluzioni economiche sostenibili per il futuro.
                </p>
            </div>
        </Section>
    );
};

export default Economy;
