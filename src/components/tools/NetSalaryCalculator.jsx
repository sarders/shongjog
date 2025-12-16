import React, { useState } from 'react';

const NetSalaryCalculator = () => {
    const [ral, setRal] = useState('');
    const [months, setMonths] = useState(13);
    const [region, setRegion] = useState('lombardia'); // Default placeholder
    const [result, setResult] = useState(null);

    const calculateNet = () => {
        const gross = parseFloat(ral);
        if (!gross || isNaN(gross)) return;

        // 1. INPS (Social Security) - Approx 9.19% for employees
        const inpsRate = 0.0919;
        const inps = gross * inpsRate;
        const taxableIncome = gross - inps;

        // 2. IRPEF (Income Tax) - 2024 Brackets (Simplified)
        // 0 - 28k: 23%
        // 28k - 50k: 35%
        // > 50k: 43%
        let irpef = 0;
        if (taxableIncome <= 28000) {
            irpef = taxableIncome * 0.23;
        } else if (taxableIncome <= 50000) {
            irpef = 6440 + (taxableIncome - 28000) * 0.35;
        } else {
            irpef = 14140 + (taxableIncome - 50000) * 0.43;
        }

        // 3. Regional + Municipal Taxes (Add-on) - Simplified Avg 2%
        const localTax = taxableIncome * 0.02;

        // 4. Detrazioni (Standard Deduction for Employees) - Simplified Algorithm
        // < 15k: ~1880
        // 15-28k: Curve
        // 28-50k: Curve
        // > 50k: 0
        let deduction = 0;
        if (taxableIncome < 15000) {
            deduction = 1880;
        } else if (taxableIncome < 28000) {
            deduction = 1910 + 1190 * ((28000 - taxableIncome) / 13000);
        } else if (taxableIncome < 50000) {
            deduction = 1910 * ((50000 - taxableIncome) / 22000);
        }

        // Ensure tax doesn't go below zero due to deductions
        const netTax = Math.max(0, irpef + localTax - deduction);

        const netAnnual = taxableIncome - netTax;
        const netMonthly = netAnnual / months;

        setResult({
            netAnnual: netAnnual,
            netMonthly: netMonthly,
            tax: netTax,
            inps: inps
        });
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
            <div className="input-group" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                <div>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>RAL (Lordo Annuo €)</label>
                    <input
                        type="number"
                        value={ral}
                        onChange={(e) => setRal(e.target.value)}
                        placeholder="Es. 25000"
                        style={{
                            width: '100%',
                            padding: '12px',
                            borderRadius: '8px',
                            border: '1px solid var(--border-color)',
                            background: 'var(--bg-primary)',
                            color: 'var(--text-primary)',
                            fontSize: '1rem'
                        }}
                    />
                </div>

                <div className="flex-row-mobile" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 140px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Mensilità</label>
                        <select
                            value={months}
                            onChange={(e) => setMonths(Number(e.target.value))}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid var(--border-color)',
                                background: 'var(--bg-primary)',
                                color: 'var(--text-primary)',
                                fontSize: '1rem'
                            }}
                        >
                            <option value={13}>13 Mensilità</option>
                            <option value={14}>14 Mensilità</option>
                            <option value={12}>12 Mensilità</option>
                        </select>
                    </div>
                    <div style={{ flex: '1 1 140px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-secondary)' }}>Regione</label>
                        <select
                            value={region}
                            onChange={(e) => setRegion(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '8px',
                                border: '1px solid var(--border-color)',
                                background: 'var(--bg-primary)',
                                color: 'var(--text-primary)',
                                fontSize: '1rem'
                            }}
                        >
                            <option value="lombardia">Lombardia</option>
                            <option value="lazio">Lazio</option>
                            <option value="veneto">Veneto</option>
                            <option value="emilia">Emilia-Romagna</option>
                            <option value="altro">Altro</option>
                        </select>
                    </div>
                </div>

                <button
                    onClick={calculateNet}
                    style={{
                        padding: '14px',
                        background: '#007aff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        marginTop: '8px',
                        width: '100%'
                    }}
                >
                    Calcola Netto
                </button>
            </div>

            {result && (
                <div className="result-display" style={{
                    background: 'var(--bg-primary)',
                    padding: '20px',
                    borderRadius: '8px',
                    borderLeft: '4px solid #34c759'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Stipendio Netto Mensile:</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#34c759' }}>
                            € {result.netMonthly.toLocaleString('it-IT', { maximumFractionDigits: 0 })}
                        </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>Netto Annuo Totale:</span>
                        <span style={{ fontWeight: '600' }}>
                            € {result.netAnnual.toLocaleString('it-IT', { maximumFractionDigits: 0 })}
                        </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', marginTop: '16px', fontStyle: 'italic' }}>
                        *Stima approssimativa basata su aliquote standard 2024.
                    </p>
                </div>
            )}
        </div>
    );
};

export default NetSalaryCalculator;
