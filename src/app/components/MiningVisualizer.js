import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import ResourceUsageVisualizer from "./ResourceUsageVisualizer";
import Modal from "./Modal";

const MiningVisualizer = ({ onComplete, minerAddress, isValid, difficulty, blocksAmount, currentNode }) => {
  const [progress, setProgress] = useState(0);
  const [hash, setHash] = useState("");
  const [isMining, setIsMining] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const calculateProgress = (hash, difficulty) => {
    let zeroCount = 0;
    for (let i = 0; i < difficulty; i++) {
        if (hash[i] === '0') {
            zeroCount++;
        } else {
            break;
        }
    }
    
     const prog = (zeroCount / difficulty) * 100; 
     return prog;
  };

  useEffect(() => {
    if (!isMining) return;

    const eventSource = new EventSource('http://localhost:3100/stream?address='+minerAddress);

    eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        
        setHash(data.hash);

       const calculatedProgress = calculateProgress(data.hash, difficulty);
       
        if (calculatedProgress > progress) {
            setProgress(calculatedProgress);
        }

        if (data.isCompleted) {
            console.log('Mining Completed');
            eventSource.close();
            setTimeout(()=>{
              toast.success('A new block has been successfully mined and added to the blockchain!');
              onComplete();
              setIsMining(false);
            },2000);
        }
    };

    eventSource.onerror = (err) => {
        console.error('Error connecting to stream:', err);
        eventSource.close();
        setIsMining(false);
    };

    return () => {
        eventSource.close();
    };
}, [isMining]);


  const startMining = () => {

    if(minerAddress != ''){
      setIsMining(true);
      setProgress(0);
    }else{
      toggleModal();
    }
    
  };

  return (
    <div className="p-6 bg-white border rounded-lg shadow-md w-full max-w-lg mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-center">Mining Process</h2>

      <div className="flex flex-col items-center space-y-4">
        <div className="text-gray-500 text-sm">
          {isMining ? `Current Hash: ${hash}` : "Click 'Start Mining' to begin"}
        </div>

        {isMining && (
            <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className={`bg-blue-500 h-4 rounded-full transition-all duration-200 ease-linear`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
        
        <button
          onClick={startMining}
          disabled={isMining}
          className={`px-4 py-2 text-white font-semibold rounded-lg ${
            isMining
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {isMining ? "Mining..." : "Start Mining"}
        </button>
      </div>

      {isMining && (
        <div className="flex justify-center items-center mt-6">
          <div className="relative w-20 h-20 animate-spin">
            <div className="absolute inset-0 rounded-full border-4 border-dashed border-blue-500"></div>
            <div className="absolute inset-1/4 bg-blue-500 rounded-full"></div>
          </div>
        </div>
      )}
      {isMining && (
        <ResourceUsageVisualizer/>
      )}      
      <div className="mt-10 text-center">

        {isValid ? (
          <span className="bg-gray-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2  border border-green-500 ">
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M11.644 3.066a1 1 0 0 1 .712 0l7 2.666A1 1 0 0 1 20 6.68a17.694 17.694 0 0 1-2.023 7.98 17.406 17.406 0 0 1-5.402 6.158 1 1 0 0 1-1.15 0 17.405 17.405 0 0 1-5.403-6.157A17.695 17.695 0 0 1 4 6.68a1 1 0 0 1 .644-.949l7-2.666Zm4.014 7.187a1 1 0 0 0-1.316-1.506l-3.296 2.884-.839-.838a1 1 0 0 0-1.414 1.414l1.5 1.5a1 1 0 0 0 1.366.046l4-3.5Z" clipRule="evenodd"/>
            </svg>
            Chain Valid
          </span>
        ):(
          <span className="bg-gray-100 text-red-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2  border border-red-500 ">
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6"/>
            </svg>
            Chain Not Valid
          </span>
        )}
        
        <span className="bg-red-100 text-red-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 border border-red-400">
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18.5A2.493 2.493 0 0 1 7.51 20H7.5a2.468 2.468 0 0 1-2.4-3.154 2.98 2.98 0 0 1-.85-5.274 2.468 2.468 0 0 1 .92-3.182 2.477 2.477 0 0 1 1.876-3.344 2.5 2.5 0 0 1 3.41-1.856A2.5 2.5 0 0 1 12 5.5m0 13v-13m0 13a2.493 2.493 0 0 0 4.49 1.5h.01a2.468 2.468 0 0 0 2.403-3.154 2.98 2.98 0 0 0 .847-5.274 2.468 2.468 0 0 0-.921-3.182 2.477 2.477 0 0 0-1.875-3.344A2.5 2.5 0 0 0 14.5 3 2.5 2.5 0 0 0 12 5.5m-8 5a2.5 2.5 0 0 1 3.48-2.3m-.28 8.551a3 3 0 0 1-2.953-5.185M20 10.5a2.5 2.5 0 0 0-3.481-2.3m.28 8.551a3 3 0 0 0 2.954-5.185"/>
            </svg>
            Level {difficulty}
        </span>

        <span className="bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 border border-blue-400">
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.005 11.19V12l6.998 4.042L19 12v-.81M5 16.15v.81L11.997 21l6.998-4.042v-.81M12.003 3 5.005 7.042l6.998 4.042L19 7.042 12.003 3Z"/>
            </svg>
            {blocksAmount} Blocks
        </span>
        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded me-2 border border-yellow-400">
            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M5 5a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2H5Zm9 2a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H14Zm3 0a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17ZM3 17v-3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm11-2a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H14Zm3 0a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z" clipRule="evenodd"/>
            </svg>
            Node {currentNode}
        </span>
      </div>
    
      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <h2 className="text-lg text-black font-bold">Invalid Reward Address</h2>
        <hr className="mt-2 mb-3"></hr>
        <p className="text-black ">Please enter your reward address first!</p>
        <button
          onClick={toggleModal}
          className="mt-5 px-2 py-1 text-white font-semibold rounded-lg bg-blue-500 hover:bg-blue-600"
        >
          Ok
        </button>
      </Modal>
    </div>
  );
};

export default MiningVisualizer;
