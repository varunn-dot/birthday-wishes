import React from 'react';
import { ConfettiCanvas } from '../components/ConfettiCanvas';
import { CelebrationBadge } from '../components/CelebrationBadge';
import { GradientButton } from '../components/GradientButton';
import { Heart, ArrowRight, Sparkles } from 'lucide-react';

export const HeroScreen = ({ onCelebrate }) => {
  return (
    <div className="min-h-screen w-full bg-master-gradient text-slate-800 flex flex-col justify-between items-center px-6 py-10 text-center relative overflow-hidden select-none">
      {/* Falling Confetti Canvas */}
      <ConfettiCanvas />

      {/* Top Header Badge */}
      <div className="pt-6 relative z-20">
        <CelebrationBadge text="✨ SPECIAL CELEBRATION ✨" />
      </div>

      {/* Main Center Content */}
      <div className="max-w-md w-full space-y-6 my-auto relative z-20">
        {/* Main Script Heading */}
        <div className="space-y-2">
          <h1 className="text-5xl sm:text-6xl font-normal text-pink-600 font-dancing text-glow-script leading-tight py-1">
            ✨ For My Favorite Person ✨
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-pink-800/80">
            Happy Birthday Ramya, something special is waiting for you...
          </p>
        </div>

        {/* Light White Greeting Card */}
        <div className="light-card p-6 rounded-3xl text-slate-700 text-sm leading-relaxed font-medium space-y-3 relative overflow-hidden">
          <div className="text-4xl animate-bounce-slow py-1">
            🎁 💕 🎂
          </div>
          <p>
            Every moment with you is a celebration, but today is especially magical. Here's to another beautiful year of love, laughter, and countless glowing memories together. 💕
          </p>
        </div>

        {/* Master Pink/Magenta Pill Button */}
        <div className="pt-2">
          <GradientButton
            onClick={onCelebrate}
            icon={Heart}
          >
            <span>Begin the Celebration ✨</span>
            <ArrowRight className="w-5 h-5 ml-1 inline-block" />
          </GradientButton>
        </div>
      </div>

      {/* Bottom Status Pill */}
      <div className="w-full max-w-md flex justify-center pt-4 relative z-20">
        <div className="px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-pink-200 text-pink-700 text-xs font-semibold flex items-center gap-2 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
          <span>✨ Celebrating Ramya's Special Day</span>
        </div>
      </div>
    </div>
  );
};
