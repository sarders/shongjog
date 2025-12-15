import React from 'react';
import { motion } from 'framer-motion';

const SDGCard = ({ data }) => {
    return (
        <motion.div
            className="stat-card sdg-card"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
                borderLeft: `4px solid ${data.color}`,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}
        >
            <div>
                <div className="stat-label" style={{ fontSize: '0.9rem', marginBottom: '8px' }}>
                    {data.label}
                </div>
                <div className="stat-value" style={{ color: data.color, fontSize: '2.5rem' }}>
                    {data.value}
                    <span style={{ fontSize: '1rem', marginLeft: '4px', color: 'var(--text-secondary)' }}>
                        {data.unit}
                    </span>
                </div>
            </div>
            <p className="chart-note" style={{ marginTop: '12px', fontSize: '0.85rem' }}>
                {data.description}
            </p>
        </motion.div>
    );
};

export default SDGCard;
