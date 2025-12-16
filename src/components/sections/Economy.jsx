import React from 'react';
import Section from '../common/Section';

const Economy = () => {
    return (
        <Section id="economy" title="Economia">
            return (
            <Section id="economy" title="Economia">
                <div className="economy-content" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2xl)' }}>

                    {/* Intro Text */}
                    <div className="economy-intro" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                            La comunità bangladese si distingue per un eccezionale <strong>spirito imprenditoriale</strong> e un contributo fondamentale all'economia italiana e del paese d'origine.
                        </p>
                    </div>

                    {/* Stats Grid */}
                    <div className="economy-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: 'var(--spacing-xl)'
                    }}>
                        {/* Entrepreneurship */}
                        <div className="stat-card" style={{
                            background: 'var(--bg-secondary)',
                            padding: 'var(--spacing-xl)',
                            borderRadius: 'var(--radius-lg)',
                            borderLeft: '4px solid #34c759'
                        }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--spacing-sm)' }}>Imprenditoria</h3>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: 'var(--spacing-sm)', color: 'var(--text-primary)' }}>4° Posto</div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                Tra le comunità non-UE per numero di titolari di imprese individuali in Italia.
                            </p>
                        </div>

                        {/* Remittances */}
                        <div className="stat-card" style={{
                            background: 'var(--bg-secondary)',
                            padding: 'var(--spacing-xl)',
                            borderRadius: 'var(--radius-lg)',
                            borderLeft: '4px solid #af52de'
                        }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--spacing-sm)' }}>Rimesse (2023)</h3>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: 'var(--spacing-sm)', color: 'var(--text-primary)' }}>&gt; €1 Miliardo</div>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                                Somma inviata in patria dall'Italia, rendendo il Bangladesh la prima destinazione per rimesse.
                            </p>
                        </div>

                        {/* Sectors */}
                        <div className="stat-card" style={{
                            background: 'var(--bg-secondary)',
                            padding: 'var(--spacing-xl)',
                            borderRadius: 'var(--radius-lg)',
                            borderLeft: '4px solid #007aff'
                        }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: 'var(--spacing-sm)' }}>Settori Chiave</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                <li style={{ marginBottom: '8px' }}>• Commercio al dettaglio</li>
                                <li style={{ marginBottom: '8px' }}>• Ristorazione e Turismo</li>
                                <li style={{ marginBottom: '8px' }}>• Piccola Industria</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Section>
            );
        </Section>
    );
};

export default Economy;
