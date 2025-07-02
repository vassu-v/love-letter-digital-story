
import React, { useState } from 'react';
import { Heart, Feather } from 'lucide-react';

interface IntroCardProps {
  guestName?: string;
  onCardOpen: () => void;
}

const IntroCard: React.FC<IntroCardProps> = ({ guestName = "You", onCardOpen }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [flapOpened, setFlapOpened] = useState(false);
  const [letterPulled, setLetterPulled] = useState(false);
  const [showInvite, setShowInvite] = useState(false);

  const handleCardClick = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  };

  const handleFlapClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFlipped && !flapOpened) {
      setFlapOpened(true);
      // After flap opens, show the letter peek
      setTimeout(() => {
        setLetterPulled(true);
        setTimeout(() => {
          setShowInvite(true);
          setTimeout(() => {
            onCardOpen();
          }, 2000);
        }, 800);
      }, 600);
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
          }`}
          onClick={handleCardClick}
        >
          {/* Front Side - Envelope */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className="w-full h-full bg-gradient-to-br from-ivory to-warm-cream rounded-lg shadow-2xl border border-gold/30 relative overflow-hidden">
              {/* Envelope design */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-ivory/80"></div>
              
              {/* Envelope lines */}
              <div className="absolute inset-4 border-l-2 border-t-2 border-gold/10"></div>
              
              {/* Stamp */}
              <div className="absolute top-4 right-4 w-16 h-20 bg-gradient-to-br from-gold to-soft-gold rounded border-2 border-gold/50 flex items-center justify-center shadow-md">
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

          {/* Back Side - Envelope with Flap */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            {/* Envelope Body */}
            <div className="w-full h-full bg-gradient-to-br from-warm-cream to-ivory rounded-lg shadow-2xl border border-gold/30 relative">
              {/* Inner envelope shadow */}
              <div className="absolute inset-2 bg-gradient-to-br from-white/40 to-ivory/60 rounded-md"></div>
              
              {/* Letter inside (visible when flap opens) */}
              <div className={`absolute inset-6 bg-white rounded-sm shadow-inner border border-gold/20 transition-all duration-1000 ${
                letterPulled ? 'transform -translate-y-4 scale-105' : 'transform translate-y-0'
              }`}>
                <div className="p-4 text-center">
                  <div className="mb-2">
                    <Heart className="w-4 h-4 text-gold mx-auto" />
                  </div>
                  <p className="font-dancing text-lg text-dark-brown">You're Invited!</p>
                  <p className="font-sans text-xs text-dark-brown/70 mt-1">10th Anniversary</p>
                </div>
              </div>

              {/* Envelope Flap */}
              <div 
                className={`absolute top-0 left-0 w-full cursor-pointer transition-all duration-800 origin-top ${
                  flapOpened ? 'transform rotate-12 translate-y-2' : ''
                }`}
                onClick={handleFlapClick}
                style={{
                  clipPath: flapOpened 
                    ? 'polygon(0 0, 100% 0, 85% 60%, 15% 60%)' 
                    : 'polygon(0 0, 100% 0, 50% 70%)',
                }}
              >
                <div className="w-full h-32 bg-gradient-to-b from-warm-cream via-ivory to-gold/20 shadow-lg border-b border-gold/30">
                  {/* Flap texture */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>
                  
                  {/* Flap crease line */}
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gold/30"></div>
                </div>
              </div>

              {/* Instruction */}
              {isFlipped && !flapOpened && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-md animate-pulse">
                    <p className="text-sm text-dark-brown/80 italic text-center">
                      Lift the flap to open
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Full Invite Message */}
        {showInvite && (
          <div className="absolute inset-0 flex items-center justify-center animate-fade-in-up z-20">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center border border-gold/20 transform animate-scale-in max-w-sm">
              <div className="mb-6">
                <Heart className="w-8 h-8 text-gold mx-auto mb-3 animate-pulse" />
                <h2 className="font-playfair text-3xl text-dark-brown mb-3">You're Invited!</h2>
                <p className="font-dancing text-2xl text-gold mb-2">to our</p>
                <p className="font-playfair text-xl text-dark-brown">10th Anniversary Celebration</p>
              </div>
              
              <div className="mb-4">
                <div className="w-16 h-0.5 bg-gold mx-auto mb-4"></div>
                <p className="font-sans text-sm text-dark-brown/70">
                  A decade of love, laughter, and memories
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 text-gold">
                <div className="w-2 h-2 bg-gold rounded-full animate-ping"></div>
                <p className="font-sans text-xs">Opening your invitation...</p>
                <div className="w-2 h-2 bg-gold rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroCard;
