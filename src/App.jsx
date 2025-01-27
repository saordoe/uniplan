import Navbar from './myComponents/Navbar';
import Hero from './myComponents/Hero';
import PInternships from './pages/PInternships';
import PTodo from './pages/PTodo';
import PDegree from './pages/PDegree';
import PFinances from './pages/PFinances';
import PAccount from './pages/PAccount';
import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

const App = () => {
  const [showSignin, setShowSignin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
      setLoading(false);
      if (!user) setShowSignin(true);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return null;

  return (
    <div className="flex h-screen w-full">
      <Navbar
        className="w-1/4 h-full"
        setShowSignin={setShowSignin}
        isLoggedIn={isLoggedIn}
      />
      <div className="w-3/4 h-full flex-grow">
        {(!isLoggedIn || showSignin) ? (
          <Hero 
            showSignin={showSignin} 
            setShowSignin={setShowSignin}
            showSignup={showSignup}
            setShowSignup={setShowSignup}
            setIsLoggedIn={setIsLoggedIn} 
          />
        ) : (
          <Routes>
            <Route path="/" element={<Navigate to="/hero" />} />
            <Route path="/hero" element={<Hero />} />
            <Route path="/internships" element={<PInternships />} />
            <Route path="/todo" element={<PTodo />} />
            <Route path="/degree" element={<PDegree />} />
            <Route path="/finances" element={<PFinances />} />
            <Route path="/account" element={<PAccount />} />
            <Route path="*" element={<Navigate to="/hero" />} />
          </Routes>
        )}
      </div>
    </div>
  );
};

export default App;