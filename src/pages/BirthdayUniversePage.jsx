import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVault } from '../context/VaultContext';
import { HeaderNav } from '../components/HeaderNav';
import { Star, Sparkles, X, Heart, Smile, Flame, Shield, Gift } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const BirthdayUniversePage = () => {
  const { markFeatureVisited, cousinName } = useVault();
  const [activeStar, setActiveStar] = useState(null);

  const stars = [
    {
      id: 'memory',
      title: '⭐ Memory',
      icon: Star,
      x: '20%',
      y: '25%',
      color: 'text-yellow-300',
      badge: 'Unforgettable Moment',
      content: `Remember when we laughed so hard that everyone in the room thought we lost our minds? That memory lives rent-free in my head forever.`
    },
    {
      id: 'joke',
      title: '⭐ Inside Joke',
      icon: Smile,
      x: '75%',
      y: '20%',
      color: 'text-pink-300',
      badge: 'Secret Lore',
      content: `"5 minutes away" — the greatest lie ever told in human history.`
    },
    {
      id: 'roast',
      title: '⭐ Roast',
      icon: Flame,
      x: '30%',
      y: '65%',
      color: 'text-amber-400',
      badge: 'Affectionate Roast',
      content: `${cousinName}, your sleep schedule is an insult to circadian rhythm science.`
    },
    {
      id: 'compliment',
      title: '⭐ Compliment',
      icon: Heart,
      x: '80%',
      y: '60%',
      color: 'text-purple-300',
      badge: 'Genuine Fact',
      content: `No matter how chaotic things get, you always make life 100x more entertaining.`
    },
    {
      id: 'secret',
      title: '⭐ Secret',
      icon: Shield,
      x: '50%',
      y: '42%',
      color: 'text-cyan-300',
      badge: 'Classified Vault Secret',
      content: `You are officially the cool cousin everyone actually wants to hang out with.`
    },
    {
      id: 'wish',
      title: '⭐ Wish',
      icon: Gift,
      x: '45%',
      y: '80%',
      color: 'text-emerald-300',
      badge: 'Birthday Wish',
      content: `May this year bring you endless happiness, zero drama, and unlimited good food!`
    }
  ];

  useEffect(() => {
    markFeatureVisited('universe');
  }, [markFeatureVisited]);

  const handleStarClick = (star) => {
    sounds.playClick();
    setActiveStar(star);
  };

  return (
    <div className="flex-1 flex flex-col min-h-full pb-8 relative">
      <HeaderNav title="🌌 Your Birthday Universe" />

      <div className="p-4 flex-1 flex flex-col space-y-4">
        {/* Title Header */}
        <div className="glass-panel p-4 rounded-2xl border border-purple-500/30 text-center">
          <p className="text-[10px] font-bold uppercase tracking-widest text-purple-300">Constellation Map</p>
          <h1 className="text-lg font-extrabold text-white font-cinzel">
            Tap Stars To Reveal Secrets
          </h1>
        </div>

        {/* Constellation Canvas Container */}
        <div className="glass-panel p-4 rounded-3xl border border-pink-500/30 flex-1 min-h-[380px] relative overflow-hidden bg-gradient-to-b from-[#070414] to-[#0e0722]">
          {/* Subtle SVG constellation connecting lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-25">
            <line x1="20%" y1="25%" x2="50%" y2="42%" stroke="#ec4899" strokeWidth="1" strokeDasharray="4" />
            <line x1="50%" y1="42%" x2="75%" y2="20%" stroke="#a855f7" strokeWidth="1" strokeDasharray="4" />
            <line x1="50%" y1="42%" x2="30%" y2="65%" stroke="#ec4899" strokeWidth="1" strokeDasharray="4" />
            <line x1="30%" y1="65%" x2="45%" y2="80%" stroke="#a855f7" strokeWidth="1" strokeDasharray="4" />
            <line x1="50%" y1="42%" x2="80%" y2="60%" stroke="#ec4899" strokeWidth="1" strokeDasharray="4" />
          </svg>

          {/* Render Clickable Glowing Stars */}
          {stars.map((star) => {
            const Icon = star.icon;
            return (
              <button
                key={star.id}
                onClick={() => handleStarClick(star)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group p-3 rounded-full hover:scale-125 active:scale-95 transition-all duration-300 animate-float"
                style={{ left: star.x, top: star.y }}
              >
                <div className="relative">
                  <span className="absolute -inset-2 rounded-full bg-pink-500/30 blur-md group-hover:bg-pink-400/60 transition-all animate-ping" />
                  <div className="relative p-2.5 rounded-full bg-[#120a28] border border-pink-400/40 text-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.5)]">
                    <Icon className={`w-5 h-5 ${star.color}`} />
                  </div>
                </div>
                <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 text-[10px] font-bold text-slate-300 whitespace-nowrap bg-black/70 px-2 py-0.5 rounded-md border border-white/10 opacity-80 group-hover:opacity-100">
                  {star.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Modal Star Card */}
        {activeStar && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-5 animate-fade-in">
            <div className="glass-panel p-6 rounded-3xl border border-pink-400/50 max-w-xs w-full text-center space-y-4 relative glow-pink">
              <button
                onClick={() => setActiveStar(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
                {activeStar.badge}
              </div>

              <h2 className="text-xl font-extrabold text-white font-cinzel">
                {activeStar.title}
              </h2>

              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {activeStar.content}
              </p>

              <button
                onClick={() => setActiveStar(null)}
                className="w-full py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                CLOSE SECRET
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
