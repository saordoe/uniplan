import React from 'react';

const Hero1 = () => {
  return (
    <div className="flex items-center justify-center h-2/3 bg-offwhite rounded-xl overflow-auto">
      {/* Chart container */}
      <div className="w-full max-h-[90%] overflow-y-scroll">
        <div className="grid grid-cols-5 grid-rows-20 gap-2 p-4">
          {[...Array(100)].map((_, index) => (
            <div
              key={index}
              className="h-8 w-full border-t border-offblack"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero1;
