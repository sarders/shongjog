import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Home from './pages/Home';
import StatisticsPage from './pages/StatisticsPage';
import CulturePage from './pages/CulturePage';
import EconomyPage from './pages/EconomyPage';
import ProductsPage from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';
import SharedExpensesPage from './pages/SharedExpensesPage';
import SharedAccountDetail from './pages/SharedAccountDetail';
import RoomRentalPage from './pages/tools/RoomRentalPage';
import NetSalaryPage from './pages/tools/NetSalaryPage';
import CompoundInterestPage from './pages/tools/CompoundInterestPage';
import ExpenseSplitterPage from './pages/tools/ExpenseSplitterPage';
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
          <Route path="/tools/room-rental" element={<RoomRentalPage />} />
          <Route path="/tools/net-salary" element={<NetSalaryPage />} />
          <Route path="/tools/compound-interest" element={<CompoundInterestPage />} />
          <Route path="/tools/expense-splitter" element={<ExpenseSplitterPage />} />

          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/shared-expenses" element={<SharedExpensesPage />} />
          <Route path="/shared-expenses/:id" element={<SharedAccountDetail />} />
        </Routes>
      </MainLayout>
    </AuthProvider>
  );
}

export default App;