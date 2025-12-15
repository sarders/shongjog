import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { genderData } from '../../data/populationData';

const GenderChart = () => {
    return (
        <div className="chart-container">
            <h3 className="chart-title">Distribuzione di Genere</h3>
            <p className="chart-subtitle">Prevalenza maschile (72%) vs femminile (28%)</p>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={genderData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {genderData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--bg-secondary)',
                                borderColor: 'var(--border-color)',
                                borderRadius: 'var(--radius-md)'
                            }}
                        />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <p className="chart-note">Dati ISTAT: Forte componente maschile storica.</p>
        </div>
    );
};

export default GenderChart;
