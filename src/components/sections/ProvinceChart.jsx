import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { provinceData } from '../../data/provinceData';
import './PopulationChart.css';

const ProvinceChart = () => {
    // Highlight Roma with a different color
    const getBarColor = (index) => {
        return index === 0 ? '#ff3b30' : 'var(--accent-color)';
    };

    return (
        <div className="chart-container">
            <h3 className="chart-title">Top 5 Province per Presenza Bangladese</h3>
            <p className="chart-subtitle">Residenti per provincia (2023)</p>
            <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                    <BarChart
                        data={provinceData}
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
                            height={80}
                        />
                        <YAxis
                            stroke="var(--text-secondary)"
                            tick={{ fill: 'var(--text-secondary)' }}
                            label={{ value: 'Residenti', angle: -90, position: 'insideLeft' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--bg-secondary)',
                                borderColor: 'var(--border-color)',
                                color: 'var(--text-primary)',
                                borderRadius: 'var(--radius-md)'
                            }}
                            cursor={{ fill: 'var(--bg-tertiary)' }}
                            formatter={(value, name, props) => {
                                return [
                                    `${value.toLocaleString()} residenti (${props.payload.percentage}%)`,
                                    'Popolazione'
                                ];
                            }}
                        />
                        <Bar dataKey="residents" name="Residenti" radius={[4, 4, 0, 0]}>
                            {provinceData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <p className="chart-note">* Roma ospita 1 bangladese su 5 in Italia</p>
        </div>
    );
};

export default ProvinceChart;
