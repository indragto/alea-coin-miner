import { useEffect, useState } from "react";
import io from "socket.io-client";

const ResourceUsageVisualizer = () => {
  // Connect to the Socket.IO server
  const socket = io("http://localhost:3100");

  const [systemStats, setSystemStats] = useState({
      cpu: 0,
      ram: 0,
      ramPercentage: 0,
      totalRAM: 0,
      disk: 0,
      diskPercentage: 0,
      totalDisk: 0,
      gpu: "N/A",
  });

  // Listen for system stats from the server
  useEffect(() => {
      socket.on("systemStats", (data) => {
          console.log(data);
          setSystemStats(data);
      });

      return () => {
          socket.off("systemStats"); // Clean up the listener when the component is unmounted
      };
  }, []);

  const roundPercentage = (value, decimalPlaces) => {
    const percentage = value * 100; // Convert the value to a percentage
    return parseFloat(percentage.toFixed(decimalPlaces)); // Round to the specified decimal places
  }

  

  return (
    <div className="p-6 bg-white">
      <h2 className="text-lg font-semibold mb-4 text-center text-black">Resource Usage</h2>

      {/* Visualisasi CPU */}
      <div className="mt-0">
        <h3 className="text-md font-medium text-black">CPU Usage</h3>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-red-500 h-4 rounded-full"
            style={{ width: `${Math.ceil(systemStats.cpu)}%` }}
          ></div>
        </div>
        <div className="text-center text-black">{Math.ceil(systemStats.cpu)}%</div>
      </div>

      {/* Visualisasi RAM */}
      <div className="mt-0">
        <h3 className="text-md font-medium text-black">RAM Usage</h3>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full"
            style={{ width: `${Math.ceil(systemStats.ramPercentage)}%` }}
          ></div>
        </div>
        <div className="text-center text-black">{Math.ceil(systemStats.ramPercentage)}%</div>
      </div>

      {/* Visualisasi Disk */}
      <div className="mt-0">
        <h3 className="text-md font-medium text-black">Disk Usage</h3>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-yellow-500 h-4 rounded-full"
            style={{ width: `${Math.ceil(systemStats.diskPercentage)}%` }}
          ></div>
        </div>
        <div className="text-center text-black">{Math.ceil(systemStats.diskPercentage)}%</div>
      </div>

      {/* Visualisasi Suhu */}
      <div className="mt-0">
        <h3 className="text-md font-medium text-black">Temperature</h3>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-orange-500 h-4 rounded-full"
            style={{ width: `${(systemStats.gpu - 40) / 30 * 100}%` }}
          ></div>
        </div>
        <div className="text-center text-black">{systemStats.gpu}°C</div>
      </div>
    </div>
  );
};

export default ResourceUsageVisualizer;
