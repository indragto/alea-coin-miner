"use client";

import { useEffect, useState } from "react";
import MiningVisualizer from "./MiningVisualizer";
import BlockchainOverviewWidget from "./BlockchainOverviewWidget";
import moment from "moment";

const BlockchainTimeline = () => {
  // State untuk menyimpan blok yang dipilih
  const [selectedBlock, setSelectedBlock] = useState(null);
  // State untuk membatasi jumlah blok yang ditampilkan
  const [visibleBlocks, setVisibleBlocks] = useState(3);
  const [minerAddress, setMinerAddress] = useState('');
  const [miningComplete, setMiningComplete] = useState(false);
  const [blocks, setBlocks] = useState([]);
  const [pendingTransactions, setPendingTransactions] = useState([]);
  const [difficulty, setDifficulty] = useState(0);
  const [valid, setValid] = useState(false);
  const [todayReward, setTodayReward] = useState(0);
  const [totalNodes, setTotalNodes] = useState(1);
  const [currentNode, setCurrentNode] = useState(1);

  // Fungsi untuk memuat lebih banyak blok
  const handleLoadMore = () => {
    setVisibleBlocks((prev) => prev + 3); // Tambah 3 blok lagi
  };

  // Fungsi untuk menangani klik blok
  const handleBlockClick = (block) => {
    setSelectedBlock(block);
  };

  const truncateHash = (hash) => {
    // Ganti bagian tengah hash dengan 'xxx'
    // Ambil 8 karakter pertama dan 8 karakter terakhir
    const leftPart = hash.slice(0, 8);  // 8 karakter pertama
    const rightPart = hash.slice(-8);  // 8 karakter terakhir

    // Gabungkan dengan 'xxx' di tengah
    const modifiedHash = leftPart + 'xxx' + rightPart;
    return modifiedHash;
  }

  const fetchBlocks = async () => {
      try {
          const response = await fetch('http://localhost:3100/api/blocks');
          if (!response.ok) {
              throw new Error(`API error: ${response.status}`);
          }
          const data = await response.json();
          setBlocks(data.reverse());
      } catch (err) {
          setBlocks([]);
      }
  };

  const fetchPendingTransactions = async () => {
    try {
        const response = await fetch('http://localhost:3100/api/pending_transactions');
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        setPendingTransactions(data);
    } catch (err) {
        setPendingTransactions([]);
    }
  };

  const fetchDifficulty = async () => {
    try {
        const response = await fetch('http://localhost:3100/api/current_difficulty');
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        setDifficulty(data.difficulty);
    } catch (err) {
        setDifficulty(0);
    }
  };

  const fetchBlockchainValidity = async () => {
    try {
        const response = await fetch('http://localhost:3100/api/validate');
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        setValid(data.isValid);
    } catch (err) {
        setDifficulty(false);
    }
  };

  const fetchTodayReward = async () => {
    try {
        const response = await fetch('http://localhost:3100/api/today_reward',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            address: minerAddress
          }),
        });
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        setTodayReward(data.reward);
    } catch (err) {
        setTodayReward(0);
    }
  };

  useEffect(() => {
    fetchBlocks();
    fetchPendingTransactions();
    fetchDifficulty();
    fetchBlockchainValidity();
    fetchTodayReward();
  }, []);

useEffect(() => {
  
  if(minerAddress != ''){
    const fetchTodayReward = async () => {
      try {
          const response = await fetch('http://localhost:3100/api/today_reward',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              address: minerAddress
            }),
          });
          if (!response.ok) {
              throw new Error(`API error: ${response.status}`);
          }
          const data = await response.json();
          setTodayReward(data.reward);
      } catch (err) {
          setTodayReward(0);
      }
    };
    fetchTodayReward();
  }
  
}, [minerAddress]);

  return (
    <div className="w-full min-h-screen bg-gray-100 flex py-8 px-6 space-x-6">
      {/* Kolom Kiri: Timeline */}
      <div className="w-2/5 overflow-y-auto">
        {/* Pending Transactions Card */}
        <div className="mb-5">
          <MiningVisualizer
            isValid={valid}
            difficulty={difficulty}
            blocksAmount={blocks.length}
            currentNode={currentNode}
            minerAddress={minerAddress}
            onComplete={() => {
              setMiningComplete(true);
              fetchBlocks();
              fetchPendingTransactions();
              fetchDifficulty();
              fetchBlockchainValidity();
              fetchTodayReward();
            }}
          />
        </div>

        {/* Timeline */}
      <div className="relative w-full max-w-3xl flex">
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bg-gray-300 w-1 h-full" style={{top:'-20px'}}></div>

        <div className="flex flex-col w-full space-y-12">
          {blocks.slice(0, visibleBlocks).map((block, index) => (
            <div
              key={block.hash}
              onClick={() => handleBlockClick(block)}
              className={`relative flex items-center ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
            >
              {/* Block Card */}
              <div
                className={`shadow-md rounded-lg p-6 w-80 cursor-pointer hover:bg-gray-100 transition ${
                  index % 2 === 0 ? "ml-8" : "mr-8"
                }
                ${
                  block.minerAddress == minerAddress ? "bg-green-200" : "bg-white"
                }`}
              >
                <h3 className="text-lg font-bold text-gray-800">
                  Block #{block.timestamp}
                </h3>
                <p className="text-sm text-gray-500">
                  Hash: <span className="font-mono">{truncateHash(block.hash)}</span>
                </p>
                <p className="text-sm text-gray-500">
                  Timestamp:{" "}
                  {moment(Number(block.timestamp)).format('DD-MM-YYYY H:mm')}
                </p>
                <p className="text-sm text-gray-500">
                  Transactions: {block.transactions.length}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Load More Button */}
      {visibleBlocks < blocks.length && (
        <div className="mt-8 text-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
          >
            Load More
          </button>
        </div>
      )}
      </div>

      {/* Kolom Kanan: Detail Block */}
      <div className="w-3/5">
        <BlockchainOverviewWidget
          pendingTransactions={pendingTransactions.length}
          todayReward={todayReward}
          totalNodes={totalNodes}
        />

        <div className="bg-white shadow-lg rounded-lg p-6 mt-5">
          <div>
              <label htmlFor="reward-address" className="block text-sm font-medium text-gray-700 mb-2">
                Reward Address
              </label>
              <input
                id="reward-address"
                type="text"
                value={minerAddress}
                onChange={(e) => setMinerAddress(e.target.value)}
                className="w-full text-black p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your wallet address before start mining"
              />
            </div>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 mt-10">
          {selectedBlock ? (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Block #{selectedBlock.timestamp}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                <strong>Hash:</strong> {selectedBlock.hash}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                <strong>Previous Hash:</strong> {selectedBlock.previousHash}
              </p>
              <p className="text-sm text-gray-500 mb-2">
                <strong>Timestamp:</strong>{" "}
                {moment(Number(selectedBlock.timestamp)).format('DD-MM-YYYY H:mm')}
              </p>
              <p className="text-sm text-gray-500 mb-4">
                <strong>Transactions:</strong>{" "}
                {selectedBlock.transactions.length}
              </p>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Transactions:
              </h3>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {selectedBlock.transactions.map((tx, index) => (
                  <li key={index}>{tx.timestamp}</li>
                ))}
              </ul>
            </>
          ) : (
            <div className="text-center text-gray-500">
              <p>Select a block to view its details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlockchainTimeline;
