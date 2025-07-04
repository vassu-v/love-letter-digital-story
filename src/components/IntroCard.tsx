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
      setShowPigeon(false);
      setPigeonPhase(0);
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
          // Start pigeon animation sequence during the 5s invite display
          setTimeout(() => {
            setShowPigeon(true);
            setPigeonPhase(0); // Pigeon appears from corner
          }, 500);
          setTimeout(() => {
            setPigeonPhase(1); // Pigeon flies toward letter
          }, 1200);
          setTimeout(() => {
            setPigeonPhase(2); // Pigeon sits on letter
          }, 2000);
          // Scene transition after pigeon is settled - extended timing
          setTimeout(() => {
            setIsTransitioning(true);
            setTimeout(() => {
              onCardOpen();
            }, 1500);
          }, 5000);
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
          }, 500);
          setTimeout(() => {
            setPigeonPhase(1);
          }, 1200);
          setTimeout(() => {
            setPigeonPhase(2);
          }, 2000);
          setTimeout(() => {
            setIsTransitioning(true);
            setTimeout(() => {
              onCardOpen();
            }, 1500);
          }, 5000);
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
        return 'bottom-4 right-4 opacity-0 scale-75 transform translate-x-10 translate-y-10';
      case 1:
        return 'bottom-12 right-1/2 opacity-100 scale-90 transform translate-x-1/2 -translate-y-2';
      case 2:
        return 'bottom-16 right-1/2 opacity-100 scale-100 transform translate-x-1/2 -translate-y-4';
      default:
        return 'bottom-4 right-4 opacity-0 scale-75';
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
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-warm-cream via-ivory to-blush-pink p-2 sm:p-4 relative overflow-hidden transition-all duration-1000 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      {/* Enhanced background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-3 h-3 bg-gradient-to-br from-gold to-soft-gold rounded-full animate-float shadow-lg"></div>
        <div className="absolute top-32 right-20 w-2 h-2 bg-gradient-to-br from-rose-gold to-gold rounded-full animate-float shadow-md" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-4 h-4 bg-gradient-to-br from-soft-gold to-deep-gold rounded-full animate-float shadow-lg" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-gradient-to-br from-blush-pink to-rose-gold rounded-full animate-float shadow-sm" style={{ animationDelay: '6s' }}></div>
      </div>

      {/* Enhanced Instructions - Responsive */}
      <div className="absolute top-4 sm:top-8 left-1/2 transform -translate-x-1/2 z-30 px-2">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl px-4 sm:px-8 py-3 sm:py-4 shadow-xl border border-gold/30 text-center max-w-xs sm:max-w-none">
          <p className="font-playfair text-dark-brown text-sm sm:text-base font-medium">
            <span className="hidden sm:inline">Drag the envelope or use controls to open your invitation</span>
            <span className="sm:hidden">Drag or use controls to open</span>
          </p>
          <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-gold to-soft-gold mx-auto mt-2 rounded-full"></div>
        </div>
      </div>

      {/* Enhanced Flip Control - Bottom Center - Responsive */}
      <div className={`absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-30 transition-all duration-500 px-2 ${flipProgress >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="bg-white/90 backdrop-blur-md rounded-full p-3 sm:p-6 shadow-2xl border border-gold/30">
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-gold via-soft-gold to-deep-gold rounded-full flex items-center justify-center shadow-xl border-2 border-white">
              <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 text-white drop-shadow-sm" />
            </div>
            <div className="relative w-32 sm:w-56">
              <div className="h-6 sm:h-8 bg-gradient-to-r from-gold/20 via-soft-gold/30 to-gold/20 rounded-full overflow-hidden shadow-inner border border-gold/20">
                <div 
                  className="h-full bg-gradient-to-r from-gold via-soft-gold to-deep-gold transition-all duration-300 rounded-full shadow-sm"
                  style={{ width: `${flipProgress}%` }}
                ></div>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={flipProgress}
                onChange={handleFlipSliderChange}
                className="absolute inset-0 w-full h-6 sm:h-8 cursor-pointer slider-horizontal opacity-0"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Vertical Flap Control - Responsive */}
      {isFlipped && (
        <div className="absolute right-2 sm:right-8 top-1/2 transform -translate-y-1/2 z-30 animate-fade-in">
          <div className="bg-white/90 backdrop-blur-md rounded-full p-3 sm:p-6 shadow-2xl border border-gold/30">
            <div className="flex flex-col items-center gap-3 sm:gap-6">
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-gold via-soft-gold to-deep-gold rounded-full flex items-center justify-center shadow-xl border-2 border-white">
                <ArrowDown className="w-5 h-5 sm:w-7 sm:h-7 text-white transform rotate-180 drop-shadow-sm" />
              </div>
              <div className="relative h-32 sm:h-56 w-6 sm:w-8">
                <div className="w-full h-full bg-gradient-to-t from-gold/20 via-soft-gold/30 to-gold/20 rounded-full overflow-hidden shadow-inner border border-gold/20">
                  <div 
                    className="w-full bg-gradient-to-t from-gold via-soft-gold to-deep-gold transition-all duration-300 rounded-full absolute bottom-0 shadow-sm"
                    style={{ height: `${flapProgress}%` }}
                  ></div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={flapProgress}
                  onChange={handleFlapSliderChange}
                  className="absolute inset-0 w-full h-full cursor-pointer slider-vertical opacity-0"
                  orient="vertical"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Envelope Container - Responsive */}
      <div className="relative w-[280px] h-[200px] sm:w-[480px] sm:h-[320px] perspective-1000">
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
          {/* Front Side - Realistic Envelope - Responsive */}
          <div className="absolute inset-0 w-full h-full backface-hidden">
            <div className="w-full h-full bg-gradient-to-br from-ivory via-warm-cream to-ivory rounded-lg shadow-2xl border border-gold/30 relative overflow-hidden">
              {/* Envelope texture */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-transparent"></div>
              
              {/* Envelope edges and seams */}
              <div className="absolute inset-1 sm:inset-2 border border-gold/10 rounded-md"></div>
              
              {/* Postmark - Responsive */}
              <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-10 h-10 sm:w-16 sm:h-16 border-2 border-red-400/60 rounded-full flex items-center justify-center transform -rotate-12">
                <div className="text-center">
                  <div className="text-xs sm:text-xs font-bold text-red-500/70">LOVE</div>
                  <div className="text-xs sm:text-xs text-red-500/70">2024</div>
                </div>
              </div>
              
              {/* Realistic Photo Stamp - Responsive */}
              <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-10 h-12 sm:w-16 sm:h-20 bg-white rounded-sm border border-gray-300 shadow-md transform rotate-3 overflow-hidden">
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
                  <div className="absolute bottom-0.5 sm:bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white bg-black/50 px-0.5 sm:px-1 rounded">
                    LOVE
                  </div>
                </div>
              </div>

              {/* Centered Content - Just Names - Responsive */}
              <div className="absolute inset-4 sm:inset-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="mb-3 sm:mb-6">
                    <p className="font-dancing text-lg sm:text-3xl text-gold mb-1 sm:mb-3">To Our Beloved</p>
                    <p className="font-playfair text-2xl sm:text-5xl text-dark-brown capitalize font-bold leading-tight">{guestName}</p>
                  </div>
                  
                  <div className="w-16 sm:w-24 h-0.5 bg-gold mx-auto mb-3 sm:mb-6"></div>
                  
                  <div className="mb-2 sm:mb-4">
                    <p className="font-dancing text-lg sm:text-2xl text-gold mb-1 sm:mb-2">From</p>
                    <p className="font-playfair text-xl sm:text-4xl text-dark-brown font-bold">Aarav & Riya</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back Side - Envelope with Enhanced Flap - Responsive */}
          <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
            {/* Envelope Body */}
            <div className="w-full h-full bg-gradient-to-br from-warm-cream via-ivory to-warm-cream rounded-lg shadow-2xl border border-gold/30 relative overflow-hidden">
              {/* Inner envelope texture - more luxurious */}
              <div className="absolute inset-2 sm:inset-3 bg-gradient-to-br from-white/80 to-ivory/60 rounded-md border border-gold/30 shadow-inner"></div>
              
              {/* Paper background inside envelope - only visible when flap opens */}
              <div className={`absolute inset-3 sm:inset-6 bg-gradient-to-br from-white to-warm-cream/20 rounded-sm shadow-inner border border-gold/15 transition-opacity duration-500 ${flapProgress > 50 ? 'opacity-100' : 'opacity-0'}`}>
                {/* Paper texture */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-transparent rounded-sm"></div>
                <div className="absolute inset-1 bg-gradient-to-br from-ivory/30 to-transparent rounded-sm"></div>
              </div>
              
              {/* Letter inside (only visible when flap opens significantly) - Responsive */}
              <div className={`absolute inset-4 sm:inset-8 bg-white rounded-sm shadow-lg border border-gold/20 transition-all duration-800 ${
                flapProgress > 60 ? 'opacity-100' : 'opacity-0'
              } ${
                letterPulled ? 'transform -translate-y-4 sm:-translate-y-8 scale-105 sm:scale-110 shadow-2xl rotate-1 z-20' : 'transform translate-y-0 z-10'
              }`}>
                <div className="p-3 sm:p-6 text-center h-full flex flex-col justify-center bg-gradient-to-br from-white to-warm-cream/20 rounded-sm relative">
                  <div className="mb-2 sm:mb-4">
                    <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-gold mx-auto mb-2 sm:mb-3 animate-pulse" />
                  </div>
                  <h3 className="font-dancing text-lg sm:text-2xl text-dark-brown mb-1 sm:mb-2">You're Invited!</h3>
                  <p className="font-playfair text-sm sm:text-lg text-gold mb-1 sm:mb-2">to our</p>
                  <p className="font-playfair text-base sm:text-xl text-dark-brown font-semibold">10th Anniversary</p>
                  <p className="font-playfair text-sm sm:text-lg text-dark-brown">Celebration</p>
                  <div className="w-12 sm:w-16 h-0.5 bg-gold mx-auto mt-2 sm:mt-4"></div>
                  
                  {/* Pigeon Animation on Letter - Responsive */}
                  {showPigeon && (
                    <div className={`absolute transition-all duration-1000 ease-in-out ${getPigeonStyle()}`}>
                      <div className="relative">
                        <div className="text-xl sm:text-2xl animate-bounce" style={{ animationDuration: '1.5s' }}>
                          🕊️
                        </div>
                        {pigeonPhase === 2 && (
                          <div className="absolute -top-4 sm:-top-6 -left-6 sm:-left-8 bg-white/90 backdrop-blur-sm rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs text-dark-brown border border-gold/20 animate-fade-in">
                            Ready! ✨
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Realistic Envelope Flap - Draggable - Responsive */}
              <div 
                className={`absolute top-0 left-0 w-full transition-all duration-500 origin-top z-30 ${isDragging && dragType === 'flap' ? 'cursor-grabbing' : 'cursor-grab'}`}
                style={{
                  transform: `rotateX(${flapProgress * 1.5}deg)`,
                  clipPath: 'polygon(0 0, 100% 0, 50% 75%)',
                }}
                onMouseDown={handleFlapMouseDown}
                onTouchStart={handleFlapTouchStart}
              >
                <div className="w-full h-24 sm:h-40 bg-gradient-to-b from-warm-cream via-ivory to-gold/20 shadow-xl border-b border-gold/40 relative">
                  {/* Enhanced flap texture and depth */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/70 to-transparent"></div>
                  
                  {/* Flap center crease with more definition */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-gold/40 to-gold/10"></div>
                  
                  {/* Enhanced wax seal area - Responsive */}
                  <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-deep-gold via-gold to-soft-gold rounded-full border-2 border-gold/80 flex items-center justify-center shadow-xl">
                    <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-white drop-shadow-sm" />
                    {/* Wax seal texture */}
                    <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
                  </div>
                  
                  {/* Flap shadow underneath */}
                  <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-2 sm:h-4 bg-gradient-to-b from-black/15 to-transparent blur-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full Invite Message - Responsive */}
        {showInvite && (
          <div className="absolute inset-0 flex items-center justify-center animate-fade-in-up z-40 p-4">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 sm:p-10 text-center border-2 border-gold/30 transform animate-scale-in max-w-xs sm:max-w-md w-full">
              <div className="mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gold to-deep-gold rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-xl">
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-white animate-pulse drop-shadow-sm" />
                </div>
                <h2 className="font-playfair text-2xl sm:text-4xl text-dark-brown mb-3 sm:mb-4 font-bold">You're Invited!</h2>
                <p className="font-dancing text-xl sm:text-3xl text-gold mb-2 sm:mb-3">to our</p>
                <p className="font-playfair text-lg sm:text-2xl text-dark-brown font-semibold">10th Anniversary</p>
                <p className="font-playfair text-base sm:text-xl text-dark-brown">Celebration</p>
              </div>
              
              <div className="mb-4 sm:mb-6">
                <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-gold to-soft-gold mx-auto mb-4 sm:mb-6 rounded-full"></div>
                <p className="font-sans text-sm sm:text-base text-dark-brown/80 leading-relaxed">
                  A decade of love, laughter, and memories.<br/>
                  Join us for an evening of celebration!
                </p>
              </div>

              <div className="flex items-center justify-center gap-3 text-gold">
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gold rounded-full animate-ping"></div>
                <p className="font-sans text-xs sm:text-sm font-medium">Preparing your journey...</p>
                <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gold rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
              </div>

              {/* Enhanced Pigeon Animation on Invitation - Responsive */}
              {showPigeon && (
                <div className={`absolute transition-all duration-1000 ease-in-out ${getPigeonStyle()}`}>
                  <div className="relative">
                    <div className="text-2xl sm:text-3xl animate-bounce" style={{ animationDuration: '2s' }}>
                      🕊️
                    </div>
                    {pigeonPhase === 2 && (
                      <div className="absolute -top-6 sm:-top-8 -left-8 sm:-left-10 bg-gold/90 text-white rounded-xl px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm font-medium animate-fade-in shadow-lg">
                        Ready! ✨
                      </div>
                    )}
                  </div>
                </div>
              )}
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
          height: 28px;
          width: 28px;
          border-radius: 50%;
          background: linear-gradient(45deg, #C8A97E, #D4A574);
          border: 2px solid white;
          box-shadow: 0 3px 8px rgba(0,0,0,0.25);
          cursor: grab;
        }

        @media (min-width: 640px) {
          .slider-horizontal::-webkit-slider-thumb {
            height: 36px;
            width: 36px;
            border: 3px solid white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          }
        }

        .slider-horizontal::-webkit-slider-thumb:active {
          cursor: grabbing;
          transform: scale(1.1);
        }

        .slider-horizontal::-moz-range-thumb {
          height: 28px;
          width: 28px;
          border-radius: 50%;
          background: linear-gradient(45deg, #C8A97E, #D4A574);
          border: 2px solid white;
          box-shadow: 0 3px 8px rgba(0,0,0,0.25);
          cursor: grab;
        }

        @media (min-width: 640px) {
          .slider-horizontal::-moz-range-thumb {
            height: 36px;
            width: 36px;
            border: 3px solid white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          }
        }

        .slider-horizontal::-moz-range-thumb:active {
          cursor: grabbing;
          transform: scale(1.1);
        }

        .slider-vertical {
          -webkit-appearance: slider-vertical;
          background: transparent;
          outline: none;
          writing-mode: bt-lr;
        }

        .slider-vertical::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 28px;
          width: 28px;
          border-radius: 50%;
          background: linear-gradient(45deg, #C8A97E, #D4A574);
          border: 2px solid white;
          box-shadow: 0 3px 8px rgba(0,0,0,0.25);
          cursor: grab;
        }

        @media (min-width: 640px) {
          .slider-vertical::-webkit-slider-thumb {
            height: 36px;
            width: 36px;
            border: 3px solid white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          }
        }

        .slider-vertical::-webkit-slider-thumb:active {
          cursor: grabbing;
          transform: scale(1.1);
        }

        .slider-vertical::-moz-range-thumb {
          height: 28px;
          width: 28px;
          border-radius: 50%;
          background: linear-gradient(45deg, #C8A97E, #D4A574);
          border: 2px solid white;
          box-shadow: 0 3px 8px rgba(0,0,0,0.25);
          cursor: grab;
        }

        @media (min-width: 640px) {
          .slider-vertical::-moz-range-thumb {
            height: 36px;
            width: 36px;
            border: 3px solid white;
            box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          }
        }

        .slider-vertical::-moz-range-thumb:active {
          cursor: grabbing;
          transform: scale(1.1);
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

        /* Vertical slider track styling */
        .slider-vertical::-webkit-slider-runnable-track {
          background: transparent;
          border: none;
        }

        .slider-vertical::-moz-range-track {
          background: transparent;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default IntroCard;
