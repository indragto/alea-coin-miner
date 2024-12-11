import React from 'react';

const TransactionHistory = ({ transactions }) => {
  return (
    <div className="w-full mx-auto bg-white p-6 rounded-md shadow-lg">
      <h2 className="text-xl font-semibold text-center mb-4">Transaction History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Trx Id</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">From Address</th>
              <th className="px-4 py-2 text-left">To Address</th>
              <th className="px-4 py-2 text-left">Amount</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Balance</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{transaction.id}</td>
                <td className="px-4 py-2">{transaction.date}</td>
                <td className="px-4 py-2">{transaction.fromAddress}</td>
                <td className="px-4 py-2">{transaction.toAddress}</td>
                <td className="px-4 py-2">{transaction.amount}</td>
                <td className="px-4 py-2">{transaction.status}</td>
                <td className="px-4 py-2">{transaction.balance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
