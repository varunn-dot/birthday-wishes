import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVault } from '../context/VaultContext';
import { HeaderNav } from '../components/HeaderNav';
import { Heart, Sparkles, ChevronLeft, Volume2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { launchBurst } from '../utils/confetti';

export const MessagePage = () => {
  const navigate = useNavigate();
  const { markFeatureVisited, cousinName } = useVault();

  const lines = [
    "Okay... enough exploring.",
    `To my favorite partner-in-crime, ${cousinName}...`,
    "Another year older, but somehow not a single bit wiser.",
    "Through every chaotic phone call, 2 AM reel spam, and unnecessary argument...",
    "You've been the absolute best cousin anyone could ever ask for.",
    "May your year be filled with endless laughters, stolen snacks, and legendary memories.",
    "Happy Birthday ❤️"
  ];

  const [visibleLinesCount, setVisibleLinesCount] = useState(1);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    markFeatureVisited('message');
  }, [markFeatureVisited]);

  useEffect(() => {
    if (visibleLinesCount < lines.length) {
      const timer = setTimeout(() => {
        sounds.playTypewriter();
        setVisibleLinesCount(prev => prev + 1);
      }, 1600);
      return () => clearTimeout(timer);
    } else {
      setIsFinished(true);
      launchBurst();
      sounds.playSuccess();
    }
  }, [visibleLinesCount, lines.length]);

  const handleBack = () => {
    sounds.playClick();
    navigate('/vault');
  };

  return (
    <div className="flex-1 flex flex-col min-h-full pb-8">
      <HeaderNav title="💌 Birthday Message" />

      <div className="p-5 my-auto flex flex-col justify-center items-center text-center relative z-10 space-y-6">
        {/* Floating Heart Icon */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 p-0.5 glow-pink animate-float">
          <div className="w-full h-full bg-[#0d071a] rounded-full flex items-center justify-center">
            <Heart className="w-8 h-8 text-pink-400 fill-pink-500/30 animate-pulse" />
          </div>
        </div>

        {/* Message Container Card */}
        <div className="glass-panel p-6 rounded-3xl border border-pink-500/30 shadow-[0_0_40px_rgba(236,72,153,0.15)] w-full max-w-sm space-y-4 min-h-[300px] flex flex-col justify-center">
          {lines.slice(0, visibleLinesCount).map((line, idx) => {
            const isLast = idx === lines.length - 1;
            return (
              <p
                key={idx}
                className={`transition-all duration-700 ${
                  isLast
                    ? 'text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-pink-300 font-cinzel pt-4 text-glow-pink animate-bounce'
                    : idx === 0
                    ? 'text-xs uppercase font-bold tracking-widest text-pink-400'
                    : 'text-sm text-slate-200 font-medium leading-relaxed'
                }`}
              >
                {line}
              </p>
            );
          })}

          {!isFinished && (
            <div className="flex justify-center pt-2">
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-ping" />
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="w-full pt-4">
          <button
            onClick={handleBack}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-sm tracking-wide border border-pink-400/40 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>BACK TO VAULT</span>
          </button>
        </div>
      </div>
    </div>
  );
};
