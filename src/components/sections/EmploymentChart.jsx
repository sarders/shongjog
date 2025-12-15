import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { employmentData } from '../../data/populationData';

const EmploymentChart = () => {
    return (
        <div className="chart-container">
            <h3 className="chart-title">Settori di Impiego</h3>
            <p className="chart-subtitle">Ristorazione e Industria predominanti</p>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart
                        data={employmentData}
                        layout="vertical"
                        margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border-color)" />
                        <XAxis type="number" hide />
                        <YAxis
                            dataKey="name"
                            type="category"
                            width={100}
                            tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                            stroke="var(--text-secondary)"
                        />
                        <Tooltip
                            cursor={{ fill: 'var(--bg-tertiary)' }}
                            contentStyle={{
                                backgroundColor: 'var(--bg-secondary)',
                                borderColor: 'var(--border-color)',
                                borderRadius: 'var(--radius-md)'
                            }}
                        />
                        <Bar dataKey="value" fill="#34c759" radius={[0, 4, 4, 0]} barSize={20} name="Percentuale %" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <p className="chart-note">Alta concentrazione nel terziario.</p>
        </div>
    );
};

export default EmploymentChart;
