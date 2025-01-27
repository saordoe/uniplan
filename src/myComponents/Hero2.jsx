import React from 'react';

const Hero2 = () => {
  return (
    <div className="flex items-center justify-center h-1/3 bg-offblack rounded-xl p-4 overflow-auto">
      {/* Trade Log Container */}
      <div className="w-full max-h-full overflow-y-auto">
      <div className="text-sm text-center font-bold text-offwhite mb-2">Trade Log</div>
        <table className="w-full text-white text-left text-xs"> {/* Smaller font size */}
          <thead className="sticky top-0 bg-offwhite text-offblack opacity-80">
            <tr>
              <th className="px-4 py-2">Trade ID</th>
              <th className="px-4 py-2">Execution Date</th>
              <th className="px-4 py-2">Instrument</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Order Type</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* Example Rows for Trade Log */}
            {[...Array(20)].map((_, index) => (
              <tr key={index}>
                <td className="px-4 py-2">TRD-{1000 + index}</td>
                <td className="px-4 py-2">2023-11-09 14:30:00</td>
                <td className="px-4 py-2">AAPL</td>
                <td className="px-4 py-2">{Math.floor(Math.random() * 1000) + 100}</td>
                <td className="px-4 py-2">${(Math.random() * 200 + 100).toFixed(2)}</td>
                <td className="px-4 py-2">{index % 2 === 0 ? "Market" : "Limit"}</td>
                <td className="px-4 py-2">{index % 3 === 0 ? "Executed" : "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Hero2;
