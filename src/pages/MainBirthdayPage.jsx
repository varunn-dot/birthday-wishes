import React, { useState } from 'react';
import { ConfettiCanvas } from '../components/ConfettiCanvas';
import { CelebrationBadge } from '../components/CelebrationBadge';
import { BalloonPopper } from '../components/BalloonPopper';
import { MemoryModal } from '../components/MemoryModal';
import { SurpriseBox } from '../components/SurpriseBox';
import { Heart } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

export const MainBirthdayPage = () => {
  const [activeModal, setActiveModal] = useState(null);

  const tallCardData = {
    id: 'tall_card',
    emoji: '🎂',
    title: "Cookie's Promise",
    badge: 'Special Birthday Card',
    content: "No matter how many birthdays come, this one will always be special because it's yours, Ramya. Keep smiling, keep being amazing, and have the happiest birthday! 💕"
  };

  const handleOpenTallCardModal = () => {
    sounds.playClick();
    setActiveModal(tallCardData);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen w-full bg-master-gradient text-slate-800 px-4 py-8 sm:py-12 relative select-none">
      {/* Falling Confetti Canvas */}
      <ConfettiCanvas />

      {/* Main Container max 1100px */}
      <div className="max-w-5xl mx-auto space-y-10 relative z-20">

        {/* Top Header */}
        <div className="text-center space-y-2">
          <CelebrationBadge text="✨ SPECIAL CELEBRATION ✨" />
          <h1 className="text-4xl sm:text-5xl font-extrabold text-pink-600 font-dancing text-glow-script py-1">
            ✨ For My Favorite Person ✨
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-pink-800/80">
            Happy Birthday Ramya, click below to discover something special
          </p>
        </div>

        {/* Desktop 2-Column Grid / Mobile Stacked Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">

          {/* LEFT COLUMN: Tall White Physical Birthday Card */}
          <div className="md:col-span-5 flex">
            <div
              onClick={handleOpenTallCardModal}
              className="light-card w-full p-6 sm:p-8 flex flex-col justify-between items-center text-center cursor-pointer border-2 border-pink-300 min-h-[380px] group"
            >
              <div className="w-full space-y-1">
                <p className="text-[10px] font-extrabold uppercase tracking-widest text-pink-600">Official Card</p>
                <div className="w-12 h-0.5 bg-pink-300 mx-auto rounded-full" />
              </div>

              {/* Physical Card Typography & Illustration */}
              <div className="space-y-4 my-auto py-6">
                <h2 className="text-4xl sm:text-5xl font-extrabold text-pink-600 font-dancing leading-none tracking-wide group-hover:scale-105 transition-transform">
                  HAPPY<br />BIRTHDAY
                </h2>
                <div className="inline-block px-4 py-1 rounded-full bg-pink-100 text-pink-700 font-bold text-sm tracking-wider uppercase border border-pink-300 shadow-sm">
                  For Ramya 💕
                </div>

                {/* Cute Cake Illustration */}
                <div className="text-5xl pt-2 animate-bounce-slow">
                  🎂
                </div>
              </div>

              <div className="text-xs font-bold flex items-center gap-1 text-pink-600">
                <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                <span>Tap to open greeting card</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Our Memory Lane Heading + One Large Interactive Surprise Box */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-pink-600 font-dancing flex items-center gap-2">
                <span>☕ Our Memory Lane</span>
              </h2>
            </div>

            {/* Replaced 4 Cards with ONE Large Surprise Box */}
            <SurpriseBox />
          </div>

        </div>

        {/* BOTTOM SECTION: Wishing Balloons */}
        <div className="pt-4">
          <BalloonPopper
            onSelectWish={(balloon) =>
              setActiveModal({
                emoji: balloon.emoji,
                title: balloon.title,
                badge: 'Birthday Wish Released',
                content: balloon.wish
              })
            }
          />
        </div>

      </div>

      {/* Centered Modal Popup */}
      {activeModal && (
        <MemoryModal
          isOpen={!!activeModal}
          onClose={handleCloseModal}
          emoji={activeModal.emoji}
          title={activeModal.title}
          badge={activeModal.badge}
          content={activeModal.content}
        />
      )}
    </div>
  );
};
