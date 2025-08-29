
import React, { useMemo } from 'react';

const GRID_SIZE = 25;

const AlwaysOnSubconscious: React.FC = () => {
  const gridConfig = useMemo(() => {
    return Array.from({ length: GRID_SIZE * GRID_SIZE }, () => ({
      delay: `${Math.random() * 5}s`,
      duration: `${3 + Math.random() * 4}s`,
      baseOpacity: 0.05 + Math.random() * 0.1,
      peakOpacity: 0.1 + Math.random() * 0.2,
    }));
  }, []);

  return (
    <>
      <div
        className="absolute inset-0 grid gap-px"
        style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
      >
        {gridConfig.map((config, i) => (
          <div
            key={i}
            className="cell-pulse"
            style={{
              '--delay': config.delay,
              '--duration': config.duration,
              '--base-opacity': config.baseOpacity,
              '--peak-opacity': config.peakOpacity,
              backgroundColor: `rgb(0, 255, 255)`,
            } as React.CSSProperties}
          />
        ))}
      </div>
      <style>{`
        @keyframes subtle-pulse {
          0%, 100% {
            transform: scale(1);
            opacity: var(--base-opacity);
          }
          50% {
            transform: scale(1.05);
            opacity: var(--peak-opacity);
          }
        }
        .cell-pulse {
          animation: subtle-pulse var(--duration) infinite ease-in-out;
          animation-delay: var(--delay);
        }
      `}</style>
    </>
  );
};

export default AlwaysOnSubconscious;
