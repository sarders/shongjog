import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { collection, query, where, addDoc, serverTimestamp, doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Plus, Receipt, TrendingUp, TrendingDown, CheckCircle } from 'lucide-react';

const SharedAccountDetail = () => {
    const { id } = useParams();
    const { currentUser } = useAuth();

    const [account, setAccount] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    // Stato form aggiunta
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (!currentUser) return;

        // Recupero info del conto
        const fetchAccount = async () => {
            try {
                const docRef = doc(db, 'sharedAccounts', id);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    // Protezione: se l'utente non fa parte di questo conto
                    if (!data.members.includes(currentUser.uid)) {
                        setAccount('unauthorized');
                    } else {
                        setAccount({ id: docSnap.id, ...data });
                    }
                } else {
                    setAccount('not-found');
                }
            } catch (error) {
                console.error("Errore recupero conto:", error);
            }
        };

        fetchAccount();

        // Listener in tempo reale per le spese
        const expensesQuery = query(
            collection(db, 'expenses'),
            where('accountId', '==', id)
        );

        const unsubscribe = onSnapshot(expensesQuery, (snapshot) => {
            const expensesList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Ordina localmente per evitare errori di indice su Firestore
            expensesList.sort((a, b) => {
                const timeA = a.timestamp?.toMillis() || 0;
                const timeB = b.timestamp?.toMillis() || 0;
                return timeB - timeA; // Più recenti prima
            });

            setExpenses(expensesList);
            setLoading(false);
        });

        return () => unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, currentUser]);


    const handleAddExpense = async (e) => {
        e.preventDefault();
        if (!amount || isNaN(amount) || amount <= 0 || !description.trim()) return;

        try {
            await addDoc(collection(db, 'expenses'), {
                accountId: id,
                paidBy: currentUser.uid,
                amount: parseFloat(amount),
                description: description.trim(),
                timestamp: serverTimestamp()
            });

            setAmount('');
            setDescription('');
            setIsAddOpen(false);
        } catch (error) {
            console.error("Errore aggiunta spesa:", error);
            alert("Errore durante il salvataggio della spesa.");
        }
    };

    if (!currentUser) return <Navigate to="/" />;
    if (account === 'unauthorized' || account === 'not-found') return <Navigate to="/shared-expenses" />;

    if (loading || !account) {
        return <div style={{ textAlign: 'center', padding: '40px' }}>Caricamento conto in corso...</div>;
    }

    // Calcolo debiti
    const otherUserId = account.members.find(uid => uid !== currentUser.uid);
    const otherUser = account.memberDetails[otherUserId];


    let myTotal = 0;
    let otherTotal = 0;

    expenses.forEach(exp => {
        if (exp.paidBy === currentUser.uid) myTotal += exp.amount;
        else if (exp.paidBy === otherUserId) otherTotal += exp.amount;
    });

    const diff = myTotal - otherTotal; // Se positivo, ho pagato più io.
    const amountOwed = Math.abs(diff) / 2; // Quanto l'uno deve all'altro

    let balanceMessage = "";
    let balanceColor = "var(--text-primary)";
    let BalanceIcon = CheckCircle;

    if (diff > 0.01) {
        balanceMessage = `${otherUser.displayName.split(' ')[0]} ti deve ${amountOwed.toFixed(2)}€`;
        balanceColor = "#006a4e"; // Verde (positivo per me)
        BalanceIcon = TrendingUp;
    } else if (diff < -0.01) {
        balanceMessage = `Devi ${amountOwed.toFixed(2)}€ a ${otherUser.displayName.split(' ')[0]}`;
        balanceColor = "#d32f2f"; // Rosso (debito mio)
        BalanceIcon = TrendingDown;
    } else {
        balanceMessage = "Siete pari!";
        balanceColor = "#555";
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px', minHeight: '80vh' }}>
            {/* Header Navigation */}
            <div style={{ marginBottom: '20px' }}>
                <Link to="/shared-expenses" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ArrowLeft size={16} /> Torna ai Conti
                </Link>
            </div>

            {/* Dashboard Card */}
            <div style={{
                backgroundColor: 'var(--bg-primary)', borderRadius: '16px', overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)', marginBottom: '30px'
            }}>
                <div style={{ backgroundColor: '#006a4e', padding: '30px 20px', color: '#ffffff', textAlign: 'center' }}>
                    <h1 style={{ margin: '0 0 10px', fontSize: '24px' }}>
                        Conto con {otherUser.displayName}
                    </h1>
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: '10px',
                        backgroundColor: 'rgba(255,255,255,0.2)', padding: '12px 24px', borderRadius: '30px', marginTop: '10px'
                    }}>
                        <BalanceIcon size={24} color={balanceColor === '#006a4e' ? '#cce8de' : balanceColor === '#d32f2f' ? '#ffcdd2' : '#ffffff'} />
                        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>{balanceMessage}</span>
                    </div>
                </div>

                <div style={{ display: 'flex', border: '1px solid var(--border-color)' }}>
                    <div style={{ flex: 1, padding: '20px', textAlign: 'center', border: '1px solid var(--border-color)' }}>
                        <p style={{ margin: '0 0 5px', color: 'var(--text-secondary)', fontSize: '14px' }}>Tu hai pagato</p>
                        <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)' }}>{myTotal.toFixed(2)}€</p>
                    </div>
                    <div style={{ flex: 1, padding: '20px', textAlign: 'center' }}>
                        <p style={{ margin: '0 0 5px', color: 'var(--text-secondary)', fontSize: '14px' }}>{otherUser.displayName.split(' ')[0]} ha pagato</p>
                        <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: 'var(--text-primary)' }}>{otherTotal.toFixed(2)}€</p>
                    </div>
                </div>

                <div style={{ padding: '20px', backgroundColor: 'var(--bg-secondary)' }}>
                    <button
                        onClick={() => setIsAddOpen(!isAddOpen)}
                        style={{
                            width: '100%', backgroundColor: isAddOpen ? 'var(--bg-tertiary)' : '#006a4e', color: isAddOpen ? 'var(--text-primary)' : '#ffffff',
                            border: 'none', padding: '14px', borderRadius: '8px', cursor: 'pointer',
                            fontSize: '16px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px'
                        }}
                    >
                        {isAddOpen ? 'Annulla' : <><Plus size={20} /> Aggiungi Spesa</>}
                    </button>

                    {isAddOpen && (
                        <form onSubmit={handleAddExpense} style={{ marginTop: '20px', backgroundColor: 'var(--bg-primary)', padding: '20px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Descrizione</label>
                                <input
                                    type="text" required value={description} onChange={e => setDescription(e.target.value)}
                                    placeholder="Es. Cena pizzeria, Benzina..."
                                    style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '16px' }}
                                />
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Importo (€)</label>
                                <input
                                    type="number" step="0.01" min="0.01" required value={amount} onChange={e => setAmount(e.target.value)}
                                    placeholder="0.00"
                                    style={{ width: '100%', padding: '12px', border: '1px solid var(--border-color)', borderRadius: '6px', fontSize: '16px' }}
                                />
                            </div>
                            <button type="submit" style={{
                                width: '100%', backgroundColor: '#006a4e', color: '#ffffff', border: 'none',
                                padding: '14px', borderRadius: '6px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold'
                            }}>
                                Salva Spesa (Pagata da te)
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* Transaction List */}
            <h2 style={{ fontSize: '20px', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Receipt size={24} color="var(--text-secondary)" /> Tutte le Spese
            </h2>

            {expenses.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', backgroundColor: 'var(--bg-primary)', borderRadius: '12px', border: '1px dashed var(--border-color)' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>Nessuna spesa inserita. Aggiungi la prima!</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {expenses.map(exp => {
                        const isMine = exp.paidBy === currentUser.uid;
                        const payer = isMine ? 'Tu' : otherUser.displayName.split(' ')[0];

                        return (
                            <div key={exp.id} style={{
                                backgroundColor: 'var(--bg-primary)', padding: '16px 20px', borderRadius: '12px',
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                borderLeft: `6px solid ${isMine ? '#006a4e' : '#ccc'}`,
                                boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                            }}>
                                <div>
                                    <h4 style={{ margin: '0 0 4px', fontSize: '16px', color: 'var(--text-primary)' }}>{exp.description}</h4>
                                    <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-secondary)' }}>
                                        Pagato da <strong>{payer}</strong> il {exp.timestamp ? new Intl.DateTimeFormat('it-IT', { day: '2-digit', month: 'short' }).format(exp.timestamp.toDate()) : 'Ora'}
                                    </p>
                                </div>
                                <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                                    {exp.amount.toFixed(2)}€
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default SharedAccountDetail;
