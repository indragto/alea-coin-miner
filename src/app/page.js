'use client';

import { useEffect, useState } from "react";
import BlockchainTimeline from "@/app/components/BlockchainTimeline";

const HomePage = () => {

  const [blocks, setBlocks] = useState([]);

  useEffect(() => {
      const fetchBlocks = async () => {
          try {
              const response = await fetch('http://localhost:3100/api/blocks');
              if (!response.ok) {
                  throw new Error(`API error: ${response.status}`);
              }
              const data = await response.json();
              setBlocks(data);
          } catch (err) {
              setBlocks([]);
          }
      };

      fetchBlocks();
  }, []);

  const pendingTransactions = ["0xa1b2", "0xc3d4", "0xe5f6"];

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <BlockchainTimeline/>
    </div>
  );
};

export default HomePage;
