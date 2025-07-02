
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
  const [flipProgress, setFlipProgress] = useState(0);
  const [flapProgress, setFlapProgress] = useState(0);

  const handleFlipSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setFlipProgress(value);
    
    if (value >= 100 && !isFlipped) {
      setIsFlipped(true);
    } else if (value < 100 && isFlipped) {
      setIsFlipped(false);
      // Reset flap state when going back
      setFlapOpened(false);
      setLetterPulled(false);
      setShowInvite(false);
      setFlapProgress(0);
    }
  };

  const handleFlapSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isFlipped) return;
    
    const value = parseInt(e.target.value);
    setFlapProgress(value);
    
    if (value >= 100 && !flapOpened) {
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
      }, 300);
    } else if (value < 100 && flapOpened) {
      setFlapOpened(false);
      setLetterPulled(false);
      setShowInvite(false);
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

      {/* Controls */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30 space-y-4">
        {/* Flip Slider */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gold/20">
          <p className="text-sm text-dark-brown font-medium mb-2 text-center">💌 Slide to flip the card</p>
          <input
            type="range"
            min="0"
            max="100"
            value={flipProgress}
            onChange={handleFlipSliderChange}
            className="w-48 h-2 bg-gold/20 rounded-lg appearance-none cursor-pointer slider-thumb"
          />
        </div>

        {/* Flap Slider - Only show when flipped */}
        {isFlipped && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gold/20 animate-fade-in">
            <p className="text-sm text-dark-brown font-medium mb-2 text-center">📂 Slide to lift the flap</p>
            <input
              type="range"
              min="0"
              max="100"
              value={flapProgress}
              onChange={handleFlapSliderChange}
              className="w-48 h-2 bg-gold/20 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
          </div>
        )}
      </div>

      {/* Envelope Container */}
      <div className="relative w-96 h-64 perspective-1000">
        {/* Envelope */}
        <div 
          className="relative w-full h-full transition-transform duration-300 transform-style-preserve-3d"
          style={{
            transform: `rotateY(${flipProgress * 1.8}deg)`
          }}
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
            </div>
          </div>

          {/* Back Side - Envelope with Enhanced Flap */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            {/* Envelope Body */}
            <div className="w-full h-full bg-gradient-to-br from-warm-cream to-ivory rounded-lg shadow-2xl border border-gold/30 relative overflow-hidden">
              {/* Inner envelope shadow */}
              <div className="absolute inset-2 bg-gradient-to-br from-white/40 to-ivory/60 rounded-md"></div>
              
              {/* Letter inside (visible when flap opens) */}
              <div className={`absolute inset-6 bg-white rounded-sm shadow-inner border border-gold/20 transition-all duration-800 ${
                letterPulled ? 'transform -translate-y-6 scale-110 shadow-2xl' : 'transform translate-y-0'
              }`}>
                <div className="p-4 text-center">
                  <div className="mb-3">
                    <Heart className="w-6 h-6 text-gold mx-auto animate-pulse" />
                  </div>
                  <p className="font-dancing text-xl text-dark-brown mb-1">You're Invited!</p>
                  <p className="font-sans text-sm text-dark-brown/70">10th Anniversary</p>
                  <div className="w-12 h-0.5 bg-gold mx-auto mt-2"></div>
                </div>
              </div>

              {/* Enhanced Envelope Flap */}
              <div 
                className="absolute top-0 left-0 w-full transition-all duration-500 origin-top"
                style={{
                  transform: `rotate(${flapProgress * 0.15}deg) translateY(${flapProgress * 0.03}px)`,
                  clipPath: flapProgress > 50 
                    ? 'polygon(0 0, 100% 0, 85% 65%, 15% 65%)' 
                    : 'polygon(0 0, 100% 0, 50% 75%)',
                }}
              >
                <div className="w-full h-36 bg-gradient-to-b from-warm-cream via-ivory to-gold/30 shadow-lg border-b border-gold/40 relative">
                  {/* Flap texture and depth */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"></div>
                  
                  {/* Flap edge highlight */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gold/20 via-gold/40 to-gold/20"></div>
                  
                  {/* Flap crease lines for realism */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-4 left-4 right-4 h-px bg-gold/30"></div>
                    <div className="absolute top-8 left-8 right-8 h-px bg-gold/20"></div>
                  </div>
                </div>
              </div>
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

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #C8A97E, #D4A574);
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          cursor: pointer;
        }
        
        .slider-thumb::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: linear-gradient(45deg, #C8A97E, #D4A574);
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default IntroCard;
