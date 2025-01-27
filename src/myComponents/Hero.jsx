import React from 'react';
import Signup from './Signup';
import Signin from './Signin';
import Hero1 from './Hero1';
import Hero2 from './Hero2';
import Hero3 from './Hero3';
import Hero4 from './Hero4';

const Hero = ({ showSignin, setShowSignin, showSignup, setShowSignup, isLoggedIn, setIsLoggedIn }) => {
  return (
    <div className="bg-offblack w-full h-full flex-1 py-5 pr-5 pr-6">
      <div className="bg-offwhite w-full h-full rounded-xl flex items-center justify-center">
        {(showSignin || showSignup) && !isLoggedIn ? (
          <>
            {showSignin && (
              <Signin 
                setShowSignin={setShowSignin} 
                setShowSignup={setShowSignup}
                setIsLoggedIn={setIsLoggedIn} 
              />
            )}
            {showSignup && (
              <Signup 
                setShowSignup={setShowSignup}
                setShowSignin={setShowSignin}
              />
            )}
          </>
        ) : (
          <div className="flex w-full h-full p-2 gap-2">
            <div className="flex flex-col w-2/3 gap-2">
              <Hero1 />
              <Hero2 />
            </div>
            <div className="flex flex-col w-1/3 gap-2">
              <Hero3 />
              <Hero4 />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;