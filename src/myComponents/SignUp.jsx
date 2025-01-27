import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import logo from '../assets/logo.svg';

const Signup = ({ setShowSignup, setShowSignin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: email,
        createdAt: new Date(),
        applications: []
      });
      setShowSignup(false);
      setShowSignin(true);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-offblack w-1/3 h-3/4 rounded-xl flex flex-col items-center justify-center">
      <img src={logo} className="w-16 mb-4" alt="Logo" />
      <h1 className="text-2xl font-bold text-offwhite mb-12">Create Account</h1>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <div className="flex flex-col gap-4 w-2/3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-offwhite h-16 rounded-xl px-4 text-offblack placeholder-opacity-50 focus:outline-none"
        />
        
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-offwhite h-16 rounded-xl px-4 text-offblack placeholder-opacity-50 focus:outline-none"
        />
      </div>
      
      <div
        className="bg-offwhite mt-10 w-24 h-10 rounded-xl flex items-center justify-center cursor-pointer"
        onClick={handleSignUp}
      >
        <div className="text-offblack">Sign Up</div>
      </div>
      
      <div className="mt-5 text-offwhite">
        Already have an account?{' '}
        <span
          className="underline decoration-sky-500 cursor-pointer"
          onClick={() => {
            setShowSignup(false);
            setShowSignin(true);
          }}
        >
          Sign In
        </span>
      </div>
    </div>
  );
};

export default Signup;