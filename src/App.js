import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import StatisticsPage from './pages/StatisticsPage';
import CulturePage from './pages/CulturePage';
import EconomyPage from './pages/EconomyPage';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/statistics" element={<StatisticsPage />} />
        <Route path="/culture" element={<CulturePage />} />
        <Route path="/economy" element={<EconomyPage />} />
      </Routes>
    </MainLayout>
  );
}

export default App;