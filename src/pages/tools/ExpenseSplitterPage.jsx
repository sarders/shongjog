import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Section from '../../components/common/Section';
import ExpenseSplitter from '../../components/tools/ExpenseSplitter';

const ExpenseSplitterPage = () => {
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

            <Section title="Gestione Spese Casa (Offline)">
                <p style={{ color: '#666', marginBottom: '30px' }}>Calcolatore locale e offline per suddividere spese immediate (es. la spesa al supermercato o una vacanza di gruppo) istantaneamente senza salvataggio sul cloud.</p>
                <ExpenseSplitter />
            </Section>
        </div>
    );
};

export default ExpenseSplitterPage;
