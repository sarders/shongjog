import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { LogOut, User as UserIcon, Calendar, Clock, ArrowLeft } from 'lucide-react';

const ProfilePage = () => {
    const { currentUser, logout } = useAuth();
    const [loginHistory, setLoginHistory] = useState([]);
    const [loadingHistory, setLoadingHistory] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            if (!currentUser) return;

            try {
                const historyRef = collection(db, 'loginHistory');
                const q = query(
                    historyRef,
                    where('uid', '==', currentUser.uid)
                );

                const querySnapshot = await getDocs(q);
                const history = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Ordina lato client per evitare la necessità di un indice composito su Firestore
                history.sort((a, b) => {
                    const timeA = a.timestamp?.toMillis() || 0;
                    const timeB = b.timestamp?.toMillis() || 0;
                    return timeB - timeA; // Ordine discendente (più recenti prima)
                });

                setLoginHistory(history);
            } catch (error) {
                console.error('Errore nel recupero della cronologia:', error);
            } finally {
                setLoadingHistory(false);
            }
        };

        fetchHistory();
    }, [currentUser]);

    if (!currentUser) {
        return <Navigate to="/" />;
    }

    // Funzione per formattare la data
    const formatDate = (timestamp) => {
        if (!timestamp) return 'Subito';
        const date = timestamp.toDate();
        return new Intl.DateTimeFormat('it-IT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).format(date);
    };

    // Funzione per formattare l'orario
    const formatTime = (timestamp) => {
        if (!timestamp) return 'Caricamento';
        const date = timestamp.toDate();
        return new Intl.DateTimeFormat('it-IT', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format(date);
    };

    return (
        <div className="profile-page" style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '40px 20px',
            minHeight: '80vh'
        }}>
            {/* Header / Navigation Navigation */}
            <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'none', border: 'none', color: 'var(--text-secondary)',
                        textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px',
                        cursor: 'pointer', padding: '8px 0', fontSize: '16px', fontWeight: '500', transition: 'color 0.2s'
                    }}
                    onMouseOver={e => e.currentTarget.style.color = 'var(--text-primary)'}
                    onMouseOut={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                    <ArrowLeft size={20} /> Torna Indietro
                </button>
            </div>

            <div style={{
                backgroundColor: 'var(--bg-primary)',
                borderRadius: '24px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                overflow: 'hidden',
                marginBottom: '32px',
                border: '1px solid var(--border-color)'
            }}>
                <div style={{
                    backgroundColor: '#006a4e',
                    padding: '40px 30px',
                    color: '#ffffff',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '24px'
                }}>
                    {currentUser.photoURL ? (
                        <img
                            src={currentUser.photoURL}
                            alt={currentUser.displayName}
                            style={{ width: '80px', height: '80px', borderRadius: '50%', border: '4px solid white' }}
                        />
                    ) : (
                        <div style={{
                            width: '80px', height: '80px',
                            borderRadius: '50%', backgroundColor: '#e2f5ee',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            color: '#006a4e', border: '4px solid white'
                        }}>
                            <UserIcon size={40} />
                        </div>
                    )}
                    <div>
                        <h1 style={{ margin: 0, fontSize: '24px' }}>{currentUser.displayName || 'Utente'}</h1>
                        <p style={{ margin: '5px 0 0', opacity: 0.9 }}>{currentUser.email}</p>
                    </div>
                    <button
                        onClick={logout}
                        style={{
                            marginLeft: 'auto',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            border: 'none',
                            padding: '10px 16px',
                            borderRadius: '8px',
                            color: 'white',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.3)'}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)'}
                    >
                        <LogOut size={18} /> Esci
                    </button>
                </div>

                <div style={{ padding: '30px', backgroundColor: 'var(--bg-primary)' }}>
                    <h2 style={{ color: 'var(--text-primary)', marginTop: 0, marginBottom: '20px', fontSize: '20px' }}>
                        Cronologia Accessi
                    </h2>

                    {loadingHistory ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                            Caricamento in corso...
                        </div>
                    ) : loginHistory.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)', backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', border: '1px dashed var(--border-color)' }}>
                            Nessun accesso registrato.
                        </div>
                    ) : (
                        <div style={{ border: '1px solid var(--border-color)', borderRadius: '12px', overflow: 'hidden' }}>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '500px' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                                            <th style={{ padding: '16px 20px', color: 'var(--text-primary)', fontWeight: '600', fontSize: '15px' }}>Data</th>
                                            <th style={{ padding: '16px 20px', color: 'var(--text-primary)', fontWeight: '600', fontSize: '15px' }}>Ora</th>
                                            <th style={{ padding: '16px 20px', color: 'var(--text-primary)', fontWeight: '600', fontSize: '15px' }}>Dispositivo/Browser</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {loginHistory.map((login, idx) => (
                                            <tr key={login.id} style={{
                                                borderBottom: idx === loginHistory.length - 1 ? 'none' : '1px solid var(--border-color)',
                                                backgroundColor: 'var(--bg-primary)'
                                            }}>
                                                <td style={{ padding: '16px 20px', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }}>
                                                    <Calendar size={18} color="var(--accent-color)" />
                                                    {login.timestamp ? formatDate(login.timestamp) : 'Ora'}
                                                </td>
                                                <td style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontSize: '15px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                                        <Clock size={16} color="var(--text-secondary)" />
                                                        {login.timestamp ? formatTime(login.timestamp) : 'Caricamento'}
                                                    </div>
                                                </td>
                                                <td style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontSize: '14px' }}>
                                                    Accesso Google: {login.email}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
