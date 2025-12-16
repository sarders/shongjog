import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CompoundInterestCalculator = () => {
    const [principal, setPrincipal] = useState(1000);
    const [monthlyContribution, setMonthlyContribution] = useState(100);
    const [rate, setRate] = useState(5);
    const [years, setYears] = useState(10);
    const [data, setData] = useState([]);
    const [finalBalance, setFinalBalance] = useState(0);
    const [totalInvested, setTotalInvested] = useState(0);

    const calculate = () => {
        const p = parseFloat(principal) || 0;
        const pm = parseFloat(monthlyContribution) || 0;
        const r = parseFloat(rate) / 100 || 0;
        const y = parseFloat(years) || 1;

        let currentBalance = p;
        let invested = p;
        const newData = [];

        for (let i = 0; i <= y; i++) {
            newData.push({
                year: i,
                balance: Math.round(currentBalance),
                invested: Math.round(invested),
            });

            // Compound for next year (monthly compounding approximation for simplicity or simple annual step? Let's do monthly for accuracy)
            for (let m = 0; m < 12; m++) {
                currentBalance += pm;
                currentBalance *= (1 + r / 12);
                invested += pm;
            }
        }

        // Adjust last year slightly as the loop adds 12 more months after year 'y' in the last iteration logic above? 
        // Actually, let's fix the loop. Year 0 is start.
        // We want data points for Year 0, 1, ..., Y.

        let chartData = [];
        let runningBalance = p;
        let runningInvested = p;

        chartData.push({ year: 0, balance: p, invested: p });

        for (let i = 1; i <= y; i++) {
            for (let m = 0; m < 12; m++) {
                runningBalance += pm; // Add contribution
                runningBalance *= (1 + r / 12); // Add interest
                runningInvested += pm;
            }
            chartData.push({
                year: i,
                balance: Math.round(runningBalance),
                invested: Math.round(runningInvested)
            });
        }

        setData(chartData);
        setFinalBalance(runningBalance);
        setTotalInvested(runningInvested);
    };

    useEffect(() => {
        calculate();
    }, [principal, monthlyContribution, rate, years]);

    return (
        <div className="calculator-card" style={{
            background: 'var(--bg-secondary)',
            padding: 'var(--spacing-xl)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            maxWidth: '800px',
            margin: '0 auto'
        }}>
            <div className="input-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Capitale Iniziale (€)</label>
                    <input
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal(e.target.value)}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Contributo Mensile (€)</label>
                    <input
                        type="number"
                        value={monthlyContribution}
                        onChange={(e) => setMonthlyContribution(e.target.value)}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Interesse Annuo (%)</label>
                    <input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Durata (Anni)</label>
                    <input
                        type="number"
                        value={years}
                        onChange={(e) => setYears(e.target.value)}
                        style={inputStyle}
                    />
                </div>
            </div>

            <div className="results-summary" style={{ display: 'flex', gap: '24px', marginBottom: '32px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, padding: '20px', background: 'var(--bg-primary)', borderRadius: '8px', borderLeft: '4px solid #007aff' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Saldo Finale</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>€ {Math.round(finalBalance).toLocaleString()}</div>
                </div>
                <div style={{ flex: 1, padding: '20px', background: 'var(--bg-primary)', borderRadius: '8px', borderLeft: '4px solid #34c759' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Interesse Guadagnato</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#34c759' }}>€ {Math.round(finalBalance - totalInvested).toLocaleString()}</div>
                </div>
            </div>

            <div style={{ height: '300px', width: '100%' }}>
                <ResponsiveContainer>
                    <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                        <XAxis dataKey="year" stroke="var(--text-secondary)" />
                        <YAxis stroke="var(--text-secondary)" tickFormatter={(value) => `€${value / 1000}k`} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                            formatter={(value) => [`€ ${value.toLocaleString()}`, '']}
                        />
                        <Line type="monotone" dataKey="balance" stroke="#007aff" strokeWidth={3} dot={false} name="Saldo" />
                        <Line type="monotone" dataKey="invested" stroke="#34c759" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Investito" />
                    </LineChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid var(--border-color)',
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    fontSize: '1rem'
};

export default CompoundInterestCalculator;
