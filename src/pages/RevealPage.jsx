import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, KeyRound, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { launchConfetti } from '../utils/confetti';

export const RevealPage = () => {
  const navigate = useNavigate();
  const [isRippling, setIsRippling] = useState(false);

  const handleEnterVault = (e) => {
    sounds.playUnlock();
    launchConfetti();
    setIsRippling(true);

    setTimeout(() => {
      navigate('/vault');
    }, 400);
  };

  return (
    <div className="flex-1 flex flex-col justify-between items-center px-6 py-12 text-center relative z-10 select-none">
      {/* Glow Center Ambient */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse-glow" />

      {/* Top Icon Badge */}
      <div className="pt-8 animate-float">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-600 p-0.5 shadow-[0_0_50px_rgba(236,72,153,0.5)]">
          <div className="w-full h-full bg-[#0d071a] rounded-full flex items-center justify-center border border-pink-400/40">
            <KeyRound className="w-10 h-10 text-pink-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Reveal Banner */}
      <div className="space-y-4 my-auto relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/40 text-pink-300 text-xs font-bold tracking-widest uppercase glow-pink">
          <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
          ACCESS GRANTED
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-pink-400 font-cinzel text-glow-pink tracking-tight leading-tight">
          IT'S HER BIRTHDAY ✨
        </h1>

        <p className="text-slate-300 text-sm font-medium max-w-xs mx-auto leading-relaxed">
          Someone just unlocked something special made exclusively for her.
        </p>
      </div>

      {/* Big Glowing ENTER THE VAULT Button */}
      <div className="w-full pb-8 relative z-10">
        <button
          onClick={handleEnterVault}
          className={`group relative w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-pink-500 text-white font-extrabold text-base tracking-wider uppercase border border-pink-400/50 shadow-[0_0_35px_rgba(236,72,153,0.6)] hover:shadow-[0_0_50px_rgba(236,72,153,0.9)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden ${
            isRippling ? 'scale-95 opacity-90' : ''
          }`}
        >
          {/* Ripple animation overlay */}
          {isRippling && (
            <span className="absolute inset-0 bg-white/30 animate-ping rounded-2xl pointer-events-none" />
          )}

          <span className="relative z-10 flex items-center gap-2.5">
            <KeyRound className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            <span>ENTER THE VAULT</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>

          {/* Shimmer gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </button>
      </div>
    </div>
  );
};
