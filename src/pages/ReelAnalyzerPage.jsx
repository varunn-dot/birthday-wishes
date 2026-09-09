import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVault } from '../context/VaultContext';
import { HeaderNav } from '../components/HeaderNav';
import { Film, Cpu, Sparkles, RefreshCw, BarChart2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const ReelAnalyzerPage = () => {
  const { markFeatureVisited, cousinName } = useVault();
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [verdictIndex, setVerdictIndex] = useState(0);

  const meters = [
    { name: 'Reel Energy', value: 98, color: 'bg-pink-500' },
    { name: 'Chaos Score', value: 94, color: 'bg-purple-500' },
    { name: 'Relatability', value: 99, color: 'bg-indigo-500' },
    { name: 'Friendship Damage', value: 12, color: 'bg-emerald-500' },
    { name: 'Replay Probability', value: 96, color: 'bg-rose-500' }
  ];

  const verdicts = [
    `AI Diagnosis: ${cousinName}'s reel sending frequency breaks local internet guidelines. 84% of reels contain zero context but 100% emotional damage.`,
    `Algorithm Report: Sends reels while eating, studying, and sleeping. Replay rate is dangerously high.`,
    `Verdict: Certified Reel Addict. If Instagram servers crash, it is officially ${cousinName}'s fault.`
  ];

  const handleScan = () => {
    setIsAnalyzing(true);
    sounds.playRumble();
    setTimeout(() => {
      setIsAnalyzing(false);
      setVerdictIndex((prev) => (prev + 1) % verdicts.length);
      sounds.playSuccess();
    }, 1200);
  };

  useEffect(() => {
    markFeatureVisited('reels');
    handleScan();
  }, [markFeatureVisited]);

  return (
    <div className="flex-1 flex flex-col min-h-full pb-8">
      <HeaderNav title="🎬 Reel Analyzer" />

      <div className="p-4 space-y-5">
        {/* Header Card */}
        <div className="glass-panel p-5 rounded-2xl border border-pink-500/25 text-center relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-300 border border-pink-500/30 flex items-center justify-center mx-auto mb-2">
            <Cpu className={`w-6 h-6 ${isAnalyzing ? 'animate-pulse text-pink-400' : ''}`} />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-pink-400">INSTAGRAM ALGORITHM v4.2</p>
          <h1 className="text-xl font-extrabold text-white font-cinzel mt-0.5">
            Reel Intelligence
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Neural network diagnostic on {cousinName}'s reel sharing behavior.
          </p>
        </div>

        {/* Meters */}
        <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4 text-pink-400" />
              Telemetry Gauges
            </span>
            <span className="text-[10px] font-mono text-purple-300">SYSTEM LIVE</span>
          </div>

          {meters.map((m) => (
            <div key={m.name} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-200">{m.name}</span>
                <span className="font-mono text-pink-400 font-bold">{isAnalyzing ? '...' : `${m.value}%`}</span>
              </div>
              <div className="w-full h-2 bg-black/60 rounded-full overflow-hidden border border-white/5">
                <div
                  className={`h-full rounded-full ${m.color} transition-all duration-1000 ease-out shadow-sm`}
                  style={{ width: isAnalyzing ? '0%' : `${m.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* AI Verdict */}
        {!isAnalyzing && (
          <div className="glass-panel p-5 rounded-2xl border border-pink-500/40 text-center space-y-2 glow-pink">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              AI Verdict
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium pt-1">
              {verdicts[verdictIndex]}
            </p>
          </div>
        )}

        {/* Re-analyze Button */}
        <button
          onClick={handleScan}
          disabled={isAnalyzing}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold text-xs tracking-wider uppercase border border-pink-400/40 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
          <span>RE-RUN REEL ALGORITHM</span>
        </button>
      </div>
    </div>
  );
};
