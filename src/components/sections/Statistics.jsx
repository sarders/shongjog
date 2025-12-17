import React from 'react';
import Section from '../common/Section';
import PopulationChart from './PopulationChart';
import GenderChart from './GenderChart';
import EmploymentChart from './EmploymentChart';
import GrowthChart from './GrowthChart';
import ProvinceChart from './ProvinceChart';
import EmploymentSectorsChart from './EmploymentSectorsChart';
import IntegrationTrendChart from './IntegrationTrendChart';
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

                {/* Province Distribution Chart */}
                <div className="detailed-chart-card">
                    <div className="chart-visual">
                        <ProvinceChart />
                    </div>
                    <div className="chart-description">
                        <h3>Il Peso di Roma</h3>
                        <p>
                            <strong>1 cittadino bangladese su 5 in Italia vive nella Provincia di Roma</strong>.
                            Questa concentrazione eccezionale riflette il ruolo della capitale come principale polo
                            di attrazione economica e sociale per la comunità. Venezia e Milano seguono a distanza,
                            mentre il resto della popolazione è distribuito su oltre 100 province.
                        </p>
                        <span className="source-citation">Fonte: ISTAT 2023 - Elaborazione dati provinciali</span>
                    </div>
                </div>

                {/* Employment Sectors Treemap */}
                <div className="detailed-chart-card">
                    <div className="chart-visual">
                        <EmploymentSectorsChart />
                    </div>
                    <div className="chart-description">
                        <h3>Driver Economici</h3>
                        <p>
                            Il <strong>52% della comunità controlla il commercio di prossimità</strong> nelle metropoli
                            (Lazio, Lombardia), mentre il <strong>28% costruisce le navi da crociera</strong> nei poli
                            industriali del Nord-Est (Friuli, Veneto). L'agricoltura assorbe il 10% degli occupati,
                            concentrati principalmente nel Lazio, Puglia e Sicilia.
                        </p>
                        <span className="source-citation">Fonte: Elaborazione dati occupazionali 2023</span>
                    </div>
                </div>

                {/* Integration Trend Chart */}
                <div className="detailed-chart-card">
                    <div className="chart-visual">
                        <IntegrationTrendChart />
                    </div>
                    <div className="chart-description">
                        <h3>La Metamorfosi</h3>
                        <p>
                            Nel <strong>2025 le acquisizioni di cittadinanza hanno quasi pareggiato i nuovi ingressi</strong>.
                            Questo dato segna un punto di svolta storico: <strong>non è più una migrazione di passaggio,
                                è un insediamento definitivo</strong>. La curva delle cittadinanze cresce costantemente dal 2020,
                            mentre i nuovi arrivi si stabilizzano, indicando una comunità sempre più radicata e integrata
                            nel tessuto sociale italiano.
                        </p>
                        <span className="source-citation">Fonte: Ministero dell'Interno - Dati cittadinanza e permessi di soggiorno</span>
                    </div>
                </div>

            </div>

            <SDGSection />
        </Section>
    );
};

export default Statistics;
