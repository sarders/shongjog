import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import { Users, Search, Plus, ArrowRight, UserPlus } from 'lucide-react';

const SharedExpensesPage = () => {
    const { currentUser } = useAuth();
    const [accounts, setAccounts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Stato per la modale di creazione
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [searchEmail, setSearchEmail] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [searchError, setSearchError] = useState('');
    const [pendingEmailInvite, setPendingEmailInvite] = useState('');
    const [showInviteSuccess, setShowInviteSuccess] = useState(false);

    useEffect(() => {
        if (!currentUser) return;
        fetchAccounts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    const fetchAccounts = async () => {
        setLoading(true);
        try {
            const accountsRef = collection(db, 'sharedAccounts');
            const q = query(
                accountsRef,
                where('members', 'array-contains', currentUser.uid)
            );
            const snapshot = await getDocs(q);

            const accountsList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Ordine lato client (manca indice composito su Firestore)
            accountsList.sort((a, b) => {
                const timeA = a.createdAt?.toMillis() || 0;
                const timeB = b.createdAt?.toMillis() || 0;
                return timeB - timeA;
            });

            setAccounts(accountsList);
        } catch (error) {
            console.error("Errore nel caricamento conti:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchUser = async (e) => {
        e.preventDefault();
        setSearchError('');
        setSearchResult(null);
        setPendingEmailInvite('');
        setShowInviteSuccess(false);

        if (searchEmail.toLowerCase() === currentUser.email.toLowerCase()) {
            setSearchError("Non puoi creare un conto con te stesso!");
            return;
        }

        try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('email', '==', searchEmail.toLowerCase()));
            const snapshot = await getDocs(q);

            if (snapshot.empty) {
                setPendingEmailInvite(searchEmail.toLowerCase());
            } else {
                setSearchResult(snapshot.docs[0].data());
            }
        } catch (error) {
            setSearchError("Errore durante la ricerca.");
            console.error(error);
        }
    };

    const handleCreateAccount = async () => {
        if (!searchResult) return;

        try {
            // Ottimizzazione: controllare se esiste già un conto con queste due persone esatte
            const newAccount = {
                members: [currentUser.uid, searchResult.uid],
                memberDetails: {
                    [currentUser.uid]: {
                        displayName: currentUser.displayName,
                        email: currentUser.email,
                        photoURL: currentUser.photoURL || null
                    },
                    [searchResult.uid]: {
                        displayName: searchResult.displayName,
                        email: searchResult.email,
                        photoURL: searchResult.photoURL || null
                    }
                },
                createdAt: serverTimestamp()
            };

            await addDoc(collection(db, 'sharedAccounts'), newAccount);
            setIsCreateModalOpen(false);
            setSearchEmail('');
            setSearchResult(null);
            fetchAccounts(); // Ricarica la lista
        } catch (error) {
            console.error("Errore nella creazione del conto:", error);
            alert("Errore durante la creazione del conto condiviso.");
        }
    };

    const handleCreatePendingAccount = async () => {
        if (!pendingEmailInvite) return;

        try {
            const newAccount = {
                members: [currentUser.uid], // Solo io sono il membro effettivo per ora
                pendingEmail: pendingEmailInvite,
                memberDetails: {
                    [currentUser.uid]: {
                        displayName: currentUser.displayName,
                        email: currentUser.email,
                        photoURL: currentUser.photoURL || null
                    },
                    [`pending_${pendingEmailInvite}`]: {
                        displayName: "In attesa di registrazione",
                        email: pendingEmailInvite,
                        isPending: true
                    }
                },
                createdAt: serverTimestamp()
            };

            await addDoc(collection(db, 'sharedAccounts'), newAccount);
            fetchAccounts();

            // Mostriamo la modale di successo
            setShowInviteSuccess(true);
        } catch (error) {
            console.error("Errore nella creazione del conto in attesa:", error);
            alert("Errore durante la creazione del conto in attesa.");
        }
    };

    const copyInviteText = () => {
        const text = `Ciao! Ti ho appena aggiunto a un conto per tracciare le nostre spese condivise su Shongjog.\n\n` +
            `Per vedere il conto e aggiungere le tue spese registrati da qui usando la tua email (${pendingEmailInvite}):\n` +
            `https://shongjog.it/tools\n\n` +
            `A presto!\n${currentUser.displayName}`;
        navigator.clipboard.writeText(text);
        alert("Messaggio copiato negli appunti! Inviagli questo messaggio su WhatsApp o via Email.");

        setIsCreateModalOpen(false);
        setSearchEmail('');
        setPendingEmailInvite('');
        setShowInviteSuccess(false);
    };

    if (!currentUser) return <Navigate to="/" />;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', minHeight: '80vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '28px', color: '#006a4e', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Users size={32} /> Spese Condivise
                    </h1>
                    <p style={{ margin: '5px 0 0', color: 'var(--text-secondary)' }}>Tieni traccia di chi deve cosa a chi.</p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    style={{
                        backgroundColor: '#006a4e', color: '#ffffff', border: 'none',
                        padding: '12px 20px', borderRadius: '8px', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold'
                    }}
                >
                    <Plus size={20} /> Nuovo Conto
                </button>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '40px' }}>Caricamento in corso...</div>
            ) : accounts.length === 0 ? (
                <div style={{
                    backgroundColor: 'var(--bg-secondary)', border: '1px dashed var(--border-color)', borderRadius: '12px',
                    padding: '60px 20px', textAlign: 'center'
                }}>
                    <Users size={48} color="#006a4e" style={{ opacity: 0.5, marginBottom: '16px' }} />
                    <h3 style={{ margin: '0 0 10px', color: 'var(--text-primary)' }}>Nessun conto condiviso</h3>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>Cerca un amico tramite la sua email per iniziare.</p>
                    <button
                        onClick={() => setIsCreateModalOpen(true)}
                        style={{
                            backgroundColor: 'var(--bg-primary)', color: '#006a4e', border: '2px solid #006a4e',
                            padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'
                        }}
                    >
                        Crea il tuo primo conto
                    </button>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '16px' }}>
                    {accounts.map(acc => {
                        // Trova chi è l'altro utente nel conto
                        let otherUser = null;

                        if (acc.members.length === 1 && acc.pendingEmail) {
                            // È un conto in attesa
                            otherUser = acc.memberDetails[`pending_${acc.pendingEmail}`];
                        } else {
                            // È un conto attivo
                            const otherUserId = acc.members.find(id => id !== currentUser.uid);
                            otherUser = acc.memberDetails[otherUserId];
                        }

                        return (
                            <Link
                                to={`/shared-expenses/${acc.id}`}
                                key={acc.id}
                                style={{
                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                    backgroundColor: 'var(--bg-primary)', padding: '20px', borderRadius: '12px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textDecoration: 'none', color: 'inherit',
                                    border: '1px solid var(--border-color)', transition: 'transform 0.2s, box-shadow 0.2s'
                                }}
                                onMouseOver={e => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                                }}
                                onMouseOut={e => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{
                                        width: '50px', height: '50px', borderRadius: '50%',
                                        backgroundColor: '#e2f5ee', display: 'flex', alignItems: 'center',
                                        justifyContent: 'center', color: '#006a4e', overflow: 'hidden'
                                    }}>
                                        {otherUser?.photoURL ? (
                                            <img src={otherUser.photoURL} alt="Avatar" style={{ width: '100%', height: '100%' }} />
                                        ) : (
                                            <Users size={24} />
                                        )}
                                    </div>
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--text-primary)' }}>
                                            Conto con {otherUser?.isPending ? otherUser.email : (otherUser?.displayName?.split(' ')[0] || 'Utente')}
                                        </h3>
                                        <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--text-secondary)' }}>
                                            {otherUser?.isPending ? 'In attesa di registrazione...' : otherUser?.email}
                                        </p>
                                    </div>
                                </div>
                                <ArrowRight color="#ccc" />
                            </Link>
                        );
                    })}
                </div>
            )}

            {/* Modal Creazione */}
            {isCreateModalOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center',
                    justifyContent: 'center', zIndex: 1100, padding: '20px'
                }}>
                    <div style={{
                        backgroundColor: 'var(--bg-primary)', borderRadius: '16px', padding: '30px',
                        width: '100%', maxWidth: '420px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                    }}>
                        {!showInviteSuccess ? (
                            <>
                                <h2 style={{ margin: '0 0 20px', color: 'var(--text-primary)', fontSize: '20px' }}>Nuovo Conto Condiviso</h2>
                                <form onSubmit={handleSearchUser}>
                                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                                        Email dell'utente con cui condividere le spese:
                                    </label>
                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                                        <input
                                            type="email"
                                            value={searchEmail}
                                            onChange={(e) => setSearchEmail(e.target.value)}
                                            placeholder="email@esempio.com"
                                            required
                                            style={{
                                                flex: 1, padding: '10px 12px', border: '1px solid var(--border-color)', borderRadius: '8px', fontSize: '16px'
                                            }}
                                        />
                                        <button type="submit" style={{
                                            backgroundColor: 'var(--bg-secondary)', border: 'none', borderRadius: '8px', padding: '0 16px', cursor: 'pointer'
                                        }}>
                                            <Search size={20} color="#555" />
                                        </button>
                                    </div>
                                </form>

                                {searchError && <p style={{ color: 'red', fontSize: '14px', margin: '0 0 16px' }}>{searchError}</p>}

                                {searchResult && (
                                    <div style={{
                                        backgroundColor: '#f0f9f6', border: '1px solid #cce8de', borderRadius: '8px',
                                        padding: '16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px'
                                    }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#006a4e', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                            {searchResult.photoURL ? <img src={searchResult.photoURL} alt="" style={{ width: '100%', height: '100%' }} /> : <UserPlus size={20} />}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <p style={{ margin: 0, fontWeight: 'bold', color: '#006a4e' }}>{searchResult.displayName}</p>
                                            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)' }}>Trovato!</p>
                                        </div>
                                        <button
                                            onClick={handleCreateAccount}
                                            style={{
                                                backgroundColor: '#006a4e', color: '#ffffff', border: 'none',
                                                borderRadius: '6px', padding: '8px 16px', cursor: 'pointer', fontWeight: 'bold'
                                            }}
                                        >
                                            Crea
                                        </button>
                                    </div>
                                )}

                                {pendingEmailInvite && (
                                    <div style={{
                                        backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '8px',
                                        padding: '16px', marginBottom: '20px', textAlign: 'center'
                                    }}>
                                        <p style={{ margin: '0 0 12px 0', color: 'var(--text-primary)', fontSize: '15px' }}>
                                            <strong>{pendingEmailInvite}</strong> non è ancora registrato su Shongjog.
                                        </p>
                                        <p style={{ margin: '0 0 16px 0', color: 'var(--text-secondary)', fontSize: '14px' }}>
                                            Crea il conto in sospeso. L'app genererà un messaggio di invito che potrai copiare e inviare comodamente alla sua email o su WhatsApp!
                                        </p>
                                        <button
                                            onClick={handleCreatePendingAccount}
                                            style={{
                                                width: '100%', backgroundColor: '#006a4e', color: '#ffffff', border: 'none',
                                                borderRadius: '6px', padding: '12px', cursor: 'pointer', fontWeight: 'bold'
                                            }}
                                        >
                                            Crea Conto in Sospeso
                                        </button>
                                    </div>
                                )}

                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '10px' }}>
                                    <button
                                        onClick={() => { setIsCreateModalOpen(false); setSearchResult(null); setSearchEmail(''); setSearchError(''); setPendingEmailInvite(''); setShowInviteSuccess(false); }}
                                        style={{ backgroundColor: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '8px 16px' }}
                                    >
                                        Annulla
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#e2f5ee', color: '#006a4e', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                                    <Users size={32} />
                                </div>
                                <h2 style={{ margin: '0 0 10px', color: 'var(--text-primary)', fontSize: '22px' }}>Conto Creato! 🎉</h2>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: 1.5 }}>
                                    Il conto con l'ospite <strong>{pendingEmailInvite}</strong> è pronto! Ora inserisci le tue spese.<br /><br />
                                    Per far iscrivere l'utente al volo, copia l'invito qui sotto e inviaglielo su <strong>WhatsApp</strong>, Telegram o Email!
                                </p>
                                <div style={{ padding: '15px', backgroundColor: 'var(--bg-secondary)', border: '1px dashed var(--border-color)', borderRadius: '8px', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px', textAlign: 'left', fontStyle: 'italic' }}>
                                    "Ciao! Ti ho aggiunto a un conto per le nostre spese su Shongjog. Iscriviti subito con la tua email {pendingEmailInvite} qui: https://shongjog.it/tools"
                                </div>
                                <button
                                    onClick={copyInviteText}
                                    style={{
                                        width: '100%', backgroundColor: '#006a4e', color: '#ffffff', border: 'none',
                                        borderRadius: '8px', padding: '14px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px', marginBottom: '12px'
                                    }}
                                >
                                    Copia Messaggio d'Invito
                                </button>
                                <button
                                    onClick={() => { setIsCreateModalOpen(false); setSearchResult(null); setSearchEmail(''); setPendingEmailInvite(''); setShowInviteSuccess(false); }}
                                    style={{ backgroundColor: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '8px 16px', fontWeight: '500' }}
                                >
                                    Chiudi e Inizia a Inserire Spese
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SharedExpensesPage;
