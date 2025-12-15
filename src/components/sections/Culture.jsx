import React from 'react';
import Section from '../common/Section';

const Culture = () => {
    return (
        <Section id="culture" title="Cultura">
            <div className="text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    Crediamo nella semplicità e nell'innovazione. La nostra cultura si basa sulla
                    ricerca costante della perfezione, non solo nel design ma anche nell'esperienza utente.
                    Ogni dettaglio conta, ogni pixel ha uno scopo.
                </p>
            </div>
        </Section>
    );
};

export default Culture;
