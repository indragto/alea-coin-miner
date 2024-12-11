'use client';

import React, { useState } from 'react';
import SendCoin from '../components/SendCoin';
import TransactionHistory from '../components/TransactionHistory';

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);

  const handleNewTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
        <div className="w-full min-h-screen bg-gray-100 flex py-8 px-6 space-x-6">
            <div className="w-1/3">
                <SendCoin onSendTransaction={handleNewTransaction} />
            </div>
            <div className="w-2/3 overflow-y-auto">
                <TransactionHistory transactions={transactions} />
            </div>           
        </div>
    </div>
  );
};

export default Transaction;
