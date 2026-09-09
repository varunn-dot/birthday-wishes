import React from 'react';

export const ProgressBar = ({ progress = 0 }) => {
  return (
    <div className="w-full space-y-1.5">
      <div className="flex justify-between items-center text-xs font-semibold">
        <span className="text-pink-300 flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
          Vault Progress
        </span>
        <span className="font-mono text-purple-300 font-bold">{progress}%</span>
      </div>
      
      <div className="w-full h-3 bg-black/60 rounded-full p-0.5 border border-pink-500/20 overflow-hidden shadow-inner">
        <div
          className="h-full rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-pink-400 transition-all duration-700 ease-out shadow-[0_0_12px_rgba(236,72,153,0.8)]"
          style={{ width: `${Math.max(0, Math.min(100, progress))}%` }}
        />
      </div>
    </div>
  );
};
