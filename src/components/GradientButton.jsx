import React, { useState } from 'react';
import { sounds } from '../utils/soundEffects';

export const GradientButton = ({
  children,
  onClick,
  disabled = false,
  className = '',
  icon: Icon,
  fullWidth = true
}) => {
  const [isRippling, setIsRippling] = useState(false);

  const handleClick = (e) => {
    if (disabled) return;
    sounds.playClick();
    setIsRippling(true);
    setTimeout(() => setIsRippling(false), 400);
    onClick && onClick(e);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`group relative rounded-full bg-gradient-to-r from-[#ff3f9f] via-[#d61cff] to-[#8d24ff] text-white font-bold text-sm sm:text-base tracking-wide py-3.5 px-7 shadow-[0_0_25px_rgba(255,63,159,0.5)] hover:shadow-[0_0_40px_rgba(255,63,159,0.8)] hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 flex items-center justify-center gap-2.5 overflow-hidden select-none disabled:opacity-60 disabled:cursor-not-allowed ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
    >
      {isRippling && (
        <span className="absolute inset-0 bg-white/40 animate-ping rounded-full pointer-events-none" />
      )}
      {Icon && <Icon className="w-5 h-5 fill-white text-white group-hover:scale-110 transition-transform shrink-0" />}
      <span className="truncate">{children}</span>
    </button>
  );
};
