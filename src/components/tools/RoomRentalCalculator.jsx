import React, { useState } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RoomRentalCalculator = () => {
    const [rentPerBed, setRentPerBed] = useState('300');
    const [numTenants, setNumTenants] = useState('4');
    const [gasExpense, setGasExpense] = useState('50');
    const [waterExpense, setWaterExpense] = useState('30');
    const [electricityExpense, setElectricityExpense] = useState('60');
    const [managementCosts, setManagementCosts] = useState('40');
    const [result, setResult] = useState(null);

    const calculateRental = () => {
        const rent = parseFloat(rentPerBed);
        const tenants = parseInt(numTenants);
        const gas = parseFloat(gasExpense) || 0;
        const water = parseFloat(waterExpense) || 0;
        const electricity = parseFloat(electricityExpense) || 0;
        const management = parseFloat(managementCosts) || 0;

        if (!rent || !tenants || isNaN(rent) || isNaN(tenants) || tenants < 1) {
            return;
        }

        // Total utilities
        const totalUtilities = gas + water + electricity;
        const utilityPerTenant = totalUtilities / tenants;

        // Wear-and-tear calculation based on occupancy
        let wearRate = 0.05; // 5% for low occupancy
        if (tenants >= 5) {
            wearRate = 0.12; // 12% for high occupancy
        } else if (tenants >= 3) {
            wearRate = 0.08; // 8% for medium occupancy
        }
        const wearCostPerTenant = (rent * wearRate * tenants) / tenants;

        // Management costs per tenant
        const managementPerTenant = management / tenants;

        // Total expenses per tenant
        const totalExpensesPerTenant = utilityPerTenant + wearCostPerTenant + managementPerTenant;

        // Net profit per tenant
        const netProfitPerTenant = rent - totalExpensesPerTenant;

        // Total monthly income and profit
        const totalIncome = rent * tenants;
        const totalProfit = netProfitPerTenant * tenants;

        // Satisfaction Score Calculation
        let satisfactionScore = 100;

        // Occupancy penalty
        if (tenants >= 5) {
            satisfactionScore -= 25;
        } else if (tenants >= 3) {
            satisfactionScore -= 10;
        }

        // Utility burden (capped at 30 points)
        const utilityBurden = Math.min(30, (utilityPerTenant / rent) * 100);
        satisfactionScore -= utilityBurden;

        // Rent burden
        if (rent > 350) {
            satisfactionScore -= 10;
        }

        satisfactionScore = Math.max(0, Math.round(satisfactionScore));

        // Prepare chart data
        const expenseBreakdown = [
            { name: 'Utenze', value: utilityPerTenant, fill: '#ff9500' },
            { name: 'Usura', value: wearCostPerTenant, fill: '#ff3b30' },
            { name: 'Gestione', value: managementPerTenant, fill: '#af52de' },
            { name: 'Profitto', value: netProfitPerTenant, fill: '#34c759' },
        ];

        const profitData = [
            { category: 'Entrate', amount: rent },
            { category: 'Utenze', amount: -utilityPerTenant },
            { category: 'Usura', amount: -wearCostPerTenant },
            { category: 'Gestione', amount: -managementPerTenant },
            { category: 'Profitto', amount: netProfitPerTenant },
        ];

        setResult({
            netProfitPerTenant,
            totalProfit,
            totalIncome,
            utilityPerTenant,
            wearCostPerTenant,
            managementPerTenant,
            totalExpensesPerTenant,
            satisfactionScore,
            expenseBreakdown,
            profitData,
            wearRate: (wearRate * 100).toFixed(0),
        });
    };

    const getSatisfactionColor = (score) => {
        if (score >= 70) return '#34c759';
        if (score >= 40) return '#ff9500';
        return '#ff3b30';
    };

    const getSatisfactionLabel = (score) => {
        if (score >= 70) return 'Ottima';
        if (score >= 40) return 'Accettabile';
        return 'Critica';
    };

    return (
        <div className="calculator-card room-rental-calculator">
            <p className="calculator-subtitle">
                Calcola il guadagno netto per ogni inquilino considerando tutte le spese
            </p>

            <div className="input-grid">
                <div className="input-group">
                    <label>
                        Affitto per Letto (€/mese)
                    </label>
                    <input
                        type="number"
                        value={rentPerBed}
                        onChange={(e) => setRentPerBed(e.target.value)}
                        placeholder="Es. 300"
                    />
                </div>

                <div className="input-group">
                    <label>
                        Numero Inquilini
                    </label>
                    <input
                        type="number"
                        value={numTenants}
                        onChange={(e) => setNumTenants(e.target.value)}
                        placeholder="Es. 4"
                        min="1"
                    />
                </div>

                <div className="input-group">
                    <label>
                        Gas (€/mese)
                    </label>
                    <input
                        type="number"
                        value={gasExpense}
                        onChange={(e) => setGasExpense(e.target.value)}
                        placeholder="Es. 50"
                    />
                </div>

                <div className="input-group">
                    <label>
                        Acqua (€/mese)
                    </label>
                    <input
                        type="number"
                        value={waterExpense}
                        onChange={(e) => setWaterExpense(e.target.value)}
                        placeholder="Es. 30"
                    />
                </div>

                <div className="input-group">
                    <label>
                        Elettricità (€/mese)
                    </label>
                    <input
                        type="number"
                        value={electricityExpense}
                        onChange={(e) => setElectricityExpense(e.target.value)}
                        placeholder="Es. 60"
                    />
                </div>

                <div className="input-group">
                    <label>
                        Gestione/Pulizia (€/mese)
                    </label>
                    <input
                        type="number"
                        value={managementCosts}
                        onChange={(e) => setManagementCosts(e.target.value)}
                        placeholder="Es. 40"
                    />
                </div>
            </div>

            <button
                className="calculate-btn"
                onClick={calculateRental}
            >
                Calcola Guadagno
            </button>

            {result && (
                <div className="results-section">
                    {/* Key Metrics */}
                    <div className="results-grid">
                        <div className="result-card" style={{ borderLeftColor: '#34c759' }}>
                            <div className="result-label">Profitto per Inquilino</div>
                            <div className="result-value" style={{ color: '#34c759' }}>
                                €{result.netProfitPerTenant.toFixed(0)}
                            </div>
                            <div className="result-sub">al mese</div>
                        </div>

                        <div className="result-card" style={{ borderLeftColor: '#007aff' }}>
                            <div className="result-label">Profitto Totale</div>
                            <div className="result-value" style={{ color: 'var(--text-primary)' }}>
                                €{result.totalProfit.toFixed(0)}
                            </div>
                            <div className="result-sub">al mese</div>
                        </div>

                        <div className="result-card" style={{ borderLeftColor: getSatisfactionColor(result.satisfactionScore) }}>
                            <div className="result-label">Soddisfazione</div>
                            <div className="result-value" style={{ color: getSatisfactionColor(result.satisfactionScore) }}>
                                {result.satisfactionScore}/100
                            </div>
                            <div className="result-sub">{getSatisfactionLabel(result.satisfactionScore)}</div>
                        </div>
                    </div>

                    {/* Charts */}
                    <div className="charts-grid">
                        {/* Profit Breakdown Bar Chart */}
                        <div className="chart-box">
                            <h4 className="chart-title">Analisi Profitto per Inquilino</h4>
                            <ResponsiveContainer width="100%" height={250}>
                                <BarChart data={result.profitData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                                    <XAxis
                                        dataKey="category"
                                        stroke="var(--text-secondary)"
                                        tick={{ fill: 'var(--text-secondary)', fontSize: 11 }}
                                        angle={-15}
                                        textAnchor="end"
                                        height={60}
                                    />
                                    <YAxis
                                        stroke="var(--text-secondary)"
                                        tick={{ fill: 'var(--text-secondary)' }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'var(--bg-secondary)',
                                            borderColor: 'var(--border-color)',
                                            borderRadius: '8px',
                                            color: 'var(--text-primary)'
                                        }}
                                        formatter={(value) => `€${Math.abs(value).toFixed(0)}`}
                                    />
                                    <Bar dataKey="amount" fill="#007aff" radius={[4, 4, 0, 0]}>
                                        {result.profitData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={entry.amount >= 0 ? '#34c759' : '#ff3b30'}
                                            />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Expense Distribution Pie Chart */}
                        <div className="chart-box">
                            <h4 className="chart-title">Distribuzione Spese</h4>
                            <ResponsiveContainer width="100%" height={250}>
                                <PieChart>
                                    <Pie
                                        data={result.expenseBreakdown}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {result.expenseBreakdown.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.fill} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'var(--bg-secondary)',
                                            borderColor: 'var(--border-color)',
                                            borderRadius: '8px',
                                            color: 'var(--text-primary)'
                                        }}
                                        formatter={(value) => `€${value.toFixed(0)}`}
                                    />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Detailed Breakdown */}
                    <div className="breakdown-box">
                        <h4 className="chart-title">Dettaglio Spese per Inquilino</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                            <div className="breakdown-row">
                                <span style={{ color: 'var(--text-secondary)' }}>Utenze (Gas + Acqua + Elettricità):</span>
                                <span style={{ fontWeight: '600' }}>€{result.utilityPerTenant.toFixed(2)}</span>
                            </div>
                            <div className="breakdown-row">
                                <span style={{ color: 'var(--text-secondary)' }}>Usura Appartamento ({result.wearRate}%):</span>
                                <span style={{ fontWeight: '600' }}>€{result.wearCostPerTenant.toFixed(2)}</span>
                            </div>
                            <div className="breakdown-row">
                                <span style={{ color: 'var(--text-secondary)' }}>Gestione/Pulizia:</span>
                                <span style={{ fontWeight: '600' }}>€{result.managementPerTenant.toFixed(2)}</span>
                            </div>
                            <div className="breakdown-row" style={{ borderBottom: 'none' }}>
                                <span style={{ color: 'var(--text-secondary)', fontWeight: 'bold' }}>Totale Spese:</span>
                                <span style={{ fontWeight: 'bold', color: '#ff3b30' }}>€{result.totalExpensesPerTenant.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <p className="calculator-note">
                * L'usura è calcolata automaticamente in base al numero di inquilini. La soddisfazione considera densità abitativa, peso delle utenze e affitto.
            </p>
        </div>
    );
};

export default RoomRentalCalculator;
