import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Section from '../../components/common/Section';
import CompoundInterestCalculator from '../../components/tools/CompoundInterestCalculator';

const CompoundInterestPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px', minHeight: '80vh' }}>
            <Link to="/tools" style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                color: '#666', textDecoration: 'none', marginBottom: '20px',
                fontWeight: '500', transition: 'color 0.2s'
            }}
                onMouseOver={e => e.currentTarget.style.color = '#006a4e'}
                onMouseOut={e => e.currentTarget.style.color = '#666'}
            >
                <ArrowLeft size={16} /> Torna agli Strumenti
            </Link>

            <Section title="Calcolatore Interesse Composto">
                <p style={{ color: '#666', marginBottom: '30px' }}>Visualizza il potenziale di crescita dei tuoi investimenti nel tempo sfruttando la forza dell'interesse composto.</p>
                <CompoundInterestCalculator />
            </Section>
        </div>
    );
};

export default CompoundInterestPage;
