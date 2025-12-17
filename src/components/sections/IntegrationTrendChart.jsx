import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { integrationData } from '../../data/integrationData';
import './PopulationChart.css';

const IntegrationTrendChart = () => {
    return (
        <div className="chart-container">
            <h3 className="chart-title">La Metamorfosi: Trend di Integrazione</h3>
            <p className="chart-subtitle">Nuovi ingressi vs Acquisizioni di cittadinanza (2020-2025)</p>
            <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                    <LineChart
                        data={integrationData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 20,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
                        <XAxis
                            dataKey="year"
                            stroke="var(--text-secondary)"
                            tick={{ fill: 'var(--text-secondary)' }}
                        />
                        <YAxis
                            stroke="var(--text-secondary)"
                            tick={{ fill: 'var(--text-secondary)' }}
                            label={{ value: 'Persone', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--bg-secondary)',
                                borderColor: 'var(--border-color)',
                                color: 'var(--text-primary)',
                                borderRadius: 'var(--radius-md)'
                            }}
                            formatter={(value) => value.toLocaleString()}
                        />
                        <Legend
                            wrapperStyle={{
                                paddingTop: '20px'
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="newEntries"
                            name="Nuovi Ingressi"
                            stroke="#007aff"
                            strokeWidth={3}
                            dot={{ fill: '#007aff', r: 5 }}
                            activeDot={{ r: 7 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="citizenships"
                            name="Acquisizioni Cittadinanza"
                            stroke="#34c759"
                            strokeWidth={3}
                            dot={{ fill: '#34c759', r: 5 }}
                            activeDot={{ r: 7 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <p className="chart-note">* Nel 2025 le acquisizioni hanno quasi pareggiato i nuovi ingressi - non è più migrazione di passaggio</p>
        </div>
    );
};

export default IntegrationTrendChart;
