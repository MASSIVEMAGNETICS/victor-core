
export enum SimulationStatus {
  Idle = 'IDLE',
  Running = 'RUNNING',
}

export interface Thread {
  id: string;
  parentId: string | null;
  level: number;
  label: string;
  state: 'active' | 'completed' | 'error';
  memoryAccess?: string;
}

export interface Pulse {
  id: string;
  threadId: string;
  timestamp: number;
  data: {
    load: number;
    confidence: number;
  };
  x: number;
  y: number;
}

export interface MemoryNode {
    id: string;
    label: string;
    children?: MemoryNode[];
}

export interface SimulationState {
  status: SimulationStatus;
  threads: Thread[];
  pulses: Pulse[];
  activeMemoryNode: string | null;
  tick: number;
}
