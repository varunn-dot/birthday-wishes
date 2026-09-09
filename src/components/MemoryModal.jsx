import React from 'react';
import { X, Heart } from 'lucide-react';
import { CelebrationBadge } from './CelebrationBadge';
import { GradientButton } from './GradientButton';
import { sounds } from '../utils/soundEffects';

export const MemoryModal = ({ isOpen, onClose, title, emoji, content, badge }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    sounds.playClick();
    onClose && onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in select-none">
      <div className="bg-gradient-to-b from-white via-[#fff0f7] to-[#ffd6ec] text-[#1e1b4b] rounded-3xl p-6 sm:p-7 max-w-sm w-full shadow-[0_0_50px_rgba(255,63,159,0.4)] border-2 border-pink-300 relative text-center space-y-4 animate-bounce-slow">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-pink-100 text-pink-600 hover:bg-pink-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Emoji Header */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-400 to-purple-500 p-0.5 mx-auto shadow-md">
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-3xl">
            {emoji || '🎂'}
          </div>
        </div>

        {/* Badge */}
        {badge && (
          <CelebrationBadge text={badge} />
        )}

        {/* Title */}
        <h3 className="text-xl font-extrabold text-pink-600 font-dancing">
          {title}
        </h3>

        {/* Content Body */}
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium px-2">
          {content}
        </p>

        {/* Action Button */}
        <div className="pt-2">
          <GradientButton
            onClick={handleClose}
            icon={Heart}
          >
            <span>Keep Exploring 💕</span>
          </GradientButton>
        </div>
      </div>
    </div>
  );
};
