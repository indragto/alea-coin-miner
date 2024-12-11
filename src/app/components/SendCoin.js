import React, { useState } from 'react';

const SendCoin = () => {
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [signature, setSignature] = useState('');
  const [trxHash, setTrxHash] = useState('');
  const [trxId, setTrxId] = useState('');


  const isDisabled = trxHash=='' && trxId=='';

  const handleSubmit = (e) => {
    
    e.preventDefault();
    // Add logic to handle sending the coin here
    console.log('Transaction Details:', { fromAddress, toAddress, amount, signature });
  };

  const handleCopyTrxHash = () => {
    if (trxHash) {
      navigator.clipboard.writeText(trxHash);
      alert("Text copied to clipboard!");
    } else {
      alert("Input is empty!");
    }
  };


  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-lg">
      <h2 className="text-xl font-semibold text-center mb-4">Send Coin</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">From Address</label>
          <input
            type="text"
            value={fromAddress}
            onChange={(e) => setFromAddress(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your from address"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">To Address</label>
          <input
            type="text"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter recipient address"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Amount to send"
            required
          />
        </div>

        <button
          type="button"
          className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Inquiry Transaction
        </button>

        <div className="mb-4 mt-10">
          <label className="block text-sm font-medium text-gray-700">Transaction Id</label>
          <input
            type="text"
            value={trxId}
            onChange={(e) => setTrxId(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Transaction Id"
            readOnly
            required
          />
        </div>
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Transaction Hash</label>
            <div className="flex items-center space-x-2">
                <input
                    type="text"
                    value={trxHash}
                    onChange={(e) => setTrxHash(e.target.value)}
                    placeholder="Transaction Hash"
                    readOnly
                    className="flex-1 text-black px-4 py-2 border rounded-l-md border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                    type='button'
                    onClick={handleCopyTrxHash}
                    className={`px-4 py-2 text-white bg-blue-500 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        isDisabled
                          ? "bg-gray-400 cursor-not-allowed" // Gaya tombol disabled
                          : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
                      }`}
                    disabled={isDisabled}
                >
                    Copy
                </button>
            </div>
        </div>
        

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Signature</label>
          <input
            type="text"
            value={signature}
            onChange={(e) => setSignature(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter your signature from alea wallet"
            required
            disabled={isDisabled}
          />
        </div>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 mb-4">You should create transaction signature in alea wallet application by copy transaction hash after inquiry transaction.</p>

        <button
          type="submit"
          className={`w-full py-2 px-4 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            isDisabled
              ? "bg-gray-400 cursor-not-allowed" // Gaya tombol disabled
              : "bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
          }`}
          disabled={isDisabled}
        >
          Send Coin
        </button>
      </form>
    </div>
  );
};

export default SendCoin;
