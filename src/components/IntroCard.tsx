
import React, { useState } from 'react';
import { Heart, Feather } from 'lucide-react';

interface IntroCardProps {
  guestName?: string;
  onCardOpen: () => void;
}

const IntroCard: React.FC<IntroCardProps> = ({ guestName = "You", onCardOpen }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [sealClicked, setSealClicked] = useState(false);
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

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
        setEnvelopeOpened(true);
        setTimeout(() => {
          onCardOpen();
        }, 1500);
      }, 800);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-warm-cream to-ivory p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-2 h-2 bg-gold/30 rounded-full animate-float"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-soft-gold/40 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-gold/20 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Envelope Container */}
      <div className="relative w-96 h-64 perspective-1000">
        {/* Envelope */}
        <div 
          className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
            isFlipped ? 'rotate-y-180' : ''
          } ${envelopeOpened ? 'animate-envelope-open' : ''}`}
          onClick={handleCardClick}
        >
          {/* Front Side - Envelope */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className="w-full h-full bg-gradient-to-br from-ivory to-warm-cream rounded-lg shadow-2xl border border-gold/30 relative overflow-hidden">
              {/* Envelope design */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-ivory/80"></div>
              
              {/* Stamp */}
              <div className="absolute top-4 right-4 w-16 h-20 bg-gradient-to-br from-gold to-soft-gold rounded border-2 border-gold/50 flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>

              {/* Address */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-8">
                <div className="mb-8">
                  <p className="font-dancing text-2xl text-gold mb-2">To:</p>
                  <p className="font-playfair text-3xl text-dark-brown capitalize">{guestName}</p>
                </div>
                
                <div className="mb-8">
                  <p className="font-dancing text-2xl text-gold mb-2">From:</p>
                  <p className="font-playfair text-2xl text-dark-brown">Aarav & Riya</p>
                </div>
              </div>

              {/* Flip instruction */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gold/20 backdrop-blur-sm rounded-full px-4 py-2 animate-pulse">
                  <p className="text-sm text-dark-brown font-medium">💌 Flip the Card</p>
                </div>
              </div>
            </div>
          </div>

          {/* Back Side - Wax Seal */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            <div className="w-full h-full bg-gradient-to-br from-warm-cream to-ivory rounded-lg shadow-2xl border border-gold/30 relative flex items-center justify-center">
              {/* Decorative pattern */}
              <div className="absolute inset-4 border border-gold/20 rounded-lg"></div>
              <div className="absolute inset-6 border border-gold/10 rounded-lg"></div>
              
              {/* Wax Seal */}
              <div 
                className={`relative cursor-pointer transition-all duration-500 hover:scale-105 ${
                  sealClicked ? 'animate-seal-crack' : 'animate-float'
                }`}
                onClick={handleSealClick}
              >
                <div className="w-24 h-24 bg-gradient-radial from-gold via-deep-gold to-gold rounded-full shadow-2xl flex items-center justify-center relative">
                  {/* Seal crack effect */}
                  {sealClicked && (
                    <div className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-br from-transparent via-black/20 to-black/40 animate-crack"></div>
                  )}
                  
                  {/* Initials */}
                  <div className="text-ivory font-playfair text-xl font-bold">A+R</div>
                </div>
                
                {/* Wax drip */}
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-gradient-to-b from-gold/80 to-transparent rounded-b-full"></div>
              </div>

              {/* Instruction */}
              {isFlipped && !sealClicked && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                  <p className="text-sm text-dark-brown/70 italic text-center animate-fade-in">
                    Tap the seal to open
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Invite Message */}
        {envelopeOpened && (
          <div className="absolute inset-0 flex items-center justify-center animate-fade-in-up">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 text-center border border-gold/20 transform scale-95 animate-scale-in">
              <div className="mb-4">
                <Heart className="w-8 h-8 text-gold mx-auto mb-2" />
                <h2 className="font-playfair text-2xl text-dark-brown mb-2">You're Invited!</h2>
                <p className="font-dancing text-xl text-gold">to our</p>
                <p className="font-playfair text-lg text-dark-brown">10th Anniversary Celebration</p>
              </div>
              <div className="w-16 h-0.5 bg-gold mx-auto"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroCard;
