import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVault } from '../context/VaultContext';
import { HeaderNav } from '../components/HeaderNav';
import { Trophy, Sparkles, Heart, RotateCcw, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { launchConfetti } from '../utils/confetti';

export const FinalPage = () => {
  const navigate = useNavigate();
  const { markFeatureVisited, cousinName, resetVault } = useVault();
  const [step, setStep] = useState(1);

  useEffect(() => {
    markFeatureVisited('final');
    launchConfetti();
    sounds.playSuccess();

    const t1 = setTimeout(() => setStep(2), 2000);
    const t2 = setTimeout(() => {
      setStep(3);
      launchConfetti();
    }, 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [markFeatureVisited]);

  const handlePlayAgain = () => {
    if (window.confirm('Re-lock vault and start from the countdown again?')) {
      sounds.playClick();
      resetVault();
      navigate('/countdown');
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-full pb-8">
      <HeaderNav title="🏆 Final Surprise" />

      <div className="p-5 my-auto flex flex-col justify-center items-center text-center space-y-6 relative z-10">
        {/* Animated Trophy Icon */}
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600 p-0.5 shadow-[0_0_50px_rgba(234,179,8,0.6)] animate-float">
          <div className="w-full h-full bg-[#0d071a] rounded-full flex items-center justify-center border border-yellow-300/40">
            <Trophy className="w-10 h-10 text-yellow-300 animate-pulse" />
          </div>
        </div>

        {/* Step 1: YOU FOUND EVERYTHING */}
        {step === 1 && (
          <div className="space-y-2 animate-bounce">
            <span className="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold uppercase tracking-widest">
              VAULT EXPLORATION COMPLETE
            </span>
            <h1 className="text-3xl font-extrabold text-white font-cinzel">
              YOU FOUND EVERYTHING.
            </h1>
          </div>
        )}

        {/* Step 2: But there is one last thing... */}
        {step === 2 && (
          <div className="space-y-2 animate-fade-in">
            <p className="text-sm font-semibold text-purple-300 tracking-wider">
              But there is one last thing...
            </p>
            <div className="flex justify-center">
              <span className="w-3 h-3 rounded-full bg-pink-400 animate-ping" />
            </div>
          </div>
        )}

        {/* Step 3: Grand Finale Message */}
        {step === 3 && (
          <div className="space-y-6 w-full max-w-sm animate-bounce-slow">
            <div className="glass-panel p-6 rounded-3xl border border-pink-400/50 bg-gradient-to-b from-pink-950/30 to-purple-950/40 space-y-4 glow-pink">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                GRAND FINALE
              </div>

              <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-200 to-pink-400 font-cinzel text-glow-pink">
                Happy Birthday, {cousinName} ❤️
              </h1>

              <div className="space-y-3 text-xs text-slate-200 leading-relaxed text-left font-medium border-t border-white/10 pt-4">
                <p>
                  Thank you for being the absolute highlight of every family gathering, the master of unprovoked roasts, and the best cousin in the universe.
                </p>
                <p>
                  I hope your birthday is as iconic, chaotic, and amazing as you are. Keep shining!
                </p>
                <p className="text-center font-extrabold text-pink-300 pt-2 font-cinzel">
                  "Thanks for being the chaos in my life."
                </p>
              </div>
            </div>

            {/* Completion Banner */}
            <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Vault completed: 100%</span>
            </div>

            {/* PLAY AGAIN BUTTON */}
            <button
              onClick={handlePlayAgain}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-sm tracking-wider uppercase border border-pink-400/40 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              <span>[ PLAY AGAIN ]</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
