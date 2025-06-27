
import React, { useState, useEffect } from 'react';
import { ArrowDown, Heart } from 'lucide-react';

interface PigeonHeroProps {
  coupleNames?: string;
  heroMessage?: string;
  onScrollToNext: () => void;
}

const PigeonHero: React.FC<PigeonHeroProps> = ({ 
  coupleNames = "Sarah & Michael", 
  heroMessage = "Join us as we celebrate 25 beautiful years of love, laughter, and endless adventures together.",
  onScrollToNext 
}) => {
  const [showContent, setShowContent] = useState(false);
  const [pigeonFlown, setPigeonFlown] = useState(false);

  useEffect(() => {
    // Trigger pigeon animation and content reveal
    const timer1 = setTimeout(() => setPigeonFlown(true), 500);
    const timer2 = setTimeout(() => setShowContent(true), 2000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-cream via-ivory to-gold/10 relative overflow-hidden flex items-center justify-center">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-2 h-2 bg-gold/30 rounded-full animate-float"></div>
        <div className="absolute top-32 right-20 w-1 h-1 bg-soft-gold/40 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-gold/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Pigeon Animation */}
      <div className={`absolute top-1/3 left-0 transition-all duration-3000 ${pigeonFlown ? 'animate-pigeon-fly' : ''}`}>
        <div className="text-6xl">🕊️</div>
      </div>

      {/* Main Content */}
      <div className={`text-center max-w-4xl px-6 transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Couple Names */}
        <div className="mb-8">
          <h1 className="font-dancing text-6xl md:text-8xl text-gold mb-4 leading-tight">
            {coupleNames}
          </h1>
          <div className="flex items-center justify-center gap-4">
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent to-gold"></div>
            <Heart className="w-6 h-6 text-gold animate-pulse" />
            <div className="w-20 h-0.5 bg-gradient-to-l from-transparent to-gold"></div>
          </div>
        </div>

        {/* Hero Message */}
        <div className="mb-12">
          <p className="font-playfair text-xl md:text-2xl text-dark-brown leading-relaxed max-w-3xl mx-auto">
            {heroMessage}
          </p>
        </div>

        {/* Anniversary Badge */}
        <div className="inline-block bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg border border-gold/20 mb-12">
          <p className="font-playfair text-lg text-dark-brown">
            <span className="font-dancing text-2xl text-gold">25th</span> Wedding Anniversary
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
            <ArrowDown className="w-6 h-6 text-gold" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PigeonHero;
