import React from 'react';
import Section from '../common/Section';
import PopulationChart from './PopulationChart';
import GenderChart from './GenderChart';
import EmploymentChart from './EmploymentChart';
import GrowthChart from './GrowthChart';
import SDGSection from './SDGSection';
import './Statistics.css';

const Statistics = () => {
    return (
        <Section id="stats" title="Statistica">

            <div className="charts-list" style={{ display: 'flex', flexDirection: 'column', gap: '48px', marginTop: '48px' }}>

                {/* Population Chart */}
                <div className="detailed-chart-card">
                    <div className="chart-visual">
                        <PopulationChart />
                    </div>
                    <div className="chart-description">
                        <h3>Distribuzione Geografica</h3>
                        <p>
                            La comunità bangladese è storicamente concentrata nel <strong>Lazio</strong> e in <strong>Lombardia</strong>,
                            che insieme ospitano quasi la metà dei residenti totali. Questa distribuzione riflette le opportunità
                            lavorative e le reti di supporto comunitario consolidate nel tempo.
                        </p>
                        <span className="source-citation">Fonte: ISTAT 2023 - Residenti stranieri in Italia</span>
                    </div>
                </div>

                {/* Growth Chart */}
                <div className="detailed-chart-card">
                    <div className="chart-visual">
                        <GrowthChart />
                    </div>
                    <div className="chart-description">
                        <h3>Trend di Crescita</h3>
                        <p>
                            Si registra una <strong>crescita costante</strong> negli ultimi 5 anni, con un incremento del
                            <strong>+7.7%</strong> solo nel 2023. Dopo il rallentamento del 2020 dovuto alla pandemia,
                            gli ingressi sono ripresi vigorosamente, trainati principalmente dai ricongiungimenti familiari.
                        </p>
                        <span className="source-citation">Fonte: Ministero del Lavoro e delle Politiche Sociali</span>
                    </div>
                </div>

                {/* Gender Chart */}
                <div className="detailed-chart-card">
                    <div className="chart-visual">
                        <GenderChart />
                    </div>
                    <div className="chart-description">
                        <h3>Composizione di Genere</h3>
                        <p>
                            Permane una forte prevalenza maschile (<strong>72%</strong>), caratteristica storica di questa migrazione.
                            Tuttavia, la componente femminile è in crescita, segnalando una fase di stabilizzazione delle
                            famiglie sul territorio italiano.
                        </p>
                        <span className="source-citation">Fonte: Ministero del Lavoro, Rapporto Annuale 2021</span>
                    </div>
                </div>

                {/* Employment Chart */}
                <div className="detailed-chart-card">
                    <div className="chart-visual">
                        <EmploymentChart />
                    </div>
                    <div className="chart-description">
                        <h3>Settori di Impiego</h3>
                        <p>
                            L'inserimento lavorativo è fortemente polarizzato nel <strong>terziario</strong>, in particolare nella
                            ristorazione e nel commercio. Significativa anche la presenza nell'industria nelle regioni del Nord.
                        </p>
                        <span className="source-citation">Fonte: Ministero del Lavoro - Dati Occupazionali</span>
                    </div>
                </div>

            </div>

            <SDGSection />
        </Section>
    );
};

export default Statistics;
