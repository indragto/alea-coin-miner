import { useEffect, useState } from 'react';

import io from "socket.io-client";

export default function SystemInfoRealTime() {

    // Connect to the Socket.IO server
    const socket = io("http://localhost:3100");

    const [systemStats, setSystemStats] = useState({
        cpu: 0,
        ram: 0,
        totalRAM: 0,
        disk: 0,
        totalDisk: 0,
        gpu: "N/A",
    });

    const roundPercentage = (value, decimalPlaces) => {
        const percentage = value * 100; // Convert the value to a percentage
        return parseFloat(percentage.toFixed(decimalPlaces)); // Round to the specified decimal places
    }

      
    // Listen for system stats from the server
    useEffect(() => {
        socket.on("systemStats", (data) => {
            setSystemStats(data);
        });

        return () => {
            socket.off("systemStats"); // Clean up the listener when the component is unmounted
        };
    }, []);

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-lg max-w-lg mx-auto mt-10">
          <h1 className="text-2xl font-bold text-center mb-4">Real-Time System Usage</h1>
          <p><strong>CPU Usage:</strong> {systemStats.cpu} %</p>
          <p><strong>RAM Usage:</strong> {systemStats.ram} MB / {systemStats.totalRAM} MB</p>
          <p><strong>Disk Usage:</strong> {systemStats.disk} MB / {systemStats.totalDisk} MB</p>
          <p><strong>GPU Temperature:</strong> {systemStats.gpu} °C</p>
        </div>
    );
    
}
