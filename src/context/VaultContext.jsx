import React, { createContext, useContext, useState, useEffect } from 'react';
import { sounds } from '../utils/soundEffects';

const VaultContext = createContext();

const ALL_FEATURES = [
  'message',
  'compatibility',
  'crimes',
  'reels',
  'chats',
  'mystery',
  'universe',
  'final'
];

export const VaultProvider = ({ children }) => {
  // 1. Countdown Target (24 hours from initial visit)
  const [countdownTarget, setCountdownTarget] = useState(() => {
    const saved = localStorage.getItem('bv_countdown_target');
    if (saved) return parseInt(saved, 10);
    const target = Date.now() + 24 * 60 * 60 * 1000;
    localStorage.setItem('bv_countdown_target', target.toString());
    return target;
  });

  // 2. Countdown Complete State
  const [isCountdownComplete, setIsCountdownComplete] = useState(() => {
    return localStorage.getItem('bv_countdown_complete') === 'true';
  });

  // 3. Visited / Completed Features
  const [visitedFeatures, setVisitedFeatures] = useState(() => {
    const saved = localStorage.getItem('bv_visited_features');
    return saved ? JSON.parse(saved) : [];
  });

  // 4. Sound Toggle
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('bv_sound_enabled');
    return saved === null ? true : saved === 'true';
  });

  // 5. Custom Name
  const [cousinName, setCousinName] = useState(() => {
    return localStorage.getItem('bv_cousin_name') || 'Bestie Cousin';
  });

  // Toast notification state
  const [toastMessage, setToastMessage] = useState(null);

  // Sync sound synthesizer state
  useEffect(() => {
    sounds.setSoundEnabled(soundEnabled);
    localStorage.setItem('bv_sound_enabled', soundEnabled.toString());
  }, [soundEnabled]);

  // Sync visited features
  useEffect(() => {
    localStorage.setItem('bv_visited_features', JSON.stringify(visitedFeatures));
  }, [visitedFeatures]);

  // Sync cousin name
  useEffect(() => {
    localStorage.setItem('bv_cousin_name', cousinName);
  }, [cousinName]);

  // Helper: check if a feature card is unlocked
  const isFeatureUnlocked = (featureId) => {
    if (!isCountdownComplete) return false;
    
    // Cards 1, 2, 3 are unlocked by default once vault is open
    if (['message', 'compatibility', 'crimes'].includes(featureId)) {
      return true;
    }

    // Card 4 (reels) unlocks if message visited
    if (featureId === 'reels') return visitedFeatures.includes('message');

    // Card 5 (chats) unlocks if compatibility visited
    if (featureId === 'chats') return visitedFeatures.includes('compatibility');

    // Card 6 (mystery) unlocks if crimes visited
    if (featureId === 'mystery') return visitedFeatures.includes('crimes');

    // Card 7 (universe) unlocks if at least 4 items visited
    if (featureId === 'universe') return visitedFeatures.length >= 3;

    // Card 8 (final) unlocks if all previous 7 items visited
    if (featureId === 'final') {
      const required = ['message', 'compatibility', 'crimes', 'reels', 'chats', 'mystery', 'universe'];
      return required.every(id => visitedFeatures.includes(id));
    }

    return false;
  };

  // Mark feature as visited & trigger unlock toasts if new cards unlock
  const markFeatureVisited = (featureId) => {
    if (!visitedFeatures.includes(featureId)) {
      const prevUnlockedCount = ALL_FEATURES.filter(isFeatureUnlocked).length;
      const updated = [...visitedFeatures, featureId];
      setVisitedFeatures(updated);

      // Check if new cards unlocked with updated visited features
      const newlyUnlockedCount = ALL_FEATURES.filter(id => {
        if (['message', 'compatibility', 'crimes'].includes(id)) return true;
        if (id === 'reels') return updated.includes('message');
        if (id === 'chats') return updated.includes('compatibility');
        if (id === 'mystery') return updated.includes('crimes');
        if (id === 'universe') return updated.length >= 3;
        if (id === 'final') {
          return ['message', 'compatibility', 'crimes', 'reels', 'chats', 'mystery', 'universe'].every(f => updated.includes(f));
        }
        return false;
      }).length;

      if (newlyUnlockedCount > prevUnlockedCount) {
        triggerToast('NEW SECRET UNLOCKED 🔓');
        sounds.playUnlock();
      }
    }
  };

  // Trigger floating toast
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Finish countdown
  const completeCountdown = () => {
    setIsCountdownComplete(true);
    localStorage.setItem('bv_countdown_complete', 'true');
  };

  // Dev fast forward
  const devFastForwardCountdown = () => {
    setCountdownTarget(Date.now() - 1000);
    localStorage.setItem('bv_countdown_target', (Date.now() - 1000).toString());
    completeCountdown();
  };

  // Calculate vault progress percentage (0 - 100%)
  const vaultProgress = Math.round((visitedFeatures.length / ALL_FEATURES.length) * 100);

  // Reset progress
  const resetVault = () => {
    setVisitedFeatures([]);
    setIsCountdownComplete(false);
    const target = Date.now() + 24 * 60 * 60 * 1000;
    setCountdownTarget(target);
    localStorage.removeItem('bv_countdown_complete');
    localStorage.setItem('bv_visited_features', JSON.stringify([]));
    localStorage.setItem('bv_countdown_target', target.toString());
  };

  return (
    <VaultContext.Provider
      value={{
        countdownTarget,
        isCountdownComplete,
        completeCountdown,
        devFastForwardCountdown,
        visitedFeatures,
        markFeatureVisited,
        isFeatureUnlocked,
        vaultProgress,
        soundEnabled,
        setSoundEnabled,
        cousinName,
        setCousinName,
        resetVault,
        toastMessage,
        triggerToast
      }}
    >
      {children}
    </VaultContext.Provider>
  );
};

export const useVault = () => useContext(VaultContext);
