import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVault } from '../context/VaultContext';
import { Lock, Sparkles, Zap, Timer } from 'lucide-react';
import { launchConfetti } from '../utils/confetti';
import { sounds } from '../utils/soundEffects';

export const CountdownPage = () => {
  const navigate = useNavigate();
  const { countdownTarget, isCountdownComplete, completeCountdown, devFastForwardCountdown } = useVault();
  const [timeLeft, setTimeLeft] = useState({ hours: 24, minutes: 0, seconds: 0 });
  const [isZero, setIsZero] = useState(false);

  // Calculate real remaining time continuously
  useEffect(() => {
    // If already complete, jump to reveal
    if (isCountdownComplete) {
      navigate('/reveal');
      return;
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, countdownTarget - now);

      if (diff <= 0) {
        clearInterval(interval);
        if (!isZero) {
          setIsZero(true);
          sounds.playSuccess();
          launchConfetti();
          completeCountdown();
          setTimeout(() => {
            navigate('/reveal');
          }, 2000);
        }
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownTarget, isCountdownComplete, isZero, navigate, completeCountdown]);

  const handleDevSkip = () => {
    sounds.playUnlock();
    launchConfetti();
    devFastForwardCountdown();
    navigate('/reveal');
  };

  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <div className="flex-1 flex flex-col justify-between items-center px-6 py-10 text-center relative z-10 select-none">
      {/* Top Lock Badge */}
      <div className="flex flex-col items-center gap-3 pt-6 animate-float">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-pink-500/20 to-purple-600/30 border border-pink-500/40 flex items-center justify-center glow-pink shadow-lg">
          <Lock className="w-8 h-8 text-pink-400 animate-pulse" />
        </div>
        <span className="px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold tracking-wider uppercase flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" style={{ animationDuration: '4s' }} />
          Encrypted Birthday Vault
        </span>
      </div>

      {/* Main Countdown Titles */}
      <div className="space-y-3 my-auto">
        <p className="text-slate-400 text-sm font-medium tracking-wide">
          Something special is locked...
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-300 font-cinzel text-glow-pink">
          Her Birthday Vault
        </h1>

        {/* Big Countdown Timer Display */}
        <div className="py-6 my-4">
          <div className="glass-panel p-6 rounded-3xl border border-pink-500/30 shadow-[0_0_40px_rgba(236,72,153,0.2)] flex justify-center items-center gap-3">
            <div className="flex flex-col items-center">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-pink-400 text-glow-pink">
                {formatNumber(timeLeft.hours)}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">Hours</span>
            </div>
            <span className="text-3xl font-mono text-pink-500 animate-pulse pb-4">:</span>
            <div className="flex flex-col items-center">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-purple-300 text-glow-purple">
                {formatNumber(timeLeft.minutes)}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">Mins</span>
            </div>
            <span className="text-3xl font-mono text-purple-500 animate-pulse pb-4">:</span>
            <div className="flex flex-col items-center">
              <span className="text-4xl sm:text-5xl font-extrabold font-mono text-pink-300">
                {formatNumber(timeLeft.seconds)}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 mt-1">Secs</span>
            </div>
          </div>
        </div>

        <p className="text-slate-400 text-xs italic">
          Come back when the clock hits zero.
        </p>
      </div>

      {/* Footer & Dev Tester Controls */}
      <div className="w-full space-y-4 pb-4">
        <div className="p-3 rounded-2xl bg-black/40 border border-white/5 text-slate-500 text-[11px] flex items-center justify-center gap-2">
          <Timer className="w-3.5 h-3.5 text-pink-400 shrink-0" />
          <span>Timer is live and saved automatically in localStorage</span>
        </div>

        {/* Fast forward testing button */}
        <button
          onClick={handleDevSkip}
          className="w-full py-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-300 hover:bg-purple-900/50 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <Zap className="w-3.5 h-3.5 text-yellow-400" />
          <span>⚡ Fast-Forward Timer to 0:00 (Tester Mode)</span>
        </button>
      </div>
    </div>
  );
};
