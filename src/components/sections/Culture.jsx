import React from 'react';
import Section from '../common/Section';

const Culture = () => {
    return (
        <Section id="culture" title="Cultura">
            <div className="culture-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'var(--spacing-xl)',
                marginTop: 'var(--spacing-xl)'
            }}>
                {/* Festivals Card */}
                <div className="info-card" style={{
                    background: 'var(--bg-secondary)',
                    padding: 'var(--spacing-xl)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)'
                }}>
                    <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Festività e Tradizioni</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                        Il <strong>Boishakhi Mela</strong> (Capodanno Bengalese) è l'evento più atteso, unendo la comunità con colori, musica e cibo tradizionale.
                        Altre ricorrenze fondamentali includono la <em>Giornata Internazionale della Lingua Madre</em> (21 febbraio) e le celebrazioni religiose di Eid.
                    </p>
                </div>

                {/* Banglatown Card */}
                <div className="info-card" style={{
                    background: 'var(--bg-secondary)',
                    padding: 'var(--spacing-xl)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)'
                }}>
                    <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Il Cuore della Comunità</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                        Roma ospita la più grande comunità in Europa continentale. Quartieri come <strong>Torpignattara</strong> sono divenuti veri centri culturali ("Banglatown"),
                        punti di riferimento per l'acquisto di prodotti tipici, spezie e tessuti tradizionali.
                    </p>
                </div>

                {/* Integration Card */}
                <div className="info-card" style={{
                    background: 'var(--bg-secondary)',
                    padding: 'var(--spacing-xl)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-color)'
                }}>
                    <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Associazionismo</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                        Centinaia di associazioni attive sul territorio promuovono l'integrazione attraverso scuole di italiano, supporto legale e mediazione culturale,
                        mantenendo vivo il legame con le radici attraverso l'insegnamento della lingua bengalese alle seconde generazioni.
                    </p>
                </div>
            </div>
        </Section>
    );
};

export default Culture;
