
import React from 'react';

interface QuadrantProps {
  title: string;
  children: React.ReactNode;
}

const Quadrant: React.FC<QuadrantProps> = ({ title, children }) => {
  return (
    <div className="bg-gray-800/50 border border-cyan-500/20 rounded-lg p-4 flex flex-col min-h-[300px] md:min-h-[400px] shadow-lg shadow-cyan-900/10">
      <h2 className="text-lg font-bold text-cyan-400 font-orbitron border-b-2 border-cyan-800/50 pb-2 mb-4">
        {title}
      </h2>
      <div className="flex-grow relative">
        {children}
      </div>
    </div>
  );
};

export default Quadrant;
