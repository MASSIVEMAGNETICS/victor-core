
import React, { useEffect, useRef } from 'react';
import type { SimulationState, Thread } from '../../types';
import { SimulationStatus } from '../../types';

interface HierarchicalMultiThreadingProps {
  status: SimulationStatus;
  setSimulationState: React.Dispatch<React.SetStateAction<SimulationState>>;
  // FIX: Add threads to props to receive it from the parent component.
  threads: Thread[];
}

const threadLabels = [
  'Identify Object', 'Calculate Trajectory', 'Access Memories', 'Predict Outcome',
  'Analyze Shape', 'Analyze Color', 'Texture Scan', 'Sound Analysis', 'Memory Query',
  'Risk Assessment', 'Resource Allocation', 'Pathfinding'
];

const memoryAccessLabels = ['sparrow', 'sky', 'summer', 'threat_high', 'object_unknown'];

const generateThread = (parentId: string | null, level: number): Thread => {
    const id = `thread-${Date.now()}-${Math.random()}`;
    const label = threadLabels[Math.floor(Math.random() * threadLabels.length)];
    const accessMemory = Math.random() > 0.6;
    return {
        id,
        parentId,
        level,
        label: `${label} L${level}`,
        state: 'active',
        memoryAccess: accessMemory ? memoryAccessLabels[Math.floor(Math.random() * memoryAccessLabels.length)] : undefined,
    };
};


const HierarchicalMultiThreading: React.FC<HierarchicalMultiThreadingProps> = ({ status, setSimulationState, threads }) => {
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (status === SimulationStatus.Running) {
        // Reset and start
        setSimulationState(prevState => ({
            ...prevState,
            threads: [generateThread(null, 1)],
            pulses: [],
            activeMemoryNode: null,
            tick: 0,
        }));

        intervalRef.current = window.setInterval(() => {
            setSimulationState(prevState => {
                if (prevState.threads.length > 30) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                    return { ...prevState, status: SimulationStatus.Idle };
                }

                const newThreads: Thread[] = [];
                const newPulses = [...prevState.pulses];
                let newActiveMemoryNode = prevState.activeMemoryNode;

                prevState.threads.forEach(thread => {
                    // Spawn new threads
                    if (thread.level < 4 && Math.random() > 0.7) {
                        newThreads.push(generateThread(thread.id, thread.level + 1));
                    }
                    // Generate pulses
                    if (Math.random() > 0.5) {
                        newPulses.push({
                            id: `pulse-${Date.now()}-${Math.random()}`,
                            threadId: thread.id,
                            timestamp: Date.now(),
                            data: {
                                load: Math.random(),
                                confidence: Math.random(),
                            },
                            x: Math.random(),
                            y: Math.random(),
                        });
                    }
                    // Access memory
                    if (thread.memoryAccess && Math.random() > 0.8) {
                        newActiveMemoryNode = thread.memoryAccess;
                    }
                });

                return {
                    ...prevState,
                    threads: [...prevState.threads, ...newThreads],
                    pulses: newPulses,
                    activeMemoryNode: newActiveMemoryNode,
                    tick: prevState.tick + 1,
                };
            });
        }, 500);
    } else {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    }

    return () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status, setSimulationState]);

  // FIX: Removed the incorrect useSyncExternalStore implementation which caused the errors.
  // The component now receives threads via props.

  return (
    <div className="p-2 space-y-1 text-xs overflow-auto h-full">
      {threads.map(thread => (
        <div key={thread.id} style={{ marginLeft: `${thread.level * 15}px` }} className="flex items-center">
          <span className="text-cyan-400 mr-2">{'>'}</span>
          <span className="font-mono bg-gray-700/50 px-2 py-1 rounded">{thread.label}</span>
          {thread.memoryAccess && <span className="ml-2 font-mono text-purple-400 bg-purple-500/20 px-2 py-1 rounded">MEM: {thread.memoryAccess}</span>}
        </div>
      ))}
    </div>
  );
};


export default HierarchicalMultiThreading;