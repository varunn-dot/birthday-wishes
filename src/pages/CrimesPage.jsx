import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVault } from '../context/VaultContext';
import { HeaderNav } from '../components/HeaderNav';
import { ShieldAlert, AlertTriangle, Stamp, Gavel, Check } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const CrimesPage = () => {
  const navigate = useNavigate();
  const { markFeatureVisited, cousinName } = useVault();

  const crimesList = [
    { caseId: 'CASE #001', crime: 'Grand Theft Snack', detail: 'Consistently eating snacks meant for everyone.', status: 'GUILTY' },
    { caseId: 'CASE #002', crime: 'Message Ghosting', detail: 'Reading messages in notification bar and replying 6 hours later.', status: 'GUILTY' },
    { caseId: 'CASE #003', crime: '2 AM Reel Spamming', detail: 'Sending 47 Instagram reels while expecting instant responses.', status: 'GUILTY' },
    { caseId: 'CASE #004', crime: 'Unprovoked Roasting', detail: 'Starting arguments just for the sport of winning them.', status: 'GUILTY' },
    { caseId: 'CASE #005', crime: 'The "5 Minutes" Lie', detail: 'Claiming to be ready in 5 minutes when still in pajamas.', status: 'GUILTY' },
    { caseId: 'CASE #006', crime: 'Inappropriate Laughter', detail: 'Bursting into laughter at serious moments for no reason.', status: 'GUILTY' }
  ];

  const [revealedCount, setRevealedCount] = useState(1);

  useEffect(() => {
    markFeatureVisited('crimes');
  }, [markFeatureVisited]);

  const handleRevealNext = () => {
    if (revealedCount < crimesList.length) {
      sounds.playRumble();
      setRevealedCount(prev => prev + 1);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-full pb-8">
      <HeaderNav title="😂 Your Crimes" />

      <div className="p-4 space-y-5">
        {/* Classified Case Header */}
        <div className="glass-panel p-5 rounded-2xl border border-red-500/40 bg-red-950/20 text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-widest animate-pulse">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            TOP SECRET / CONFIDENTIAL
          </div>
          <h1 className="text-xl font-black text-white font-cinzel mt-2 tracking-wide">
            EVIDENCE FILE: {cousinName.toUpperCase()}
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Criminal record of offenses accumulated over the years.
          </p>
        </div>

        {/* Crime Case Cards */}
        <div className="space-y-3">
          {crimesList.slice(0, revealedCount).map((c, idx) => (
            <div
              key={c.caseId}
              className="glass-panel p-4 rounded-2xl border border-pink-500/20 space-y-2 relative overflow-hidden animate-float"
              style={{ animationDuration: `${6 + idx}s` }}
            >
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-[11px] font-mono font-bold text-slate-400">{c.caseId}</span>
                <span className="px-2.5 py-0.5 rounded-md bg-red-500/20 border border-red-500/50 text-red-400 text-[10px] font-black tracking-widest uppercase transform rotate-[-3deg] shadow-sm">
                  {c.status}
                </span>
              </div>
              <h3 className="text-sm font-bold text-pink-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                {c.crime}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-mono">
                "{c.detail}"
              </p>
            </div>
          ))}
        </div>

        {/* Reveal Next Crime or Final Sentence */}
        {revealedCount < crimesList.length ? (
          <button
            onClick={handleRevealNext}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-600 to-pink-600 text-white font-bold text-xs tracking-wider uppercase border border-red-400/40 shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <Stamp className="w-4 h-4" />
            <span>REVEAL NEXT CHARGE ({revealedCount}/{crimesList.length})</span>
          </button>
        ) : (
          <div className="glass-panel p-5 rounded-2xl border border-yellow-500/40 bg-amber-950/20 text-center space-y-2 glow-purple">
            <div className="w-10 h-10 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 flex items-center justify-center mx-auto">
              <Gavel className="w-5 h-5" />
            </div>
            <h3 className="text-xs uppercase font-bold tracking-widest text-yellow-300">COURT SENTENCE</h3>
            <p className="text-base font-extrabold text-white font-cinzel">
              Sentence: Unlimited Teasing & Lifetime Stolen Snacks.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
