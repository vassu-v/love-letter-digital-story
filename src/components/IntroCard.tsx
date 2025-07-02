import React, { useState } from 'react';
import { Heart, ArrowRight, ArrowDown } from 'lucide-react';

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

      {/* Instructions */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-30">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-6 py-3 shadow-lg border border-gold/20 text-center">
          <p className="font-playfair text-dark-brown text-sm">
            Use the controls to open your invitation
          </p>
        </div>
      </div>

      {/* Flip Control - Bottom Center */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 transition-all duration-500 ${flipProgress >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-xl border border-gold/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-gold to-soft-gold rounded-full flex items-center justify-center shadow-lg">
              <ArrowRight className="w-6 h-6 text-white" />
            </div>
            <div className="relative w-48">
              <div className="h-4 bg-gold/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-gold to-soft-gold transition-all duration-300 rounded-full"
                  style={{ width: `${flipProgress}%` }}
                ></div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={flipProgress}
                onChange={handleFlipSliderChange}
                className="absolute inset-0 w-full h-4 opacity-0 cursor-pointer"
              />
              <div 
                className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-gradient-to-br from-gold via-soft-gold to-deep-gold rounded-full border-3 border-white shadow-lg transition-all duration-200 hover:scale-110 cursor-pointer"
                style={{ left: `calc(${flipProgress}% - 12px)` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Flap Control - Right Side Vertical */}
      {isFlipped && (
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-30 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-xl border border-gold/20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gold to-soft-gold rounded-full flex items-center justify-center shadow-lg">
                <ArrowDown className="w-6 h-6 text-white" />
              </div>
              <div className="relative h-48">
                <div className="w-4 h-full bg-gold/20 rounded-full overflow-hidden">
                  <div 
                    className="w-full bg-gradient-to-t from-gold to-soft-gold transition-all duration-300 rounded-full"
                    style={{ height: `${flapProgress}%` }}
                  ></div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={flapProgress}
                  onChange={handleFlapSliderChange}
                  className="absolute inset-0 w-4 h-full opacity-0 cursor-pointer vertical-slider"
                  orient="vertical"
                />
                <div 
                  className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-gold via-soft-gold to-deep-gold rounded-full border-3 border-white shadow-lg transition-all duration-200 hover:scale-110 cursor-pointer"
                  style={{ bottom: `calc(${flapProgress}% - 12px)` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Envelope Container */}
      <div className="relative w-[480px] h-[320px] perspective-1000">
        {/* Envelope */}
        <div 
          className="relative w-full h-full transition-transform duration-300 transform-style-preserve-3d"
          style={{
            transform: `rotateY(${flipProgress * 1.8}deg)`
          }}
        >
          {/* Front Side - Realistic Envelope */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className="w-full h-full bg-gradient-to-br from-ivory via-warm-cream to-ivory rounded-lg shadow-2xl border border-gold/30 relative overflow-hidden">
              {/* Envelope texture */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent"></div>
              
              {/* Envelope edges and seams */}
              <div className="absolute inset-2 border border-gold/10 rounded-md"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gold/20 to-transparent"></div>
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent"></div>
              <div className="absolute right-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-gold/20 to-transparent"></div>
              
              {/* Postmark */}
              <div className="absolute top-6 left-6 w-20 h-20 border-2 border-gold/40 rounded-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xs font-bold text-gold/60">LOVE</div>
                  <div className="text-xs text-gold/60">2024</div>
                </div>
              </div>
              
              {/* Stamp */}
              <div className="absolute top-6 right-6 w-20 h-24 bg-gradient-to-br from-gold to-soft-gold rounded-sm border-2 border-gold/50 flex items-center justify-center shadow-md transform rotate-2">
                <div className="text-center text-white">
                  <Heart className="w-8 h-8 mx-auto mb-1" />
                  <div className="text-xs font-bold">FOREVER</div>
                </div>
              </div>

              {/* Address section */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-12">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gold/20">
                  <div className="mb-6">
                    <p className="font-dancing text-2xl text-gold mb-2">To Our Beloved</p>
                    <p className="font-playfair text-3xl text-dark-brown capitalize font-bold">{guestName}</p>
                  </div>
                  
                  <div className="border-t border-gold/30 pt-4">
                    <p className="font-dancing text-xl text-gold mb-1">With Love From</p>
                    <p className="font-playfair text-2xl text-dark-brown font-semibold">Aarav & Riya</p>
                  </div>
                </div>
              </div>

              {/* Envelope corner details */}
              <div className="absolute top-0 left-0 w-8 h-8 border-r border-b border-gold/20"></div>
              <div className="absolute top-0 right-0 w-8 h-8 border-l border-b border-gold/20"></div>
              <div className="absolute bottom-0 left-0 w-8 h-8 border-r border-t border-gold/20"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-l border-t border-gold/20"></div>
            </div>
          </div>

          {/* Back Side - Envelope with Enhanced Flap */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            {/* Envelope Body */}
            <div className="w-full h-full bg-gradient-to-br from-warm-cream via-ivory to-warm-cream rounded-lg shadow-2xl border border-gold/30 relative overflow-hidden">
              {/* Inner envelope texture */}
              <div className="absolute inset-3 bg-gradient-to-br from-white/40 to-ivory/60 rounded-md border border-gold/10"></div>
              
              {/* Letter inside (visible when flap opens) */}
              <div className={`absolute inset-8 bg-white rounded-sm shadow-inner border border-gold/20 transition-all duration-800 ${
                letterPulled ? 'transform -translate-y-8 scale-110 shadow-2xl rotate-1' : 'transform translate-y-0'
              }`}>
                <div className="p-6 text-center h-full flex flex-col justify-center">
                  <div className="mb-4">
                    <Heart className="w-8 h-8 text-gold mx-auto mb-3 animate-pulse" />
                  </div>
                  <h3 className="font-dancing text-2xl text-dark-brown mb-2">You're Invited!</h3>
                  <p className="font-playfair text-lg text-gold mb-2">to our</p>
                  <p className="font-playfair text-xl text-dark-brown font-semibold">10th Anniversary</p>
                  <p className="font-playfair text-lg text-dark-brown">Celebration</p>
                  <div className="w-16 h-0.5 bg-gold mx-auto mt-4"></div>
                </div>
              </div>

              {/* Realistic Envelope Flap */}
              <div 
                className="absolute top-0 left-0 w-full transition-all duration-500 origin-top z-10"
                style={{
                  transform: `rotateX(${flapProgress * 1.5}deg)`,
                  clipPath: 'polygon(0 0, 100% 0, 50% 75%)',
                }}
              >
                <div className="w-full h-40 bg-gradient-to-b from-warm-cream via-ivory to-gold/20 shadow-lg border-b border-gold/40 relative">
                  {/* Flap texture and depth */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent"></div>
                  
                  {/* Flap center crease */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full bg-gold/20"></div>
                  
                  {/* Flap edge highlight */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gold/20 via-gold/40 to-gold/20"></div>
                  
                  {/* Flap corner details */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-r border-b border-gold/20"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-l border-b border-gold/20"></div>
                  
                  {/* Wax seal area */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-deep-gold to-gold rounded-full border-2 border-gold/60 flex items-center justify-center shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
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

      <style>{`
        .vertical-slider {
          writing-mode: bt-lr; /* IE */
          -webkit-appearance: slider-vertical; /* WebKit */
        }
      `}</style>
    </div>
  );
};

export default IntroCard;