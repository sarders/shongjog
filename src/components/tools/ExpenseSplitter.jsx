import React, { useState } from 'react';

const ExpenseSplitter = () => {
    const [people, setPeople] = useState([]);
    const [newPerson, setNewPerson] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({ payer: '', amount: '', description: '' });
    const [settlements, setSettlements] = useState([]);

    const addPerson = () => {
        if (newPerson && !people.includes(newPerson)) {
            setPeople([...people, newPerson]);
            setNewPerson('');
            // Set default payer if first person
            if (people.length === 0) {
                setNewExpense({ ...newExpense, payer: newPerson });
            }
        }
    };

    const addExpense = () => {
        if (newExpense.payer && newExpense.amount && newExpense.description) {
            setExpenses([...expenses, { ...newExpense, amount: parseFloat(newExpense.amount) }]);
            setNewExpense({ ...newExpense, amount: '', description: '' });
        }
    };

    const calculateSplit = () => {
        if (people.length === 0 || expenses.length === 0) return;

        const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
        const sharePerPerson = totalSpent / people.length;

        // Calculate balances
        const balances = {};
        people.forEach(p => balances[p] = -sharePerPerson); // Start with debit of fair share

        expenses.forEach(exp => {
            if (balances[exp.payer] !== undefined) {
                balances[exp.payer] += exp.amount; // Add what they paid
            }
        });

        // Separate debtors and creditors
        const debtors = [];
        const creditors = [];

        Object.entries(balances).forEach(([name, balance]) => {
            if (balance < -0.01) debtors.push({ name, amount: -balance }); // Owe money
            if (balance > 0.01) creditors.push({ name, amount: balance }); // Receive money
        });

        // Settle debts
        const newSettlements = [];
        let i = 0; // debtor index
        let j = 0; // creditor index

        while (i < debtors.length && j < creditors.length) {
            const debtor = debtors[i];
            const creditor = creditors[j];

            const paying = Math.min(debtor.amount, creditor.amount);

            newSettlements.push({
                from: debtor.name,
                to: creditor.name,
                amount: paying
            });

            debtor.amount -= paying;
            creditor.amount -= paying;

            if (debtor.amount < 0.01) i++;
            if (creditor.amount < 0.01) j++;
        }

        setSettlements(newSettlements);
    };

    return (
        <div className="calculator-card" style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--spacing-xl)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            maxWidth: '600px',
            margin: '0 auto'
        }}>
            {/* 1. Add People */}
            <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--border-color)' }}>
                <h4 style={{ marginBottom: '12px' }}>1. Coinmilini/Partecipanti</h4>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <input
                        type="text"
                        value={newPerson}
                        onChange={(e) => setNewPerson(e.target.value)}
                        placeholder="Nome (es. Marco)"
                        style={{ flex: '1 1 200px', padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                    />
                    <button onClick={addPerson} style={{ padding: '0 20px', background: 'var(--bg-tertiary)', border: 'none', borderRadius: '8px', cursor: 'pointer', color: 'var(--text-primary)' }}>+</button>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
                    {people.map(p => (
                        <span key={p} style={{ background: '#007aff20', color: '#007aff', padding: '4px 12px', borderRadius: '16px', fontSize: '0.9rem' }}>{p}</span>
                    ))}
                </div>
            </div>

            {/* 2. Add Expenses */}
            <div style={{ marginBottom: '24px' }}>
                <h4 style={{ marginBottom: '12px' }}>2. Spese Sostenute</h4>
                <div style={{ display: 'grid', gap: '12px', marginBottom: '12px' }}>
                    <select
                        value={newExpense.payer}
                        onChange={(e) => setNewExpense({ ...newExpense, payer: e.target.value })}
                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                    >
                        <option value="">Chi ha pagato?</option>
                        {people.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <input
                        type="text"
                        placeholder="Descrizione (es. Bolletta Luce)"
                        value={newExpense.description}
                        onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                    />
                    <input
                        type="number"
                        placeholder="Importo €"
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                        style={{ padding: '10px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}
                    />
                    <button onClick={addExpense} style={{ padding: '12px', background: '#34c759', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Aggiungi Spesa</button>
                </div>

                {expenses.length > 0 && (
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: '150px', overflowY: 'auto' }}>
                        {expenses.map((exp, idx) => (
                            <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-color)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                <span><strong>{exp.payer}</strong>: {exp.description}</span>
                                <span>€ {exp.amount.toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <button
                onClick={calculateSplit}
                disabled={people.length < 2 || expenses.length === 0}
                style={{
                    width: '100%',
                    padding: '14px',
                    background: people.length < 2 ? 'var(--bg-tertiary)' : '#af52de',
                    color: people.length < 2 ? 'var(--text-secondary)' : 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: people.length < 2 ? 'not-allowed' : 'pointer'
                }}
            >
                Calcola Pareggio
            </button>

            {settlements.length > 0 && (
                <div style={{ marginTop: '24px', background: 'var(--bg-primary)', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #af52de' }}>
                    <h4 style={{ marginBottom: '12px' }}>Come pareggiare:</h4>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {settlements.map((s, idx) => (
                            <li key={idx} style={{ padding: '8px 0', fontSize: '1.1rem' }}>
                                <strong>{s.from}</strong> deve dare <span style={{ color: '#af52de', fontWeight: 'bold' }}>€ {s.amount.toFixed(2)}</span> a <strong>{s.to}</strong>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ExpenseSplitter;
