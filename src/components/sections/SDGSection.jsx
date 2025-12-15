import React from 'react';
import SDGCard from './SDGCard';
import { sdgData } from '../../data/sdgData';

const SDGSection = () => {
    return (
        <div className="sdg-section" style={{ marginTop: '64px' }}>
            <h3 className="section-subtitle" style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '8px',
                color: 'var(--text-primary)'
            }}>
                Indicatori Chiave della Comunità
            </h3>
            <p className="section-description" style={{
                color: 'var(--text-secondary)',
                marginBottom: '32px',
                maxWidth: '800px'
            }}>
                Dati specifici sulla comunità bangladese in Italia: integrazione, demografia e lavoro (Fonte: Ministero del Lavoro e ISTAT).
            </p>

            <div className="sdg-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '24px'
            }}>
                {sdgData.map((item) => (
                    <SDGCard key={item.id} data={item} />
                ))}
            </div>
        </div>
    );
};

export default SDGSection;
