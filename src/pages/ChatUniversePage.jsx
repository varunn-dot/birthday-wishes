import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVault } from '../context/VaultContext';
import { HeaderNav } from '../components/HeaderNav';
import { MessageSquare, Sparkles, Flame, Eye, Heart, Laugh, Users } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const ChatUniversePage = () => {
  const { markFeatureVisited, cousinName } = useVault();
  const [selectedBubble, setSelectedBubble] = useState(null);

  const categories = [
    { id: 'chaos', name: 'Chaos', percent: '42%', icon: Laugh, color: 'from-pink-500 to-rose-500', desc: 'Random memes, sudden voice notes & zero context.' },
    { id: 'roast', name: 'Roast', percent: '28%', icon: Flame, color: 'from-amber-500 to-orange-500', desc: 'Savage comebacks & friendly insult exchanges.' },
    { id: 'care', name: 'Care', percent: '15%', icon: Heart, color: 'from-purple-500 to-indigo-500', desc: 'Genuine advice when life actually gets real.' },
    { id: 'suspicion', name: 'Suspicion', percent: '10%', icon: Eye, color: 'from-cyan-500 to-blue-500', desc: 'Detecting tea, gossip, and suspicious silences.' },
    { id: 'cousin', name: 'Cousin Energy', percent: '5%', icon: Users, color: 'from-emerald-500 to-teal-500', desc: 'Shared family trauma & secret code words.' }
  ];

  useEffect(() => {
    markFeatureVisited('chats');
  }, [markFeatureVisited]);

  const handleBubbleClick = (cat) => {
    sounds.playClick();
    setSelectedBubble(cat);
  };

  return (
    <div className="flex-1 flex flex-col min-h-full pb-8">
      <HeaderNav title="💬 Our Chat Universe" />

      <div className="p-4 space-y-5">
        {/* Header Card */}
        <div className="glass-panel p-5 rounded-2xl border border-pink-500/25 text-center relative overflow-hidden">
          <p className="text-[10px] font-bold uppercase tracking-widest text-pink-400">TELEMETRY ANALYSIS</p>
          <h1 className="text-xl font-extrabold text-white font-cinzel mt-0.5">
            Most Used Energy
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Tap the floating energy bubbles to inspect chat dynamics.
          </p>
        </div>

        {/* Floating Interactive Bubbles Grid */}
        <div className="glass-panel p-6 rounded-3xl border border-purple-500/30 min-h-[260px] flex flex-wrap items-center justify-center gap-4 relative overflow-hidden">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const isSelected = selectedBubble?.id === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleBubbleClick(cat)}
                className={`group relative p-4 rounded-full bg-gradient-to-br ${cat.color} text-white shadow-lg transition-all duration-500 flex flex-col items-center justify-center animate-float select-none ${
                  isSelected ? 'scale-125 border-2 border-white glow-pink z-20' : 'hover:scale-110 opacity-90'
                }`}
                style={{
                  width: idx === 0 ? '110px' : idx === 1 ? '95px' : '85px',
                  height: idx === 0 ? '110px' : idx === 1 ? '95px' : '85px',
                  animationDelay: `${idx * 0.7}s`
                }}
              >
                <Icon className="w-5 h-5 mb-0.5" />
                <span className="text-xs font-bold leading-tight">{cat.name}</span>
                <span className="text-[10px] opacity-80 font-mono">{cat.percent}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Bubble Info */}
        {selectedBubble && (
          <div className="glass-panel p-4 rounded-2xl border border-pink-500/40 text-center animate-bounce-slow">
            <h3 className="text-sm font-bold text-pink-300 flex items-center justify-center gap-1.5">
              <span>{selectedBubble.name} Energy ({selectedBubble.percent})</span>
            </h3>
            <p className="text-xs text-slate-200 mt-1">{selectedBubble.desc}</p>
          </div>
        )}

        {/* Chat Personality Verdict */}
        <div className="glass-panel p-5 rounded-2xl border border-purple-500/40 text-center space-y-2 glow-purple">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            Chat Personality Verdict
          </div>
          <h2 className="text-lg font-extrabold text-white font-cinzel">
            "Professional Roaster"
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            "Capable of sending a sweet 'I care about you' message followed immediately by a roast so brutal it resets your phone."
          </p>
        </div>
      </div>
    </div>
  );
};
