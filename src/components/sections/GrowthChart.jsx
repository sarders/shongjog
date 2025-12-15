import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { growthData } from '../../data/populationData';

const GrowthChart = () => {
    return (
        <div className="chart-container">
            <h3 className="chart-title">Crescita della Comunità</h3>
            <p className="chart-subtitle">Residenti regolari (2019-2023)</p>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <AreaChart
                        data={growthData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorPop" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#af52de" stopOpacity={0.8} />
                                <stop offset="95%" stopColor="#af52de" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                        <XAxis dataKey="year" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
                        <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--bg-secondary)',
                                borderColor: 'var(--border-color)',
                                borderRadius: 'var(--radius-md)'
                            }}
                        />
                        <Area type="monotone" dataKey="pop" stroke="#af52de" fillOpacity={1} fill="url(#colorPop)" name="Popolazione" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            <p className="chart-note">Trend in costante crescita (+7.7% nell'ultimo anno).</p>
        </div>
    );
};

export default GrowthChart;
