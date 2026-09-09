import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useVault } from '../context/VaultContext';
import { ChevronLeft, Volume2, VolumeX, Edit3, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const HeaderNav = ({ title = 'Birthday Vault' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { soundEnabled, setSoundEnabled, vaultProgress, cousinName, setCousinName } = useVault();
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(cousinName);

  const isHomeOrCountdown = ['/countdown', '/reveal'].includes(location.pathname);

  const handleBack = () => {
    sounds.playClick();
    navigate('/vault');
  };

  const toggleSound = () => {
    sounds.playClick();
    setSoundEnabled(!soundEnabled);
  };

  const handleSaveName = (e) => {
    e.preventDefault();
    if (tempName.trim()) {
      setCousinName(tempName.trim());
    }
    setIsEditingName(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0c0819]/80 backdrop-blur-xl border-b border-pink-500/15 px-4 py-3 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-2">
        {!isHomeOrCountdown && location.pathname !== '/vault' && (
          <button
            onClick={handleBack}
            className="p-1.5 rounded-xl bg-pink-500/10 text-pink-300 hover:bg-pink-500/20 active:scale-95 transition-all border border-pink-500/20 flex items-center gap-1 text-xs font-semibold"
            aria-label="Back to Vault"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Vault</span>
          </button>
        )}

        <div className="flex flex-col">
          <span className="text-[10px] font-bold tracking-widest text-pink-400 uppercase">
            Vault OS v2.4
          </span>
          <h2 className="text-sm font-bold text-slate-100 truncate max-w-[140px] sm:max-w-[180px]">
            {title}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Name Badge & Editor */}
        <button
          onClick={() => setIsEditingName(true)}
          className="hidden xs:flex items-center gap-1 px-2 py-1 rounded-lg bg-purple-500/10 border border-purple-500/20 text-[11px] font-medium text-purple-300 hover:bg-purple-500/20 transition-all"
          title="Click to personalize name"
        >
          <span className="truncate max-w-[70px]">{cousinName}</span>
          <Edit3 className="w-3 h-3 text-purple-400" />
        </button>

        {/* Progress badge */}
        {!isHomeOrCountdown && (
          <div className="px-2.5 py-1 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-pink-300 text-xs font-mono font-bold">
            {vaultProgress}%
          </div>
        )}

        {/* Sound toggle button */}
        <button
          onClick={toggleSound}
          className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-pink-300 hover:bg-pink-500/10 active:scale-95 transition-all"
          title={soundEnabled ? 'Mute Sound' : 'Enable Sound'}
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-pink-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-slate-500" />
          )}
        </button>
      </div>

      {/* Name Edit Modal */}
      {isEditingName && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSaveName} className="glass-panel p-5 rounded-2xl w-full max-w-xs space-y-3">
            <h3 className="text-sm font-bold text-pink-300">Personalize Cousin's Name</h3>
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              placeholder="Enter cousin name..."
              className="w-full px-3 py-2 rounded-xl bg-black/50 border border-pink-500/30 text-white text-sm focus:outline-none focus:border-pink-500"
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setIsEditingName(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-400 hover:bg-white/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-pink-600 text-white hover:bg-pink-500"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </header>
  );
};
