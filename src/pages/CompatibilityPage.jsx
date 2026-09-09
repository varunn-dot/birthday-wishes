import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVault } from '../context/VaultContext';
import { HeaderNav } from '../components/HeaderNav';
import { BrainCircuit, RefreshCw, Zap, Award } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { launchBurst } from '../utils/confetti';

export const CompatibilityPage = () => {
  const navigate = useNavigate();
  const { markFeatureVisited, cousinName } = useVault();
  const [analyzing, setAnalyzing] = useState(true);
  const [progressValues, setProgressValues] = useState({});

  const categories = [
    { key: 'chaos', name: 'Chaos Level', value: 99, color: 'from-pink-500 to-rose-500' },
    { key: 'comedy', name: 'Comedy Level', value: 95, color: 'from-purple-500 to-indigo-500' },
    { key: 'argument', name: 'Argument Level', value: 88, color: 'from-amber-500 to-orange-500' },
    { key: 'food', name: 'Food Theft Compatibility', value: 96, color: 'from-emerald-500 to-teal-500' },
    { key: 'reels', name: 'Reel Spam Match', value: 100, color: 'from-fuchsia-500 to-pink-500' },
    { key: 'secrets', name: 'Secret Sharing', value: 94, color: 'from-cyan-500 to-blue-500' },
    { key: 'sibling', name: 'Sibling Energy', value: 98, color: 'from-violet-500 to-purple-600' }
  ];

  const runAnalysis = () => {
    setAnalyzing(true);
    sounds.playRumble();
    setProgressValues({});

    setTimeout(() => {
      const initial = {};
      categories.forEach(c => {
        initial[c.key] = c.value;
      });
      setProgressValues(initial);
      setAnalyzing(false);
      sounds.playSuccess();
      launchBurst();
    }, 1500);
  };

  useEffect(() => {
    markFeatureVisited('compatibility');
    runAnalysis();
  }, [markFeatureVisited]);

  return (
    <div className="flex-1 flex flex-col min-h-full pb-8">
      <HeaderNav title="🧠 Cousin Compatibility" />

      <div className="p-4 space-y-5">
        {/* Header Title Card */}
        <div className="glass-panel p-5 rounded-2xl border border-pink-500/25 text-center relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center mx-auto mb-2">
            <BrainCircuit className={`w-6 h-6 ${analyzing ? 'animate-spin' : ''}`} />
          </div>
          <h1 className="text-xl font-extrabold text-white font-cinzel">
            How Compatible Are We?
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            AI-driven cousin synergy algorithm & chaos breakdown.
          </p>
        </div>

        {/* Categories Progress Bars */}
        <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 space-y-4">
          {categories.map((cat) => {
            const val = progressValues[cat.key] || 0;
            return (
              <div key={cat.key} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-200">{cat.name}</span>
                  <span className="font-mono text-pink-400 font-bold">{val}%</span>
                </div>
                <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-white/5">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${cat.color} transition-all duration-1000 ease-out shadow-sm`}
                    style={{ width: `${val}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Final Score Card */}
        {!analyzing && (
          <div className="glass-panel p-6 rounded-2xl border border-pink-500/40 text-center space-y-3 glow-pink animate-bounce-slow">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider">
              <Award className="w-4 h-4 text-yellow-300" />
              Final Verdict
            </div>
            <h2 className="text-4xl font-extrabold font-mono text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-pink-300 text-glow-pink">
              97%
            </h2>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              "Certified Dangerous Duo. High risk of spontaneous laughter, joint snack theft, and unbearable roast sessions."
            </p>
          </div>
        )}

        {/* Run Analysis Again Button */}
        <div className="pt-2">
          <button
            onClick={runAnalysis}
            disabled={analyzing}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs tracking-wider uppercase border border-purple-400/40 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${analyzing ? 'animate-spin' : ''}`} />
            <span>RUN ANALYSIS AGAIN</span>
          </button>
        </div>
      </div>
    </div>
  );
};
