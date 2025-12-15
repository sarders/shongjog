import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [euro, setEuro] = useState(100);
  const [rate, setRate] = useState(0);
  const [taka, setTaka] = useState(0);

  // Scarica il tasso di cambio all'avvio
  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/EUR")
        .then(res => res.json())
        .then(data => {
          setRate(data.rates.BDT);
          setTaka(100 * data.rates.BDT); // Calcolo iniziale
        })
        .catch(err => console.error("Errore API:", err));
  }, []);

  // Ricalcola quando cambia l'input Euro
  const handleEuroChange = (e) => {
    const val = e.target.value;
    setEuro(val);
    if (rate > 0) {
      setTaka(val * rate);
    }
  };

  // Stili semplici inline (per non dover configurare CSS ora)
  const styles = {
    container: { padding: '20px', maxWidth: '600px', margin: '0 auto', textAlign: 'center', fontFamily: 'Arial, sans-serif' },
    card: { border: '1px solid #ddd', borderRadius: '10px', padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
    input: { padding: '10px', fontSize: '18px', width: '80%', margin: '10px 0', borderRadius: '5px', border: '1px solid #ccc' },
    badge: { backgroundColor: '#28a745', color: 'white', padding: '5px 10px', borderRadius: '15px', fontSize: '14px' },
    header: { color: '#006a4e', marginBottom: '20px' }
  };

  return (
      <div style={styles.container}>
        <h1 style={styles.header}>🇧🇩 Shongjog 🇮🇹</h1>
        <p>Il ponte digitale tra Italia e Bangladesh</p>

        <div style={styles.card}>
          <h3>💱 Cambio Valuta Live</h3>

          <div>
            <label>Importo in Euro (€)</label><br/>
            <input
                type="number"
                style={styles.input}
                value={euro}
                onChange={handleEuroChange}
            />
          </div>

          <div style={{margin: '15px 0'}}>
          <span style={styles.badge}>
            Tasso attuale: 1 EUR = {rate ? rate.toFixed(2) : "..."} BDT
          </span>
          </div>

          <div>
            <label>Importo in Taka (৳)</label><br/>
            <input
                type="text"
                style={{...styles.input, backgroundColor: '#f9f9f9'}}
                readOnly
                value={taka ? taka.toLocaleString('en-BD', { maximumFractionDigits: 2 }) : ""}
            />
          </div>
        </div>

        <footer style={{marginTop: '30px', color: '#888'}}>
          <small>Developed by Shahriar Alam Sarder</small>
        </footer>
      </div>
  );
}

export default App;