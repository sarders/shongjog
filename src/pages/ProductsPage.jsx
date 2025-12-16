import React from 'react';
import Section from '../components/common/Section';
import NetSalaryCalculator from '../components/tools/NetSalaryCalculator';
import ExpenseSplitter from '../components/tools/ExpenseSplitter';
import CompoundInterestCalculator from '../components/tools/CompoundInterestCalculator';

const ProductsPage = () => {
    return (
        <div className="products-page">
            <Section id="tools-intro" title="Strumenti Utili">
                <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', color: 'var(--text-secondary)' }}>
                    Una raccolta di calcolatori e utility digitali progettati per semplificare la gestione quotidiana delle finanze e della vita in comune.
                </p>
            </Section>

            <Section id="salary-calculator" title="Calcolo Stipendio Netto">
                <NetSalaryCalculator />
            </Section>

            <Section id="interest-calculator" title="Calcolatore Interesse Composto">
                <CompoundInterestCalculator />
            </Section>

            <Section id="expense-splitter" title="Gestione Spese Casa">
                <ExpenseSplitter />
            </Section>
        </div>
    );
};

export default ProductsPage;
