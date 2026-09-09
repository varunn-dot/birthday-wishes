import React from 'react';
import { Sparkles } from 'lucide-react';

export const CelebrationBadge = ({ text = '✨ SPECIAL CELEBRATION ✨', icon: Icon = Sparkles }) => {
  return (
    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-pink-300 text-pink-600 text-xs font-bold uppercase tracking-wider shadow-sm select-none">
      <Icon className="w-3.5 h-3.5 text-pink-500 animate-spin" style={{ animationDuration: '4s' }} />
      <span>{text}</span>
    </div>
  );
};
