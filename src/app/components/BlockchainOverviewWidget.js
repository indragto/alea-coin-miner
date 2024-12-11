import { useState, useEffect } from "react";

const BlockchainOverviewWidget = ({pendingTransactions,todayReward,totalNodes}) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

    <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
        <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full">
        <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1M5 12h14M5 12a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1m-2 3h.01M14 15h.01M17 9h.01M14 9h.01"/>
        </svg>

        </div>
        <div>
            <p className="mb-2 text-sm font-medium text-gray-600">
                Blockchain Nodes
            </p>
            <p className="text-lg font-semibold text-gray-700">
                {totalNodes}
            </p>
        </div>
    </div>

    <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
        <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full">
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
            </svg>
        </div>
        <div>
            <p className="mb-2 text-sm font-medium text-gray-600">
                Pending Transaction
            </p>
            <p className="text-lg font-semibold text-gray-700">
                {pendingTransactions}
            </p>
        </div>
    </div>

    <div className="flex items-center p-4 bg-white rounded-lg shadow-xs">
        <div className="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full">
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 7h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C10.4 2.842 8.949 2 7.5 2A3.5 3.5 0 0 0 4 5.5c.003.52.123 1.033.351 1.5H4a2 2 0 0 0-2 2v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V9a2 2 0 0 0-2-2Zm-9.942 0H7.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM13 14h-2v8h2v-8Zm-4 0H4v6a2 2 0 0 0 2 2h3v-8Zm6 0v8h3a2 2 0 0 0 2-2v-6h-5Z"/>
            </svg>
        </div>
        <div>
            <p className="mb-2 text-sm font-medium text-gray-600">
                Total Reward Today
            </p>
            <p className="text-lg font-semibold text-gray-700">
                {todayReward}
            </p>
        </div>
    </div>

    </div>
  );
};

export default BlockchainOverviewWidget;
