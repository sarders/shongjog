import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import StatisticsPage from './pages/StatisticsPage';
import CulturePage from './pages/CulturePage';
import EconomyPage from './pages/EconomyPage';
import ProductsPage from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/statistics" element={<StatisticsPage />} />
          <Route path="/culture" element={<CulturePage />} />
          <Route path="/economy" element={<EconomyPage />} />
          <Route path="/tools" element={<ProductsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </MainLayout>
    </AuthProvider>
  );
}

export default App;