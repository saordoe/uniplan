import React, { useState } from 'react';
import Navbar from './myComponents/Navbar';
import Hero from './myComponents/Hero';
import PAnalytics from './pages/PAnalytics';
import PTrading from './pages/PTrading';
import PTradeLog from './pages/PTradeLog';
import PRoi from './pages/PRoi';
import PIncentives from './pages/PIncentives';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  const [showSignin, setShowSignin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="flex h-screen w-full">
      <Navbar
        className="w-1/4 h-full"
        setShowSignin={setShowSignin}
        isLoggedIn={isLoggedIn}
      />
      <div className="w-3/4 h-full flex-grow">
        {showSignin && !isLoggedIn ? (
          <Hero showSignin={showSignin} setShowSignin={setShowSignin} setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <Routes>
            <Route index element={<Hero />} />
            <Route path="/hero" element={<Hero />} />
            <Route path="/analytics" element={<PAnalytics />} />
            <Route path="/trading" element={<PTrading />} />
            <Route path="/trade-log" element={<PTradeLog />} />
            <Route path="/roi-dashboard" element={<PRoi />} />
            <Route path="/incentives" element={<PIncentives />} />
          </Routes>
        )}
      </div>
    </div>
  );
};

export default App;
