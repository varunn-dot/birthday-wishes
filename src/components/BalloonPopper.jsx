import React, { useState } from 'react';
import { sounds } from '../utils/soundEffects';
import { launchBurst } from '../utils/confetti';

export const BalloonPopper = ({ onSelectWish }) => {
  const [poppedIds, setPoppedIds] = useState([]);

  const balloons = [
    {
      id: 1,
      color: 'from-pink-400 to-rose-500',
      shadow: 'shadow-pink-400/50',
      stringColor: 'bg-pink-400',
      emoji: '💖',
      title: 'Pink Wish',
      wish: 'May this year bring you endless reasons to smile every single day. 💕'
    },
    {
      id: 2,
      color: 'from-purple-400 to-indigo-500',
      shadow: 'shadow-purple-400/50',
      stringColor: 'bg-purple-400',
      emoji: '🔮',
      title: 'Purple Wish',
      wish: 'Wishing you unbounded happiness, love, and continuous sweet adventures! 🌸'
    },
    {
      id: 3,
      color: 'from-sky-400 to-blue-500',
      shadow: 'shadow-sky-400/50',
      stringColor: 'bg-sky-400',
      emoji: '⭐',
      title: 'Blue Wish',
      wish: 'May all your wildest dreams, hopes, and aspirations come true this year. ✨'
    },
    {
      id: 4,
      color: 'from-emerald-400 to-teal-500',
      shadow: 'shadow-emerald-400/50',
      stringColor: 'bg-emerald-400',
      emoji: '🌿',
      title: 'Green Wish',
      wish: 'Cheers to a year filled with wonderful health, endless laughter, and peaceful joy! 🍃'
    },
    {
      id: 5,
      color: 'from-amber-400 to-yellow-500',
      shadow: 'shadow-amber-400/50',
      stringColor: 'bg-amber-400',
      emoji: '☀️',
      title: 'Yellow Wish',
      wish: 'You are a true ray of bright sunshine in everyone’s life around you! 🌻'
    }
  ];

  const handlePop = (balloon) => {
    if (poppedIds.includes(balloon.id)) return;

    sounds.playUnlock();
    launchBurst();
    setPoppedIds((prev) => [...prev, balloon.id]);
    onSelectWish && onSelectWish(balloon);
  };

  return (
    <div className="light-card p-6 rounded-3xl border border-pink-200 text-center space-y-6 relative overflow-hidden">
      <div className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-extrabold text-pink-600 font-dancing flex items-center justify-center gap-2">
          <span>🎈 Pop My Wishing Balloons! 🎈</span>
        </h2>
        <p className="text-xs font-semibold text-pink-800/80">
          Click a balloon to reveal a special wish
        </p>
      </div>

      {/* Balloons Container */}
      <div className="flex flex-wrap justify-center items-end gap-5 sm:gap-8 pt-4 pb-2 min-h-[160px]">
        {balloons.map((b, idx) => {
          const isPopped = poppedIds.includes(b.id);
          return (
            <div
              key={b.id}
              onClick={() => handlePop(b)}
              className={`group flex flex-col items-center cursor-pointer select-none transition-all duration-300 ${
                isPopped ? 'opacity-40 scale-75 cursor-default' : 'hover:scale-115 active:scale-95 animate-balloon-sway'
              }`}
              style={{ animationDelay: `${idx * 0.4}s` }}
            >
              {!isPopped ? (
                <>
                  {/* Balloon Body */}
                  <div
                    className={`w-14 h-18 sm:w-16 sm:h-20 rounded-[50%_50%_50%_50%/40%_40%_60%_60%] bg-gradient-to-tr ${b.color} shadow-lg ${b.shadow} flex items-center justify-center text-lg relative`}
                  >
                    {/* Shine Highlight */}
                    <div className="absolute top-2 left-2 w-3 h-4 bg-white/50 rounded-full blur-[1px]" />
                    <span>{b.emoji}</span>
                  </div>
                  {/* Balloon Knot */}
                  <div className={`w-2.5 h-1.5 ${b.stringColor} rounded-sm -mt-0.5`} />
                  {/* Balloon String */}
                  <div className={`w-0.5 h-10 ${b.stringColor} opacity-70`} />
                </>
              ) : (
                <div className="w-12 h-12 rounded-full border-2 border-dashed border-pink-300 flex items-center justify-center text-xs font-bold text-pink-400">
                  POPPED
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
