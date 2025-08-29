
import React from 'react';
// FIX: Consolidate imports to fix duplicate identifier and type-only import errors for SimulationStatus.
import { type Pulse, SimulationStatus } from '../../types';

interface PulseTelemetryProps {
  pulses: Pulse[];
  status: SimulationStatus;
}

const PulseTelemetry: React.FC<PulseTelemetryProps> = ({ pulses, status }) => {
  const recentPulses = pulses.slice(-50); // Limit to rendering 50 pulses for performance

  return (
    <div className="absolute inset-0 bg-gray-900/50 overflow-hidden">
        {status === SimulationStatus.Idle && (
            <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">Awaiting thread activity...</p>
            </div>
        )}
        {recentPulses.map(pulse => (
            <div
                key={pulse.id}
                className="absolute rounded-full animate-ping"
                style={{
                    left: `${pulse.x * 100}%`,
                    top: `${pulse.y * 100}%`,
                    width: '8px',
                    height: '8px',
                    backgroundColor: pulse.data.confidence > 0.5 ? 'rgba(0, 255, 255, 0.8)' : 'rgba(255, 165, 0, 0.8)',
                    boxShadow: `0 0 8px ${pulse.data.confidence > 0.5 ? 'rgba(0, 255, 255, 0.8)' : 'rgba(255, 165, 0, 0.8)'}`,
                    opacity: 0,
                    animationName: 'pulse-fade',
                    animationDuration: '1.5s',
                    animationTimingFunction: 'ease-out'
                }}
            />
        ))}
        <style>{`
            @keyframes pulse-fade {
                0% { opacity: 1; transform: scale(0.5); }
                100% { opacity: 0; transform: scale(2); }
            }
        `}</style>
         <div className="absolute bottom-2 right-2 text-xs font-mono bg-gray-800/80 p-2 rounded">
            <p>Pulses Active: <span className="text-cyan-400">{pulses.length}</span></p>
         </div>
    </div>
  );
};

export default PulseTelemetry;