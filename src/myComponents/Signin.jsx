import React from 'react';
import logo from '../assets/logo.svg';

const Signin = ({ setShowSignin, setIsLoggedIn }) => {
  return (
    <div className="bg-offblack w-1/3 h-3/4 rounded-xl flex flex-col items-center justify-center">
      <img src={logo} className="w-16 mb-4" alt="Logo" />
      <h1 className="text-2xl font-bold text-offwhite mb-12">
        Account Login
      </h1>
      
      <div className="flex flex-col gap-4 w-2/3">
        <input
          type="text"
          placeholder="Username or Email"
          className="bg-offwhite h-16 rounded-xl px-4 text-offblack placeholder-opacity-50 focus:outline-none"
        />
        
        <input
          type="password"
          placeholder="Password"
          className="bg-offwhite h-16 rounded-xl px-4 text-offblack placeholder-opacity-50 focus:outline-none"
        />
      </div>
      
      {/* Sign In Button */}
      <div
        className="bg-offwhite mt-10 w-24 h-10 rounded-xl flex items-center justify-center cursor-pointer"
        onClick={() => {
          setIsLoggedIn(true); // Mark user as logged in
          setShowSignin(false); // Hide Signin component
        }}
      >
        <div className="text-offblack">
          Sign In
        </div>
      </div>
      
      {/* Sign Up Link */}
      <div className="mt-5 text-offwhite">
        Don't have an account?
      </div>
      <div className="text-offwhite">
        <a href="#" className="underline decoration-sky-500">Sign Up</a>
      </div>
    </div>
  );
};

export default Signin;
