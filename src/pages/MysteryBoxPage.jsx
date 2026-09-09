import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVault } from '../context/VaultContext';
import { HeaderNav } from '../components/HeaderNav';
import { Gift, Sparkles, Award, RotateCcw, PackageCheck } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { launchConfetti } from '../utils/confetti';

export const MysteryBoxPage = () => {
  const { markFeatureVisited, cousinName } = useVault();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    markFeatureVisited('mystery');
  }, [markFeatureVisited]);

  const handleOpen = () => {
    if (isOpen || isOpening) return;
    setIsOpening(true);
    sounds.playRumble();

    setTimeout(() => {
      setIsOpening(false);
      setIsOpen(true);
      sounds.playSuccess();
      launchConfetti();
    }, 1200);
  };

  const handleReset = () => {
    sounds.playClick();
    setIsOpen(false);
  };

  return (
    <div className="flex-1 flex flex-col min-h-full pb-8">
      <HeaderNav title="🎁 Mystery Box" />

      <div className="p-5 my-auto flex flex-col justify-center items-center text-center space-y-6 relative z-10">
        {/* Header Text */}
        <div className="space-y-1">
          <p className="text-xs uppercase font-bold tracking-widest text-pink-400">CLASSIFIED PRIZE</p>
          <h1 className="text-2xl font-extrabold text-white font-cinzel">
            The Birthday Mystery Box
          </h1>
          <p className="text-xs text-slate-300 italic">
            One box. One secret. No refunds.
          </p>
        </div>

        {/* Mystery Box Visual Container */}
        <div className={`relative my-6 transition-all duration-500 ${isOpening ? 'animate-bounce' : ''}`}>
          <div
            onClick={handleOpen}
            className={`w-44 h-44 rounded-3xl cursor-pointer flex flex-col items-center justify-center transition-all duration-500 relative select-none ${
              isOpen
                ? 'bg-gradient-to-br from-purple-600 via-pink-600 to-pink-500 border-2 border-yellow-300 shadow-[0_0_60px_rgba(236,72,153,0.8)] scale-105'
                : 'glass-panel border-2 border-pink-500/40 hover:border-pink-400 hover:scale-105 shadow-[0_0_35px_rgba(236,72,153,0.3)]'
            }`}
          >
            {isOpen ? (
              <div className="flex flex-col items-center gap-2 animate-float">
                <Award className="w-16 h-16 text-yellow-300 animate-pulse" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">UNLOCKED!</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <Gift className={`w-16 h-16 text-pink-400 ${isOpening ? 'animate-spin' : 'animate-pulse'}`} />
                <span className="text-xs font-bold text-pink-300 uppercase tracking-widest">
                  {isOpening ? 'UNWRAPPING...' : 'TAP TO OPEN'}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Revealed Prize Card */}
        {isOpen && (
          <div className="glass-panel p-6 rounded-3xl border border-yellow-400/50 bg-gradient-to-br from-pink-950/40 to-purple-950/40 text-center space-y-3 glow-pink animate-bounce-slow max-w-xs">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-400/20 border border-yellow-400/40 text-yellow-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              OFFICIAL CERTIFICATE
            </div>
            <h2 className="text-lg font-black text-white font-cinzel">
              You Have Officially Been Promoted To Favorite Cousin. 🏆
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              This promotion grants you priority snack privileges, first dibs on gossip, and immunity from all arguments for 24 hours.
            </p>
          </div>
        )}

        {/* Action Button */}
        <div className="w-full pt-2">
          {!isOpen ? (
            <button
              onClick={handleOpen}
              disabled={isOpening}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-sm tracking-wider uppercase border border-pink-400/40 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <PackageCheck className="w-5 h-5" />
              <span>[ OPEN THE BOX ]</span>
            </button>
          ) : (
            <button
              onClick={handleReset}
              className="w-full py-3.5 px-6 rounded-2xl bg-white/10 hover:bg-white/15 text-slate-200 font-bold text-xs tracking-wider uppercase border border-white/20 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>REPLAY MYSTERY BOX</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
