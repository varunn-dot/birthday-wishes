import React from 'react';
import { ParticleBackground } from './ParticleBackground';
import { UnlockToast } from './UnlockToast';

export const MobileFrame = ({ children }) => {
  return (
    <div className="relative min-h-screen w-full bg-[#05030a] text-slate-100 flex justify-center items-center overflow-x-hidden selection:bg-pink-500 selection:text-white">
      {/* Dynamic ambient gradient background for desktop */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-pink-600/20 to-purple-800/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-purple-600/20 to-indigo-900/10 blur-[120px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Particle Canvas */}
      <ParticleBackground />

      {/* Unlock Toast Notification */}
      <UnlockToast />

      {/* Centered Mobile Phone Container */}
      <div className="relative z-10 w-full max-w-[430px] min-h-screen sm:min-h-[850px] sm:max-h-[92vh] sm:rounded-[36px] bg-[#090514]/90 backdrop-blur-2xl border border-pink-500/20 shadow-[0_0_60px_rgba(236,72,153,0.15)] flex flex-col overflow-hidden sm:my-4 transition-all duration-300">
        {/* Decorative Top Camera Notch / Bar for sleek phone aesthetic on desktop */}
        <div className="hidden sm:flex justify-center pt-2 pb-1 bg-black/40 border-b border-white/5">
          <div className="w-24 h-4 bg-black/70 rounded-full border border-white/10 flex items-center justify-end px-2">
            <div className="w-2 h-2 rounded-full bg-pink-500/80 animate-pulse" />
          </div>
        </div>

        {/* Scrollable Mobile App Shell Body */}
        <div className="flex-1 flex flex-col overflow-y-auto overflow-x-hidden relative">
          {children}
        </div>
      </div>
    </div>
  );
};
