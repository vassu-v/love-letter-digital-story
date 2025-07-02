
import React, { useState, useEffect } from 'react';
import { ArrowDown, Heart } from 'lucide-react';

interface PigeonHeroProps {
  coupleNames?: string;
  heroMessage?: string;
  onScrollToNext: () => void;
}

const PigeonHero: React.FC<PigeonHeroProps> = ({ 
  coupleNames = "Aarav & Riya", 
  heroMessage = "A decade of love, a lifetime to go... Join us as we celebrate 10 beautiful years of laughter, adventures, and endless love.",
  onScrollToNext 
}) => {
  const [showPigeon, setShowPigeon] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [pigeonPhase, setPigeonPhase] = useState(0);

  useEffect(() => {
    // Enhanced pigeon animation sequence
    const timer1 = setTimeout(() => setShowPigeon(true), 500);
    const timer2 = setTimeout(() => setPigeonPhase(1), 1200); // Flying across
    const timer3 = setTimeout(() => setPigeonPhase(2), 2500); // Circling
    const timer4 = setTimeout(() => setPigeonPhase(3), 4000); // Final position
    const timer5 = setTimeout(() => setShowContent(true), 4500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  const getPigeonStyle = () => {
    switch (pigeonPhase) {
      case 0:
        return 'top-1/2 -left-20 transform -translate-y-1/2 opacity-0 scale-75';
      case 1:
        return 'top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-100 scale-100';
      case 2:
        return 'top-1/4 right-1/4 transform opacity-90 scale-90';
      case 3:
        return 'top-16 right-16 transform scale-75 opacity-70';
      default:
        return 'top-1/2 -left-20 transform -translate-y-1/2 opacity-0';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-rose-50 relative overflow-hidden flex items-center justify-center">
      {/* Enhanced Sky Background with Multiple Cloud Layers */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-16 h-8 bg-white/40 rounded-full blur-sm animate-float"></div>
        <div className="absolute top-32 right-20 w-20 h-10 bg-white/30 rounded-full blur-sm animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 left-1/2 w-24 h-12 bg-white/20 rounded-full blur-sm animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-60 left-1/4 w-18 h-9 bg-white/25 rounded-full blur-sm animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 right-1/3 w-22 h-11 bg-white/35 rounded-full blur-sm animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Enhanced Pigeon Animation */}
      {showPigeon && (
        <div className={`absolute transition-all duration-1000 ease-in-out ${getPigeonStyle()}`}>
          <div className="relative">
            {/* Pigeon with wing flapping animation */}
            <div className="text-4xl animate-bounce" style={{ animationDuration: '0.8s' }}>
              🕊️
            </div>
            
            {/* Flight trail effect */}
            {pigeonPhase === 1 && (
              <div className="absolute -left-8 top-1/2 w-16 h-1 bg-gradient-to-r from-white/60 to-transparent rounded animate-pulse"></div>
            )}
            
            {/* Mini invite card that pigeon delivers */}
            <div className={`absolute -bottom-3 -right-3 w-10 h-7 bg-ivory border border-gold/30 rounded-sm text-xs flex items-center justify-center shadow-lg transition-all duration-1000 ${
              pigeonPhase >= 3 ? 'opacity-100 scale-100 animate-pulse' : 'opacity-80 scale-90'
            }`}>
              <Heart className="w-3 h-3 text-gold animate-pulse" />
            </div>

            {/* Delivery message */}
            {pigeonPhase >= 3 && (
              <div className="absolute -left-20 -top-8 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 text-xs text-dark-brown border border-gold/20 animate-fade-in">
                Special Delivery! 💌
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`text-center max-w-4xl px-6 transition-all duration-1000 ${
        showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        {/* Couple Names */}
        <div className="mb-8">
          <h1 className="font-dancing text-6xl md:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-gold to-rose-600 mb-4 leading-tight">
            {coupleNames}
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-rose-300 to-gold"></div>
            <Heart className="w-6 h-6 text-rose-400 animate-pulse" />
            <div className="w-20 h-0.5 bg-gradient-to-l from-transparent via-rose-300 to-gold"></div>
          </div>
        </div>

        {/* Hero Message */}
        <div className="mb-12">
          <p className="font-playfair text-xl md:text-2xl text-dark-brown leading-relaxed max-w-3xl mx-auto">
            {heroMessage}
          </p>
        </div>

        {/* Anniversary Badge */}
        <div className="inline-block bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg border border-rose-200 mb-12">
          <p className="font-playfair text-lg text-dark-brown">
            <span className="font-dancing text-2xl text-rose-400">10th</span> Wedding Anniversary
          </p>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="flex flex-col items-center cursor-pointer group transition-all duration-300 hover:transform hover:scale-105"
          onClick={onScrollToNext}
        >
          <p className="font-sans text-sm text-dark-brown/70 mb-2 group-hover:text-dark-brown transition-colors">
            Discover Our Journey
          </p>
          <div className="animate-bounce">
            <ArrowDown className="w-6 h-6 text-rose-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PigeonHero;
