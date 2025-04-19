import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CryptoProvider } from './context/CryptoContext';
import AppContent from './components/AppContent';
import TopGainers from './pages/TopGainers';
import TopLosers from './pages/TopLosers';

function App() {
  return (
    <Router>
      <CryptoProvider>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/top-gainers" element={<TopGainers />} />
          <Route path="/top-losers" element={<TopLosers />} />
        </Routes>
      </CryptoProvider>
    </Router>
  );
}

export default App;
