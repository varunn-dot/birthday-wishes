import React, { useState } from 'react';
import { BirthdayConfigProvider } from './context/BirthdayConfigContext';
import { HeroScreen } from './pages/HeroScreen';
import { CakeScreen } from './pages/CakeScreen';
import { MainBirthdayPage } from './pages/MainBirthdayPage';

export default function App() {
  const [screen, setScreen] = useState('hero'); // 'hero' | 'cake' | 'main'

  return (
    <BirthdayConfigProvider>
      <div className="w-full min-h-screen bg-[#080014] text-slate-100 font-poppins selection:bg-pink-500 selection:text-white">
        {screen === 'hero' && (
          <HeroScreen onCelebrate={() => setScreen('cake')} />
        )}

        {screen === 'cake' && (
          <CakeScreen onNext={() => setScreen('main')} />
        )}

        {screen === 'main' && (
          <MainBirthdayPage />
        )}
      </div>
    </BirthdayConfigProvider>
  );
}
