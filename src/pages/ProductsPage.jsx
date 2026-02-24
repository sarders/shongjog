import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Banknote, TrendingUp, Calculator, Cloud } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import LoginPromptModal from '../components/common/LoginPromptModal';
import './ProductsPage.css';

const ProductsPage = () => {
    const { currentUser, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleCloudToolClick = (e) => {
        if (!currentUser) {
            e.preventDefault();
            setIsLoginModalOpen(true);
        }
    };

    const handleLoginFromModal = async () => {
        try {
            await loginWithGoogle();
            setIsLoginModalOpen(false);
            navigate('/shared-expenses');
        } catch (error) {
            console.error("Errore di login:", error);
        }
    };

    return (
        <div className="tools-dashboard">
            <header className="tools-header">
                <h1>Strumenti</h1>
                <p>Una suite di utility digitali progettate con eleganza per semplificarti la vita, gestire le tue finanze e organizzare la convivenza in Italia.</p>
            </header>

            <div className="tools-grid">

                {/* Strumento Cloud Premium */}
                <Link to="/shared-expenses" className="tool-card premium" onClick={handleCloudToolClick}>
                    <div className="tool-badge">Cloud Sync</div>
                    <div className="tool-icon-wrapper">
                        <Cloud size={32} />
                    </div>
                    <h2>Spese Condivise</h2>
                    <p>Crea un conto in tempo reale con i tuoi amici. Tieni traccia di tutte le spese e scopri automaticamente chi deve cosa a chi senza fare conti.</p>
                </Link>

                {/* Strumenti Locali */}
                <Link to="/tools/net-salary" className="tool-card">
                    <div className="tool-icon-wrapper">
                        <Banknote size={32} />
                    </div>
                    <h2>Stipendio Netto</h2>
                    <p>Calcola il tuo stipendio mensile reale partendo dalla RAL. Scopri l'impatto di tasse, IRPEF e detrazioni secondo il sistema fiscale italiano.</p>
                </Link>

                <Link to="/tools/room-rental" className="tool-card">
                    <div className="tool-icon-wrapper">
                        <Home size={32} />
                    </div>
                    <h2>Affitto Posto Letto</h2>
                    <p>Condividi casa? Calcola rapidamente quanto ogni conquilino dovrebbe pagare d'affitto basandoti sulla dimensione della stanza e sugli spazi comuni.</p>
                </Link>

                <Link to="/tools/compound-interest" className="tool-card">
                    <div className="tool-icon-wrapper">
                        <TrendingUp size={32} />
                    </div>
                    <h2>Interesse Composto</h2>
                    <p>Proietta i tuoi investimenti nel futuro. Scopri come i tuoi risparmi e versamenti mensili possono crescere esponenzialmente nel tempo.</p>
                </Link>

                <Link to="/tools/expense-splitter" className="tool-card">
                    <div className="tool-icon-wrapper">
                        <Calculator size={32} />
                    </div>
                    <h2>Split Spese Rapido</h2>
                    <p>Strumento semplice e offline per calcolare in volo chi deve rimborsare chi, ideale per un ristorante o spese di viaggio passeggere.</p>
                </Link>

            </div>

            {/* Modal di Login Autenticazione */}
            <LoginPromptModal
                isOpen={isLoginModalOpen}
                onClose={() => setIsLoginModalOpen(false)}
                onLogin={handleLoginFromModal}
            />
        </div>
    );
};

export default ProductsPage;
