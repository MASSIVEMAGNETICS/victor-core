
import React from 'react';
import { SimulationStatus } from '../types';

interface ControlPanelProps {
  status: SimulationStatus;
  onStart: () => void;
  onStop: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({ status, onStart, onStop }) => {
  const isRunning = status === SimulationStatus.Running;

  return (
    <div className="flex justify-center items-center space-x-4 mt-4">
      <button
        onClick={onStart}
        disabled={isRunning}
        className="font-orbitron bg-cyan-600 hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-lg shadow-lg shadow-cyan-500/20 transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        INITIATE PRIMARY THREAD
      </button>
      <div className="flex items-center space-x-2">
        <span className="font-orbitron text-sm text-gray-400">STATUS:</span>
        <span className={`font-bold text-sm px-3 py-1 rounded-full ${isRunning ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
          {status}
        </span>
      </div>
    </div>
  );
};

export default ControlPanel;
