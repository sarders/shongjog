import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Section from '../components/common/Section';
import { Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import QuickNav from '../components/common/QuickNav';
import NetSalaryCalculator from '../components/tools/NetSalaryCalculator';
import ExpenseSplitter from '../components/tools/ExpenseSplitter';
import CompoundInterestCalculator from '../components/tools/CompoundInterestCalculator';
import RoomRentalCalculator from '../components/tools/RoomRentalCalculator';

const ProductsPage = () => {
    const { currentUser, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    return (
        <div className="products-page">
            <Section id="tools-intro" title="Strumenti Utili" className="section-compact">
                <p style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto', color: 'var(--text-secondary)' }}>
                    Una raccolta di calcolatori e utility digitali progettati per semplificare la gestione quotidiana delle finanze e della vita in comune.
                </p>

                {/* Banner per il nuovo strumento Cloud / Autenticato */}
                <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center' }}>
                    {currentUser ? (
                        <Link to="/shared-expenses" style={{
                            display: 'inline-flex', alignItems: 'center', gap: '12px',
                            backgroundColor: '#006a4e', color: 'white', padding: '16px 32px',
                            borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '18px',
                            boxShadow: '0 4px 12px rgba(0, 106, 78, 0.3)', transition: 'transform 0.2s'
                        }}>
                            <Users size={24} /> Entra in "Spese Condivise" (Beta)
                        </Link>
                    ) : (
                        <button onClick={async () => {
                            if (window.confirm("Per usare le Spese Condivise è necessario prima effettuare l'accesso.\n\nVuoi accedere ora con Google?")) {
                                try {
                                    await loginWithGoogle();
                                    navigate('/shared-expenses');
                                } catch (error) {
                                    // Errore già loggato o gestito in AuthContext, mostra avviso generico
                                    console.error(error);
                                }
                            }
                        }} style={{
                            display: 'inline-flex', alignItems: 'center', gap: '12px',
                            backgroundColor: '#006a4e', color: 'white', padding: '16px 32px',
                            borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: 'bold', fontSize: '18px',
                            boxShadow: '0 4px 12px rgba(0, 106, 78, 0.3)', transition: 'transform 0.2s',
                            fontFamily: 'inherit'
                        }}>
                            <Users size={24} /> Entra in "Spese Condivise" (Beta)
                        </button>
                    )}
                </div>
            </Section>

            <QuickNav />

            <Section id="room-rental-calculator" title="Calcolatore Affitto Posto Letto">
                <RoomRentalCalculator />
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
