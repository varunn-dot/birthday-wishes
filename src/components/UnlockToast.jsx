import React from 'react';
import { useVault } from '../context/VaultContext';
import { Lock, Sparkles } from 'lucide-react';

export const UnlockToast = () => {
  const { toastMessage } = useVault();

  if (!toastMessage) return null;

  return (
    <div className="fixed top-5 z-50 left-1/2 -translate-x-1/2 w-[90%] max-w-[360px] animate-bounce">
      <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-4 py-3 rounded-2xl shadow-[0_0_25px_rgba(236,72,153,0.6)] border border-pink-300/40 flex items-center justify-between gap-3 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-white/20 rounded-lg">
            <Sparkles className="w-5 h-5 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-pink-200">System Notification</p>
            <p className="text-sm font-bold text-white">{toastMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
