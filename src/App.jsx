import React, { useState } from 'react';
import Navbar from './myComponents/Navbar';
import Hero from './myComponents/Hero';
import PInternships from './pages/PInternships';
import PTodo from './pages/PTodo';
import PDegree from './pages/PDegree';
import PFinances from './pages/PFinances';
import { Routes, Route } from 'react-router-dom';

const App = () => {
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="flex h-screen w-full">
      <Navbar
        className="w-1/4 h-full"
        setShowSignin={setShowSignin}
        isLoggedIn={isLoggedIn}
      />
      <div className="w-3/4 h-full flex-grow">
        {(showSignin || showSignup) && !isLoggedIn ? (
          <Hero 
            showSignin={showSignin} 
            setShowSignin={setShowSignin}
            showSignup={showSignup}
            setShowSignup={setShowSignup}
            setIsLoggedIn={setIsLoggedIn} 
          />
        ) : (
          <Routes>
            <Route index element={<Hero />} />
            <Route path="/hero" element={<Hero />} />
            <Route path="/internships" element={<PInternships />} />
            <Route path="/todo" element={<PTodo />} />
            <Route path="/degree" element={<PDegree />} />
            <Route path="/finances" element={<PFinances />} />
          </Routes>
        )}
      </div>
    </div>
  );
};

export default App;