import React from 'react';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';
import { employmentSectorsData } from '../../data/employmentSectorsData';
import './PopulationChart.css';

const EmploymentSectorsChart = () => {
    const CustomizedContent = (props) => {
        const { x, y, width, height, name, value, region } = props;

        return (
            <g>
                <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    style={{
                        fill: props.fill,
                        stroke: 'var(--bg-primary)',
                        strokeWidth: 2,
                    }}
                />
                {width > 80 && height > 60 && (
                    <>
                        <text
                            x={x + width / 2}
                            y={y + height / 2 - 10}
                            textAnchor="middle"
                            fill="#fff"
                            fontSize={14}
                            fontWeight="bold"
                        >
                            {name}
                        </text>
                        <text
                            x={x + width / 2}
                            y={y + height / 2 + 10}
                            textAnchor="middle"
                            fill="#fff"
                            fontSize={20}
                            fontWeight="bold"
                        >
                            {value}%
                        </text>
                        {width > 120 && height > 80 && (
                            <text
                                x={x + width / 2}
                                y={y + height / 2 + 30}
                                textAnchor="middle"
                                fill="#fff"
                                fontSize={10}
                                opacity={0.8}
                            >
                                {region}
                            </text>
                        )}
                    </>
                )}
            </g>
        );
    };

    return (
        <div className="chart-container">
            <h3 className="chart-title">Settori di Occupazione</h3>
            <p className="chart-subtitle">Distribuzione percentuale degli occupati</p>
            <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                    <Treemap
                        data={employmentSectorsData}
                        dataKey="value"
                        stroke="var(--bg-primary)"
                        fill="#8884d8"
                        content={<CustomizedContent />}
                    >
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--bg-secondary)',
                                borderColor: 'var(--border-color)',
                                color: 'var(--text-primary)',
                                borderRadius: 'var(--radius-md)'
                            }}
                            formatter={(value, name, props) => {
                                return [
                                    `${value}% - ${props.payload.region}`,
                                    props.payload.name
                                ];
                            }}
                        />
                    </Treemap>
                </ResponsiveContainer>
            </div>
            <p className="chart-note">* Il 52% controlla il commercio nelle metropoli, il 28% l'industria nel Nord-Est</p>
        </div>
    );
};

export default EmploymentSectorsChart;
