
import React, { useState } from 'react';
import { Heart, Feather } from 'lucide-react';

interface IntroCardProps {
  guestName?: string;
  onCardOpen: () => void;
}

const IntroCard: React.FC<IntroCardProps> = ({ guestName = "our beloved guest", onCardOpen }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [sealClicked, setSealClicked] = useState(false);

  const handleCardClick = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  };

  const handleSealClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFlipped && !sealClicked) {
      setSealClicked(true);
      setTimeout(() => {
        onCardOpen();
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-warm-cream to-ivory p-4">
      <div className="relative w-80 h-96 perspective-1000">
        {/* Card Container */}
        <div 
          className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
            isFlipped ? 'rotate-y-180' : ''
          }`}
          onClick={handleCardClick}
        >
          {/* Front Side */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className="w-full h-full bg-white rounded-lg shadow-2xl border-2 border-gold/20 p-8 flex flex-col justify-between">
              {/* Decorative Header */}
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-gold to-soft-gold rounded-full flex items-center justify-center">
                    <Heart className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h1 className="font-playfair text-2xl text-dark-brown mb-2">You're Invited</h1>
                <div className="w-20 h-0.5 bg-gold mx-auto"></div>
              </div>

              {/* Address */}
              <div className="text-center">
                <p className="font-dancing text-3xl text-gold mb-2">To:</p>
                <p className="font-playfair text-xl text-dark-brown capitalize">{guestName}</p>
              </div>

              {/* Instruction */}
              <div className="text-center">
                <p className="text-sm text-dark-brown/70 italic">Tap to open</p>
              </div>
            </div>
          </div>

          {/* Back Side */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <div className="w-full h-full bg-gradient-to-br from-ivory to-warm-cream rounded-lg shadow-2xl border-2 border-gold/20 p-8 flex flex-col items-center justify-center relative">
              {/* Decorative Pattern */}
              <div className="absolute inset-4 border border-gold/30 rounded-lg"></div>
              <div className="absolute inset-6 border border-gold/20 rounded-lg"></div>
              
              {/* Wax Seal */}
              <div 
                className={`relative cursor-pointer transition-all duration-300 hover:scale-105 ${
                  sealClicked ? 'animate-seal-melt' : ''
                }`}
                onClick={handleSealClick}
              >
                <div className="w-20 h-20 bg-gradient-radial from-gold to-deep-gold rounded-full shadow-lg flex items-center justify-center">
                  <Feather className="w-8 h-8 text-ivory" />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-gradient-to-b from-gold/80 to-transparent rounded-b-full"></div>
              </div>

              {/* Instruction */}
              <p className="text-sm text-dark-brown/70 italic mt-6 text-center">
                {isFlipped ? 'Tap the seal to open' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroCard;
