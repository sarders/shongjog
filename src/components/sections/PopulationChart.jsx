import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { populationData } from '../../data/populationData';
import './PopulationChart.css';

const PopulationChart = () => {
    return (
        <div className="chart-container">
            <h3 className="chart-title">Comunità Bangladese per Regione (2023)</h3>
            <p className="chart-subtitle">Distribuzione percentuale %</p>
            <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                    <BarChart
                        data={populationData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 40,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                        <XAxis
                            dataKey="name"
                            stroke="var(--text-secondary)"
                            tick={{ fill: 'var(--text-secondary)' }}
                            angle={-45}
                            textAnchor="end"
                            height={60}
                        />
                        <YAxis
                            stroke="var(--text-secondary)"
                            tick={{ fill: 'var(--text-secondary)' }}
                            unit="%"
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--bg-secondary)',
                                borderColor: 'var(--border-color)',
                                color: 'var(--text-primary)',
                                borderRadius: 'var(--radius-md)'
                            }}
                            cursor={{ fill: 'var(--bg-tertiary)' }}
                        />
                        <Bar dataKey="value" name="Popolazione" fill="var(--accent-color)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <p className="chart-note">* Fonte: ISTAT 2023 - Residenti stranieri in Italia</p>
        </div>
    );
};

export default PopulationChart;
