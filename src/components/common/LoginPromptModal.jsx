import React, { useEffect } from 'react';
import { Cloud, Lock } from 'lucide-react';
import './LoginPromptModal.css';

const LoginPromptModal = ({ isOpen, onClose, onLogin }) => {
    // Evita lo scrolling del body quando la modale è aperta
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-icon-container">
                    <Cloud size={40} />
                </div>
                <h2 className="modal-title">Sincronizzazione Cloud</h2>
                <p className="modal-description">
                    Per creare o visualizzare i tuoi conti di "Spese Condivise" è necessario essere autenticati. Accedi in modo sicuro per sincronizzare i tuoi dati su tutti i dispositivi.
                </p>

                <div className="modal-actions">
                    <button className="btn-primary" onClick={onLogin}>
                        <Lock size={20} />
                        Accedi con Google
                    </button>
                    <button className="btn-secondary" onClick={onClose}>
                        Annulla
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPromptModal;
