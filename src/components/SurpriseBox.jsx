import React, { useState } from 'react';
import { Gift, Heart, Sparkles } from 'lucide-react';
import { GradientButton } from './GradientButton';
import { useBirthdayConfig } from '../context/BirthdayConfigContext';
import { sounds } from '../utils/soundEffects';
import { launchBurst } from '../utils/confetti';

export const SurpriseBox = () => {
  const { photoUrl, isLoading } = useBirthdayConfig();

  const [phase, setPhase] = useState(() => {
    return localStorage.getItem('sb_surprise_opened') === 'true' ? 'revealed' : 'unopened';
  });

  const [statusText, setStatusText] = useState("Something special is hiding inside...");
  const [memorySaved, setMemorySaved] = useState(false);

  // Cinematic unboxing timeline handler
  const handleOpenSurprise = () => {
    if (phase !== 'unopened') return;

    // Step 1: Glow (0.0s - 0.5s)
    setPhase('glowing');
    setStatusText("Wait... what's inside? 👀");
    sounds.playRumble();

    // Step 2: Box Shakes (0.5s - 1.2s)
    setTimeout(() => {
      setPhase('shaking');
      sounds.playRumble();
    }, 500);

    // Step 3: Cracks Develop (1.2s - 2.5s)
    setTimeout(() => {
      setPhase('cracking');
      setStatusText("Something is breaking out... 💕");
      sounds.playRumble();
    }, 1200);

    // Step 4: Box Breaks Open & Light Burst (2.5s - 3.8s)
    setTimeout(() => {
      setPhase('opening');
      sounds.playSuccess();
      launchBurst();
    }, 2500);

    // Step 5 & 6: Photo Frame & Message Reveal (3.8s+)
    setTimeout(() => {
      setPhase('revealed');
      localStorage.setItem('sb_surprise_opened', 'true');
    }, 3800);
  };

  const handleKeepMemory = () => {
    sounds.playUnlock();
    launchBurst();
    setMemorySaved(true);
    setTimeout(() => {
      setMemorySaved(false);
    }, 4000);
  };

  return (
    <div className="light-card p-6 sm:p-8 flex flex-col justify-between items-center text-center border-2 border-pink-300 relative overflow-hidden transition-all duration-500 w-full min-h-[420px]">
      
      {/* Toast Notification for Memory Saved */}
      {memorySaved && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 px-5 py-2 rounded-full bg-gradient-to-r from-[#ff3f9f] to-[#8d24ff] text-white font-bold text-xs shadow-lg animate-bounce flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-yellow-300" />
          <span>Memory saved forever ✨</span>
        </div>
      )}

      {/* BEFORE & DURING OPENING PHASES */}
      {phase !== 'revealed' ? (
        <div className="my-auto space-y-6 w-full max-w-md flex flex-col items-center">
          
          {/* Top Label */}
          <div className="space-y-1">
            <span className="text-4xl">🎁</span>
            <h3 className="text-2xl font-extrabold text-pink-600 font-dancing tracking-wide">
              One Little Surprise
            </h3>
            <p className="text-xs font-semibold text-pink-800/80">
              {statusText}
            </p>
          </div>

          {/* Animated Visual Gift Box Container */}
          <div className="relative py-4 my-2 flex items-center justify-center">
            
            {/* Pink Glow Layer */}
            <div
              className={`absolute inset-0 rounded-full bg-pink-400/40 blur-2xl transition-all duration-500 ${
                ['glowing', 'shaking', 'cracking', 'opening'].includes(phase) ? 'scale-125 bg-pink-500/60 opacity-100' : 'opacity-0'
              }`}
            />

            {/* Crack Lines Overlay */}
            {(phase === 'cracking' || phase === 'opening') && (
              <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
                <svg className="w-32 h-32 text-pink-500 stroke-current stroke-2 animate-pulse">
                  <path d="M 30,20 L 50,45 L 40,70 L 65,100" fill="none" />
                  <path d="M 90,30 L 70,55 L 80,80 L 55,105" fill="none" />
                  <path d="M 60,10 L 55,40 L 75,60" fill="none" />
                </svg>
              </div>
            )}

            {/* Gift Box Body */}
            <div
              className={`w-32 h-32 rounded-3xl bg-gradient-to-br from-pink-400 via-rose-500 to-purple-600 p-0.5 shadow-[0_10px_35px_rgba(255,79,163,0.4)] flex items-center justify-center relative z-10 transition-all duration-300 ${
                phase === 'shaking' || phase === 'cracking' ? 'animate-box-shake scale-105' : ''
              } ${phase === 'opening' ? 'scale-110 rotate-6 opacity-80' : ''}`}
            >
              <div className="w-full h-full bg-white rounded-3xl flex flex-col items-center justify-center border border-pink-200 relative overflow-hidden">
                
                {/* Ribbon details */}
                <div className="absolute w-6 h-full bg-pink-400/20" />
                <div className="absolute w-full h-6 bg-pink-400/20" />

                <Gift className={`w-14 h-14 text-pink-500 relative z-10 ${phase === 'shaking' ? 'animate-bounce' : ''}`} />

                {/* Floating sparkles */}
                {phase !== 'unopened' && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Sparkles className="w-6 h-6 text-yellow-400 animate-spin absolute -top-1 -right-1" />
                    <Heart className="w-5 h-5 text-pink-500 animate-ping absolute -bottom-1 -left-1" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="w-full pt-2">
            <GradientButton
              onClick={handleOpenSurprise}
              disabled={phase !== 'unopened'}
              icon={Gift}
            >
              <span>{phase === 'unopened' ? 'Open Your Surprise ✨' : 'Unwrapping... 💕'}</span>
            </GradientButton>
          </div>
        </div>
      ) : (
        /* REVEALED STATE (Photo Frame + Birthday Message) */
        <div className="w-full space-y-5 animate-frame-rise my-auto py-2">
          
          {/* Header Badge */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-100 border border-pink-300 text-pink-600 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-pink-500" />
            ✨ PHOTO FRAME REVEAL ✨
          </div>

          {/* Decorative White/Pink Photo Frame Container */}
          <div className="w-full max-w-xs mx-auto p-3 bg-white rounded-3xl border-2 border-pink-300 shadow-[0_10px_30px_rgba(255,79,163,0.25)] relative group">
            
            {/* Decorative Hearts on corners */}
            <span className="absolute -top-2 -left-2 text-base select-none">💖</span>
            <span className="absolute -top-2 -right-2 text-base select-none">✨</span>
            <span className="absolute -bottom-2 -left-2 text-base select-none">✨</span>
            <span className="absolute -bottom-2 -right-2 text-base select-none">💖</span>

            {/* Inner Photo Area */}
            <div className="w-full h-48 sm:h-52 rounded-2xl bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100 border border-pink-200 overflow-hidden flex items-center justify-center relative">
              
              {isLoading ? (
                <div className="flex items-center gap-2 text-xs font-bold text-pink-600 animate-pulse">
                  <Sparkles className="w-4 h-4 text-pink-500 animate-spin" />
                  <span>Loading Ramya's photo...</span>
                </div>
              ) : (
                /* Canonical User Uploaded Photo ONLY */
                <img
                  src={photoUrl}
                  alt="Ramya's Birthday Memory"
                  className="w-full h-full object-cover object-center rounded-2xl transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>
          </div>

          {/* Birthday Message Section */}
          <div className="space-y-3 px-2 pt-2">
            <h4 className="text-xl font-extrabold text-pink-600 font-dancing tracking-wide">
              For You, Always 💗
            </h4>
            
            <div className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed max-w-md mx-auto space-y-2 italic">
              <p>
                "Some people make ordinary moments feel special, and somehow, you do that without even trying."
              </p>
              <p>
                "Thank you for all the laughs, the random conversations, the little memories, and all the moments that are impossible to forget."
              </p>
              <p>
                "I hope this year gives you everything you've been wishing for and a million more reasons to smile."
              </p>
              <p className="font-extrabold text-pink-600 not-italic font-dancing text-base pt-1">
                Happy Birthday, Ramya. 💕
              </p>
            </div>
          </div>

          {/* Final Button: Keep This Memory */}
          <div className="pt-2">
            <GradientButton
              onClick={handleKeepMemory}
              icon={Heart}
            >
              <span>Keep This Memory 💗</span>
            </GradientButton>
          </div>
        </div>
      )}
    </div>
  );
};
