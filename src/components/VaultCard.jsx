import React from 'react';
import { Lock, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const VaultCard = ({
  id,
  icon: Icon,
  title,
  description,
  isUnlocked = false,
  isVisited = false,
  onClick
}) => {
  const handleClick = () => {
    if (isUnlocked) {
      sounds.playClick();
      onClick && onClick();
    } else {
      sounds.playRumble();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`group relative p-4 rounded-2xl transition-all duration-300 select-none ${
        isUnlocked
          ? 'glass-panel-interactive cursor-pointer hover:scale-[1.02] active:scale-[0.98]'
          : 'glass-card-locked cursor-not-allowed opacity-60'
      }`}
    >
      {/* Glow highlight for unlocked & non-visited */}
      {isUnlocked && !isVisited && (
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-pink-500"></span>
        </span>
      )}

      <div className="flex items-start gap-3.5">
        {/* Card Icon */}
        <div
          className={`p-3 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
            isUnlocked
              ? isVisited
                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                : 'bg-gradient-to-br from-pink-500/30 to-purple-600/30 text-pink-300 border border-pink-500/40 glow-pink'
              : 'bg-white/5 text-slate-500 border border-white/5'
          }`}
        >
          {Icon && <Icon className="w-6 h-6" />}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 pr-4">
          <div className="flex items-center gap-2 mb-0.5">
            <h3 className={`text-base font-bold truncate ${isUnlocked ? 'text-slate-100' : 'text-slate-400'}`}>
              {title}
            </h3>
          </div>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {isUnlocked ? description : 'Locked content. Complete previous cards to unlock.'}
          </p>
        </div>

        {/* Lock / Completed / Arrow Indicator */}
        <div className="shrink-0 self-center">
          {!isUnlocked ? (
            <div className="p-2 rounded-xl bg-white/5 text-slate-500 border border-white/5">
              <Lock className="w-4 h-4" />
            </div>
          ) : isVisited ? (
            <div className="p-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          ) : (
            <div className="p-2 rounded-xl bg-pink-500/20 text-pink-300 border border-pink-500/30 group-hover:translate-x-1 transition-transform">
              <ChevronRight className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
