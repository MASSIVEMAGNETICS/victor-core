
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ControlPanel from './components/ControlPanel';
import Quadrant from './components/Quadrant';
import AlwaysOnSubconscious from './components/visualizations/AlwaysOnSubconscious';
import HierarchicalMultiThreading from './components/visualizations/HierarchicalMultiThreading';
import PulseTelemetry from './components/visualizations/PulseTelemetry';
import FractalMemory from './components/visualizations/FractalMemory';
import type { SimulationState } from './types';
import { SimulationStatus } from './types';

const App: React.FC = () => {
  const [simulationState, setSimulationState] = useState<SimulationState>({
    status: SimulationStatus.Idle,
    threads: [],
    pulses: [],
    activeMemoryNode: null,
    tick: 0,
  });

  const startSimulation = useCallback(() => {
    setSimulationState({
      status: SimulationStatus.Running,
      threads: [],
      pulses: [],
      activeMemoryNode: null,
      tick: 0
    });
  }, []);

  const stopSimulation = useCallback(() => {
    setSimulationState(prevState => ({ ...prevState, status: SimulationStatus.Idle }));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col p-4">
      <Header />
      <ControlPanel 
        status={simulationState.status} 
        onStart={startSimulation} 
        onStop={stopSimulation} 
      />
      <main className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Quadrant title="1. Always-On Subconscious">
          <AlwaysOnSubconscious />
        </Quadrant>
        <Quadrant title="2. Hierarchical Multi-threading">
          {/* FIX: Pass threads from simulationState to the component. */}
          <HierarchicalMultiThreading setSimulationState={setSimulationState} status={simulationState.status} threads={simulationState.threads} />
        </Quadrant>
        <Quadrant title="3. Pulse Telemetry">
          <PulseTelemetry pulses={simulationState.pulses} status={simulationState.status} />
        </Quadrant>
        <Quadrant title="4. Fractal Memory">
          <FractalMemory activeNodeId={simulationState.activeMemoryNode} status={simulationState.status} />
        </Quadrant>
      </main>
    </div>
  );
};

export default App;
