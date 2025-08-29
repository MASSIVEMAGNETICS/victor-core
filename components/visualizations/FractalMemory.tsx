
import React from 'react';
import type { SimulationStatus } from '../../types';

interface FractalMemoryProps {
  activeNodeId: string | null;
  status: SimulationStatus;
}

interface MemoryNodeProps {
  id: string;
  label: string;
  level: number;
  activeNodeId: string | null;
  children?: { id: string, label: string }[];
}

const MemoryNodeComponent: React.FC<MemoryNodeProps> = ({ id, label, level, activeNodeId, children }) => {
    const isActive = activeNodeId === id;
    const baseSize = 200;
    const size = baseSize / (level * 1.5);

    return (
        <div
            className={`absolute flex items-center justify-center border rounded-full transition-all duration-500 ${isActive ? 'border-purple-400 bg-purple-500/30 scale-110' : 'border-cyan-700 bg-gray-800/50'}`}
            style={{
                width: `${size}px`,
                height: `${size}px`,
                transform: `translate(-50%, -50%)`,
            }}
        >
            <span className={`text-xs ${isActive ? 'text-purple-300' : 'text-cyan-300'}`}>{label}</span>
            {level < 3 && children && (
                <div className="relative w-full h-full">
                    {children.map((child, index) => {
                        const angle = (index / children.length) * 2 * Math.PI;
                        const radius = size * 0.7;
                        const x = Math.cos(angle) * radius + size / 2;
                        const y = Math.sin(angle) * radius + size / 2;
                        return (
                            <div key={child.id} style={{ left: `${x}px`, top: `${y}px` }}>
                                <MemoryNodeComponent
                                    id={child.id}
                                    label={child.label}
                                    level={level + 1}
                                    activeNodeId={activeNodeId}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

const memoryData = {
    id: 'root',
    label: 'ANIMAL',
    children: [
        {
            id: 'bird', label: 'BIRD', children: [
                { id: 'sparrow', label: 'sparrow' },
                { id: 'feathers', label: 'feathers' },
            ]
        },
        {
            id: 'context', label: 'CONTEXT', children: [
                { id: 'sky', label: 'sky' },
                { id: 'summer', label: 'summer' }
            ]
        },
        {
            id: 'threat', label: 'THREAT', children: [
                { id: 'threat_high', label: 'high' },
                { id: 'object_unknown', label: 'unknown' }
            ]
        }
    ]
};


const FractalMemory: React.FC<FractalMemoryProps> = ({ activeNodeId, status }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
        <div className="relative w-64 h-64">
             <MemoryNodeComponent 
                id={memoryData.id}
                label={memoryData.label}
                level={1}
                activeNodeId={activeNodeId}
                children={memoryData.children}
             />
        </div>
    </div>
  );
};

export default FractalMemory;
