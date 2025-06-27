
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
  const [pigeonFlown, setPigeonFlown] = useState(false);

  useEffect(() => {
    // Sequence of animations
    const timer1 = setTimeout(() => setShowPigeon(true), 500);
    const timer2 = setTimeout(() => setPigeonFlown(true), 1000);
    const timer3 = setTimeout(() => setShowContent(true), 3000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-blue-50 to-rose-50 relative overflow-hidden flex items-center justify-center">
      {/* Sky Background with Clouds */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-16 h-8 bg-white/40 rounded-full blur-sm animate-float"></div>
        <div className="absolute top-32 right-20 w-20 h-10 bg-white/30 rounded-full blur-sm animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 left-1/2 w-24 h-12 bg-white/20 rounded-full blur-sm animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Pigeon Animation */}
      {showPigeon && (
        <div className={`absolute transition-all duration-3000 ${
          pigeonFlown 
            ? 'top-16 right-16 transform scale-75 opacity-60' 
            : 'top-1/2 left-1/4 transform -translate-y-1/2'
        }`}>
          <div className="text-4xl animate-float">🕊️</div>
          {/* Mini invite card that pigeon carries */}
          <div className={`absolute -bottom-2 -right-2 w-8 h-6 bg-ivory border border-gold/30 rounded-sm text-xs flex items-center justify-center transition-all duration-1000 ${
            pigeonFlown ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
          }`}>
            <Heart className="w-2 h-2 text-gold" />
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
            Discover Our Story
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
