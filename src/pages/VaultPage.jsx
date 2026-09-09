import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useVault } from '../context/VaultContext';
import { HeaderNav } from '../components/HeaderNav';
import { ProgressBar } from '../components/ProgressBar';
import { VaultCard } from '../components/VaultCard';
import {
  HeartHandshake,
  BrainCircuit,
  FileSpreadsheet,
  Film,
  MessageSquareHeart,
  Gift,
  Sparkles,
  Trophy,
  RotateCcw
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const VaultPage = () => {
  const navigate = useNavigate();
  const {
    visitedFeatures,
    isFeatureUnlocked,
    vaultProgress,
    cousinName,
    resetVault
  } = useVault();

  const cardsData = [
    {
      id: 'message',
      path: '/message',
      title: '💌 Birthday Message',
      description: 'A cinematic personal message waiting just for you.',
      icon: HeartHandshake
    },
    {
      id: 'compatibility',
      path: '/compatibility',
      title: '🧠 Cousin Compatibility',
      description: 'Deep AI diagnostic on chaos, arguments & snack stealing.',
      icon: BrainCircuit
    },
    {
      id: 'crimes',
      path: '/crimes',
      title: '😂 Your Crimes',
      description: 'CLASSIFIED EVIDENCE collected over the years.',
      icon: FileSpreadsheet
    },
    {
      id: 'reels',
      path: '/reels',
      title: '🎬 Reel Analyzer',
      description: 'AI algorithm analysis of 2 AM Instagram reel spams.',
      icon: Film
    },
    {
      id: 'chats',
      path: '/chats',
      title: '💬 Our Chat Universe',
      description: 'Interactive breakdown of our chaotic text conversations.',
      icon: MessageSquareHeart
    },
    {
      id: 'mystery',
      path: '/mystery',
      title: '🎁 Mystery Box',
      description: 'One box. One secret. No refunds guaranteed.',
      icon: Gift
    },
    {
      id: 'universe',
      path: '/universe',
      title: '🌌 Your Birthday Universe',
      description: 'Explore interactive star constellations of memories.',
      icon: Sparkles
    },
    {
      id: 'final',
      path: '/final',
      title: '🏆 Final Surprise',
      description: 'The ultimate climax unlocked after fully exploring the vault.',
      icon: Trophy
    }
  ];

  const handleCardClick = (path, isUnlocked) => {
    if (isUnlocked) {
      navigate(path);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset vault progress and re-lock cards for testing?')) {
      sounds.playClick();
      resetVault();
      navigate('/countdown');
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-full pb-8">
      <HeaderNav title={`${cousinName}'s Vault`} />

      <div className="p-4 space-y-5">
        {/* Welcome Header Banner */}
        <div className="glass-panel p-5 rounded-2xl border border-pink-500/25 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
          <p className="text-[10px] font-bold uppercase tracking-widest text-pink-400">Classified Archives</p>
          <h1 className="text-xl font-extrabold text-white font-cinzel mt-0.5">
            Welcome to Your Vault
          </h1>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Everything inside was made specifically for you. Explore every secret section to unlock the final surprise!
          </p>

          <div className="mt-4 pt-3 border-t border-white/10">
            <ProgressBar progress={vaultProgress} />
          </div>
        </div>

        {/* Secret Cards Grid */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Vault Items ({visitedFeatures.length}/{cardsData.length})
            </h2>
            <span className="text-[11px] text-pink-400 font-medium">
              {vaultProgress === 100 ? '✨ 100% Unlocked!' : 'Progressive Unlock Active'}
            </span>
          </div>

          {cardsData.map((card) => {
            const unlocked = isFeatureUnlocked(card.id);
            const visited = visitedFeatures.includes(card.id);

            return (
              <VaultCard
                key={card.id}
                id={card.id}
                title={card.title}
                description={card.description}
                icon={card.icon}
                isUnlocked={unlocked}
                isVisited={visited}
                onClick={() => handleCardClick(card.path, unlocked)}
              />
            );
          })}
        </div>

        {/* Reset / Relive option */}
        <div className="pt-4 border-t border-white/5 flex justify-center">
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-slate-200 text-xs font-medium flex items-center gap-2 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Progress / Relive Countdown</span>
          </button>
        </div>
      </div>
    </div>
  );
};
