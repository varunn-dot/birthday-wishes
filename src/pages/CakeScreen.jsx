import React, { useState } from 'react';
import { ConfettiCanvas } from '../components/ConfettiCanvas';
import { CelebrationBadge } from '../components/CelebrationBadge';
import { GradientButton } from '../components/GradientButton';
import { Heart, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { launchConfetti } from '../utils/confetti';

export const CakeScreen = ({ onNext }) => {
  const [candlesBlown, setCandlesBlown] = useState(false);

  const handleBlowCandles = () => {
    if (!candlesBlown) {
      sounds.playSuccess();
      launchConfetti();
      setCandlesBlown(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-master-gradient text-slate-800 flex flex-col justify-between items-center px-6 py-10 text-center relative overflow-hidden select-none">
      {/* Falling Confetti Layer */}
      <ConfettiCanvas />

      {/* Header Section */}
      <div className="space-y-2 pt-6 relative z-20">
        <CelebrationBadge text="Wish Made Successfully! 💕" />

        <h1 className="text-4xl sm:text-5xl font-extrabold text-pink-600 font-dancing tracking-wide py-1 drop-shadow-sm">
          Let's Cut the Cake! 🎂
        </h1>
      </div>

      {/* Floating Interactive Pink Birthday Cake */}
      <div className="my-auto relative z-20 flex flex-col items-center">
        <div
          onClick={handleBlowCandles}
          className="cursor-pointer group flex flex-col items-center transition-all duration-300 animate-cake-float"
        >
          {/* Candle Flame Indicator */}
          <div className="flex gap-4 mb-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center">
                {!candlesBlown ? (
                  <div className="w-3.5 h-5 rounded-full bg-gradient-to-t from-amber-400 to-yellow-200 animate-pulse shadow-[0_0_12px_rgba(251,191,36,0.9)]" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-slate-400 opacity-60" />
                )}
                <div className="w-1.5 h-6 bg-pink-300 rounded-full" />
              </div>
            ))}
          </div>

          {/* Layer 1 - Top Frosting */}
          <div className="w-36 h-10 bg-gradient-to-r from-pink-400 via-pink-300 to-rose-400 rounded-t-2xl border-b-2 border-pink-200 flex items-center justify-around px-2 shadow-md">
            <span className="text-xs">🍓</span>
            <span className="text-xs">✨</span>
            <span className="text-xs">🍓</span>
          </div>

          {/* Layer 2 - Middle Cake */}
          <div className="w-48 h-12 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 border-b-2 border-pink-300 flex items-center justify-between px-4 shadow-md">
            <div className="w-3 h-3 rounded-full bg-white/60" />
            <div className="w-3 h-3 rounded-full bg-white/60" />
            <div className="w-3 h-3 rounded-full bg-white/60" />
            <div className="w-3 h-3 rounded-full bg-white/60" />
          </div>

          {/* Layer 3 - Base Cake */}
          <div className="w-60 h-14 bg-gradient-to-r from-pink-600 via-pink-500 to-purple-500 rounded-b-3xl flex items-center justify-around px-6 shadow-lg">
            <span className="text-sm">💖</span>
            <span className="text-sm font-bold text-white tracking-widest font-dancing">HAPPY BIRTHDAY</span>
            <span className="text-sm">💖</span>
          </div>

          {/* Glowing Platform / Cake Stand */}
          <div className="w-68 h-4 bg-white/80 rounded-full border border-pink-300 shadow-[0_10px_30px_rgba(244,114,182,0.6)] mt-1" />
        </div>

        {/* Helper Hint */}
        <p className="text-xs text-pink-800 font-semibold mt-4">
          {!candlesBlown ? 'Tap the cake to blow out the candles! 🕯️' : '✨ Candles Blown! Wishes Granted! ✨'}
        </p>
      </div>

      {/* Transition to Main Page Button */}
      <div className="w-full max-w-md pb-6 relative z-20">
        <GradientButton
          onClick={onNext}
          icon={Heart}
        >
          <span>Open Ramya's Birthday Cards ✨</span>
          <ArrowRight className="w-5 h-5 ml-1 inline-block" />
        </GradientButton>
      </div>
    </div>
  );
};
