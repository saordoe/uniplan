import React from 'react';

const Hero2 = () => {
  const transactions = [
    { date: '2024-01-27', item: 'Groceries', quantity: 1, price: 84.50, balance: 915.50 },
    { date: '2024-01-26', item: 'Gas', quantity: 1, price: 45.00, balance: 1000.00 },
    { date: '2024-01-25', item: 'Coffee', quantity: 2, price: 8.50, balance: 1045.00 },
    { date: '2024-01-24', item: 'Books', quantity: 3, price: 65.97, balance: 1053.50 },
    { date: '2024-01-23', item: 'Restaurant', quantity: 1, price: 32.50, balance: 1119.47 },
    { date: '2024-01-22', item: 'Movies', quantity: 2, price: 24.00, balance: 1151.97 },
    { date: '2024-01-21', item: 'Groceries', quantity: 1, price: 92.35, balance: 1175.97 },
    { date: '2024-01-20', item: 'Clothing', quantity: 2, price: 120.00, balance: 1268.32 },
    { date: '2024-01-19', item: 'Coffee', quantity: 1, price: 4.25, balance: 1388.32 },
    { date: '2024-01-18', item: 'Gas', quantity: 1, price: 48.00, balance: 1392.57 },
    { date: '2024-01-17', item: 'Restaurant', quantity: 1, price: 28.75, balance: 1440.57 }
  ];

  return (
    <div className="flex items-center justify-center h-1/3 bg-offblack rounded-xl p-4 overflow-auto">
      {/* container */}
      <div className="w-full max-h-full overflow-y-auto">
        <div className="text-sm text-center font-bold text-offwhite mb-2">Recent Transactions 💰</div>
        <table className="w-full text-white text-left text-xs rounded-xl">
          <thead className="sticky top-0 bg-offwhite text-offblack opacity-80">
            <tr>
              <th className="px-4 py-2">Purchase Date</th>
              <th className="px-4 py-2">Item</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Current Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td className="px-4 py-2">{transaction.date}</td>
                <td className="px-4 py-2">{transaction.item}</td>
                <td className="px-4 py-2">{transaction.quantity}</td>
                <td className="px-4 py-2">${transaction.price.toFixed(2)}</td>
                <td className="px-4 py-2">${transaction.balance.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Hero2;