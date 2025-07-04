import React, { useState, useRef } from 'react';
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
  const [showPigeon, setShowPigeon] = useState(false);
  const [pigeonPhase, setPigeonPhase] = useState(0);
  const [flipProgress, setFlipProgress] = useState(0);
  const [flapProgress, setFlapProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [dragType, setDragType] = useState<'flip' | 'flap' | null>(null);
  const dragStartRef = useRef({ x: 0, y: 0, initialProgress: 0 });

  const handleFlipSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    updateFlipProgress(value);
  };

  const handleFlapSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isFlipped) return;
    const value = parseInt(e.target.value);
    updateFlapProgress(value);
  };

  const updateFlipProgress = (value: number) => {
    setFlipProgress(value);
    
    // Auto-complete if close to end
    if (value >= 85 && !isFlipped) {
      setFlipProgress(100);
      setIsFlipped(true);
    } else if (value >= 100 && !isFlipped) {
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

  const updateFlapProgress = (value: number) => {
    setFlapProgress(value);
    
    // Auto-complete if close to end
    if (value >= 85 && !flapOpened) {
      setFlapProgress(100);
      setFlapOpened(true);
      // Enhanced sequence with pigeon animation
      setTimeout(() => {
        setLetterPulled(true);
        setTimeout(() => {
          setShowInvite(true);
          // Start pigeon animation sequence during the 3s invite display
          setTimeout(() => {
            setShowPigeon(true);
            setPigeonPhase(0); // Pigeon appears from corner
          }, 200);
          setTimeout(() => {
            setPigeonPhase(1); // Pigeon flies toward letter
          }, 800);
          setTimeout(() => {
            setPigeonPhase(2); // Pigeon sits on letter
          }, 1500);
          // Scene transition after pigeon is settled
          setTimeout(() => {
            setIsTransitioning(true);
            setTimeout(() => {
              onCardOpen();
            }, 1500);
          }, 3000);
        }, 1000);
      }, 500);
    } else if (value >= 100 && !flapOpened) {
      setFlapOpened(true);
      // Same enhanced sequence
      setTimeout(() => {
        setLetterPulled(true);
        setTimeout(() => {
          setShowInvite(true);
          setTimeout(() => {
            setShowPigeon(true);
            setPigeonPhase(0);
          }, 200);
          setTimeout(() => {
            setPigeonPhase(1);
          }, 800);
          setTimeout(() => {
            setPigeonPhase(2);
          }, 1500);
          setTimeout(() => {
            setIsTransitioning(true);
            setTimeout(() => {
              onCardOpen();
            }, 1500);
          }, 3000);
        }, 1000);
      }, 500);
    } else if (value < 100 && flapOpened) {
      setFlapOpened(false);
      setLetterPulled(false);
      setShowInvite(false);
      setShowPigeon(false);
      setPigeonPhase(0);
    }
  };

  const handleEnvelopeMouseDown = (e: React.MouseEvent) => {
    if (isFlipped) return; 
    
    setIsDragging(true);
    setDragType('flip');
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initialProgress: flipProgress
    };
    e.preventDefault();
  };

  const handleFlapMouseDown = (e: React.MouseEvent) => {
    if (!isFlipped) return; 
    
    setIsDragging(true);
    setDragType('flap');
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initialProgress: flapProgress
    };
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !dragType) return;

    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;

    if (dragType === 'flip') {
      const dragDistance = deltaX;
      const maxDrag = 200; 
      const progressDelta = (dragDistance / maxDrag) * 100;
      const newProgress = Math.max(0, Math.min(100, dragStartRef.current.initialProgress + progressDelta));
      updateFlipProgress(newProgress);
    } else if (dragType === 'flap') {
      const dragDistance = -deltaY; 
      const maxDrag = 150; 
      const progressDelta = (dragDistance / maxDrag) * 100;
      const newProgress = Math.max(0, Math.min(100, dragStartRef.current.initialProgress + progressDelta));
      updateFlapProgress(newProgress);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragType(null);
  };

  const handleEnvelopeTouchStart = (e: React.TouchEvent) => {
    if (isFlipped) return;
    
    const touch = e.touches[0];
    setIsDragging(true);
    setDragType('flip');
    dragStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      initialProgress: flipProgress
    };
    e.preventDefault();
  };

  const handleFlapTouchStart = (e: React.TouchEvent) => {
    if (!isFlipped) return;
    
    const touch = e.touches[0];
    setIsDragging(true);
    setDragType('flap');
    dragStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      initialProgress: flapProgress
    };
    e.preventDefault();
    e.stopPropagation();
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging || !dragType) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - dragStartRef.current.x;
    const deltaY = touch.clientY - dragStartRef.current.y;

    if (dragType === 'flip') {
      const dragDistance = deltaX;
      const maxDrag = 200;
      const progressDelta = (dragDistance / maxDrag) * 100;
      const newProgress = Math.max(0, Math.min(100, dragStartRef.current.initialProgress + progressDelta));
      updateFlipProgress(newProgress);
    } else if (dragType === 'flap') {
      const dragDistance = -deltaY; 
      const maxDrag = 150;
      const progressDelta = (dragDistance / maxDrag) * 100;
      const newProgress = Math.max(0, Math.min(100, dragStartRef.current.initialProgress + progressDelta));
      updateFlapProgress(newProgress);
    }
    e.preventDefault();
  };

  const getPigeonStyle = () => {
    switch (pigeonPhase) {
      case 0:
        return 'bottom-8 right-8 opacity-0 scale-75 transform translate-x-20 translate-y-20';
      case 1:
        return 'bottom-16 right-1/2 opacity-100 scale-90 transform translate-x-1/2';
      case 2:
        return 'bottom-20 right-1/2 opacity-100 scale-100 transform translate-x-1/2';
      default:
        return 'bottom-8 right-8 opacity-0 scale-75';
    }
  };

  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleMouseUp);
      };
    }
  }, [isDragging, dragType]);

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-warm-cream to-ivory p-4 relative overflow-hidden transition-all duration-1000 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
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
            Drag the envelope or use controls to open your invitation
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
              <div className="h-6 bg-gold/20 rounded-full overflow-hidden">
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
                className="absolute inset-0 w-full h-6 cursor-pointer slider-horizontal"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Vertical Flap Control */}
      {isFlipped && (
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-30 animate-fade-in">
          <div className="bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-xl border border-gold/20">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-gold to-soft-gold rounded-full flex items-center justify-center shadow-lg">
                <ArrowDown className="w-6 h-6 text-white transform rotate-180" />
              </div>
              <div className="relative h-48 w-6">
                <div className="w-6 h-full bg-gold/20 rounded-full overflow-hidden">
                  <div 
                    className="w-full bg-gradient-to-t from-gold to-soft-gold transition-all duration-300 rounded-full absolute bottom-0"
                    style={{ height: `${flapProgress}%` }}
                  ></div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={flapProgress}
                  onChange={handleFlapSliderChange}
                  className="absolute top-0 left-0 w-6 h-48 cursor-pointer slider-vertical"
                  style={{ 
                    writingMode: 'bt-lr',
                    WebkitAppearance: 'slider-vertical'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Envelope Container */}
      <div className="relative w-[480px] h-[320px] perspective-1000">
        {/* Paper Background (Hidden behind envelope) */}
        <div className="absolute inset-0 w-full h-full bg-white rounded-lg shadow-lg transform translate-z-[-10px] opacity-90"></div>
        
        {/* Envelope */}
        <div 
          className={`relative w-full h-full transition-transform duration-300 transform-style-preserve-3d ${isDragging && dragType === 'flip' ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{
            transform: `rotateY(${flipProgress * 1.8}deg)`
          }}
          onMouseDown={handleEnvelopeMouseDown}
          onTouchStart={handleEnvelopeTouchStart}
        >
          {/* Front Side - Realistic Envelope */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className="w-full h-full bg-gradient-to-br from-ivory via-warm-cream to-ivory rounded-lg shadow-2xl border border-gold/30 relative overflow-hidden">
              {/* Envelope texture */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent"></div>
              
              {/* Envelope edges and seams */}
              <div className="absolute inset-2 border border-gold/10 rounded-md"></div>
              
              {/* Postmark */}
              <div className="absolute top-4 left-4 w-16 h-16 border-2 border-red-400/60 rounded-full flex items-center justify-center transform -rotate-12">
                <div className="text-center">
                  <div className="text-xs font-bold text-red-500/70">LOVE</div>
                  <div className="text-xs text-red-500/70">2024</div>
                </div>
              </div>
              
              {/* Realistic Photo Stamp */}
              <div className="absolute top-4 right-4 w-16 h-20 bg-white rounded-sm border border-gray-300 shadow-md transform rotate-3 overflow-hidden">
                <div className="w-full h-full relative">
                  {/* Couple photo */}
                  <img 
                    src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=200&h=250&fit=crop&crop=faces"
                    alt="Couple"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Stamp perforations */}
                  <div className="absolute inset-0 border-2 border-dashed border-gray-400/30"></div>
                  
                  {/* Stamp value */}
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white bg-black/50 px-1 rounded">
                    LOVE
                  </div>
                </div>
              </div>

              {/* Centered Content - Just Names */}
              <div className="absolute inset-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-6">
                    <p className="font-dancing text-3xl text-gold mb-3">To Our Beloved</p>
                    <p className="font-playfair text-5xl text-dark-brown capitalize font-bold leading-tight">{guestName}</p>
                  </div>
                  
                  <div className="w-24 h-0.5 bg-gold mx-auto mb-6"></div>
                  
                  <div className="mb-4">
                    <p className="font-dancing text-2xl text-gold mb-2">From</p>
                    <p className="font-playfair text-4xl text-dark-brown font-bold">Aarav & Riya</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back Side - Envelope with Enhanced Flap */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            {/* Envelope Body */}
            <div className="w-full h-full bg-gradient-to-br from-warm-cream via-ivory to-warm-cream rounded-lg shadow-2xl border border-gold/30 relative overflow-hidden">
              {/* Inner envelope texture - more luxurious */}
              <div className="absolute inset-3 bg-gradient-to-br from-white/80 to-ivory/60 rounded-md border border-gold/30 shadow-inner"></div>
              
              {/* Paper background inside envelope - only visible when flap opens */}
              <div className={`absolute inset-6 bg-gradient-to-br from-white to-warm-cream/20 rounded-sm shadow-inner border border-gold/15 transition-opacity duration-500 ${flapProgress > 50 ? 'opacity-100' : 'opacity-0'}`}>
                {/* Paper texture */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-transparent rounded-sm"></div>
                <div className="absolute inset-1 bg-gradient-to-br from-ivory/30 to-transparent rounded-sm"></div>
              </div>
              
              {/* Letter inside (only visible when flap opens significantly) */}
              <div className={`absolute inset-8 bg-white rounded-sm shadow-lg border border-gold/20 transition-all duration-800 ${
                flapProgress > 60 ? 'opacity-100' : 'opacity-0'
              } ${
                letterPulled ? 'transform -translate-y-8 scale-110 shadow-2xl rotate-1 z-20' : 'transform translate-y-0 z-10'
              }`}>
                <div className="p-6 text-center h-full flex flex-col justify-center bg-gradient-to-br from-white to-warm-cream/20 rounded-sm relative">
                  <div className="mb-4">
                    <Heart className="w-8 h-8 text-gold mx-auto mb-3 animate-pulse" />
                  </div>
                  <h3 className="font-dancing text-2xl text-dark-brown mb-2">You're Invited!</h3>
                  <p className="font-playfair text-lg text-gold mb-2">to our</p>
                  <p className="font-playfair text-xl text-dark-brown font-semibold">10th Anniversary</p>
                  <p className="font-playfair text-lg text-dark-brown">Celebration</p>
                  <div className="w-16 h-0.5 bg-gold mx-auto mt-4"></div>
                  
                  {/* Pigeon Animation on Letter */}
                  {showPigeon && (
                    <div className={`absolute transition-all duration-1000 ease-in-out ${getPigeonStyle()}`}>
                      <div className="relative">
                        <div className="text-2xl animate-bounce" style={{ animationDuration: '1.5s' }}>
                          🕊️
                        </div>
                        {pigeonPhase === 2 && (
                          <div className="absolute -top-6 -left-8 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 text-xs text-dark-brown border border-gold/20 animate-fade-in">
                            Ready! ✨
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Realistic Envelope Flap - Draggable */}
              <div 
                className={`absolute top-0 left-0 w-full transition-all duration-500 origin-top z-30 ${isDragging && dragType === 'flap' ? 'cursor-grabbing' : 'cursor-grab'}`}
                style={{
                  transform: `rotateX(${flapProgress * 1.5}deg)`,
                  clipPath: 'polygon(0 0, 100% 0, 50% 75%)',
                }}
                onMouseDown={handleFlapMouseDown}
                onTouchStart={handleFlapTouchStart}
              >
                <div className="w-full h-40 bg-gradient-to-b from-warm-cream via-ivory to-gold/20 shadow-xl border-b border-gold/40 relative">
                  {/* Enhanced flap texture and depth */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-transparent"></div>
                  
                  {/* Flap center crease with more definition */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-gold/40 to-gold/10"></div>
                  
                  {/* Enhanced wax seal area */}
                  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-deep-gold via-gold to-soft-gold rounded-full border-2 border-gold/80 flex items-center justify-center shadow-xl">
                    <Heart className="w-6 h-6 text-white drop-shadow-sm" />
                    {/* Wax seal texture */}
                    <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
                  </div>
                  
                  {/* Flap shadow underneath */}
                  <div className="absolute -bottom-2 left-0 w-full h-4 bg-gradient-to-b from-black/15 to-transparent blur-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Invite Message */}
        {showInvite && (
          <div className="absolute inset-0 flex items-center justify-center animate-fade-in-up z-40">
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
                <p className="font-sans text-xs">Preparing your journey...</p>
                <div className="w-2 h-2 bg-gold rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .slider-horizontal {
          -webkit-appearance: none;
          appearance: none;
          background: transparent;
          outline: none;
        }

        .slider-horizontal::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 32px;
          width: 32px;
          border-radius: 50%;
          background: linear-gradient(45deg, #C8A97E, #D4A574);
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          cursor: grab;
        }

        .slider-horizontal::-webkit-slider-thumb:active {
          cursor: grabbing;
        }

        .slider-horizontal::-moz-range-thumb {
          height: 32px;
          width: 32px;
          border-radius: 50%;
          background: linear-gradient(45deg, #C8A97E, #D4A574);
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          cursor: grab;
          border: none;
        }

        .slider-horizontal::-moz-range-thumb:active {
          cursor: grabbing;
        }

        /* Fixed vertical slider styles */
        .slider-vertical {
          -webkit-appearance: slider-vertical;
          background: transparent;
          outline: none;
        }

        .slider-vertical::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 32px;
          width: 32px;
          border-radius: 50%;
          background: linear-gradient(45deg, #C8A97E, #D4A574);
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          cursor: grab;
        }

        .slider-vertical::-webkit-slider-thumb:active {
          cursor: grabbing;
        }

        .slider-vertical::-moz-range-thumb {
          height: 32px;
          width: 32px;
          border-radius: 50%;
          background: linear-gradient(45deg, #C8A97E, #D4A574);
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          cursor: grab;
          border: none;
        }

        .slider-vertical::-moz-range-thumb:active {
          cursor: grabbing;
        }

        .slider-horizontal::-webkit-slider-track,
        .slider-vertical::-webkit-slider-track {
          background: transparent;
          border: none;
        }

        .slider-horizontal::-moz-range-track,
        .slider-vertical::-moz-range-track {
          background: transparent;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default IntroCard;
