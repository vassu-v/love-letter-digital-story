
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import IntroCard from '@/components/IntroCard';
import PigeonHero from '@/components/PigeonHero';
import StoryTimeline from '@/components/StoryTimeline';
import ThenAndNow from '@/components/ThenAndNow';
import FamilyQuotes from '@/components/FamilyQuotes';
import EventDetails from '@/components/EventDetails';
import WishesSection from '@/components/WishesSection';
import PhotoGallery from '@/components/PhotoGallery';
import SimpleRSVP from '@/components/SimpleRSVP';

const Index = () => {
  const [searchParams] = useSearchParams();
  const [currentSection, setCurrentSection] = useState('intro');
  
  // Get guest name from URL parameter
  const guestName = searchParams.get('guest') || "You";

  const handleCardOpen = () => {
    setCurrentSection('hero');
  };

  const handleScrollToNext = () => {
    setCurrentSection('story');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-cream via-ivory to-blush-pink">
      {/* Intro Card Section */}
      {currentSection === 'intro' && (
        <IntroCard guestName={guestName} onCardOpen={handleCardOpen} />
      )}

      {/* Main Content - Only show after card is opened */}
      {currentSection !== 'intro' && (
        <div className="bg-gradient-to-br from-warm-cream via-ivory to-blush-pink min-h-screen">
          {/* Enhanced Pigeon Hero Section */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-rose-gold/10"></div>
            <PigeonHero 
              coupleNames="Aarav & Riya"
              heroMessage="A decade of love, a lifetime to go... Join us as we celebrate 10 beautiful years of laughter, adventures, and endless love."
              onScrollToNext={handleScrollToNext}
            />
          </div>

          {/* Story Timeline with enhanced background */}
          <div id="story" className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-blush-pink/20 to-warm-cream/30"></div>
            <div className="relative z-10">
              <StoryTimeline />
            </div>
          </div>

          {/* Then & Now with decorative elements */}
          <div className="relative py-16">
            <div className="absolute inset-0 bg-gradient-to-br from-ivory via-warm-cream to-blush-pink/50"></div>
            <div className="absolute top-10 left-10 w-20 h-20 bg-gold/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-rose-gold/20 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <ThenAndNow />
            </div>
          </div>

          {/* Event Details with enhanced styling */}
          <div className="relative py-16">
            <div className="absolute inset-0 bg-gradient-to-br from-warm-cream via-ivory to-gold/10"></div>
            <div className="relative z-10">
              <EventDetails />
            </div>
          </div>

          {/* Wishes Section with decorative background */}
          <div className="relative py-16">
            <div className="absolute inset-0 bg-gradient-to-br from-blush-pink/30 via-rose-gold/20 to-warm-cream"></div>
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-20 left-1/4 w-4 h-4 bg-gold rounded-full animate-float"></div>
              <div className="absolute bottom-20 right-1/4 w-6 h-6 bg-soft-gold rounded-full animate-float" style={{ animationDelay: '3s' }}></div>
            </div>
            <div className="relative z-10">
              <WishesSection coupleNames="Aarav & Riya" />
            </div>
          </div>

          {/* Simple RSVP with enhanced background */}
          <div className="relative py-16">
            <div className="absolute inset-0 bg-gradient-to-br from-ivory via-warm-cream to-blush-pink/40"></div>
            <div className="relative z-10">
              <SimpleRSVP />
            </div>
          </div>

          {/* Enhanced Footer */}
          <footer className="relative bg-gradient-to-br from-dark-brown via-dark-brown to-dark-brown/90 text-white py-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-soft-gold/5"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold via-soft-gold to-rose-gold"></div>
            
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
              <div className="mb-8">
                <h3 className="font-dancing text-5xl text-gold mb-4 drop-shadow-lg">Aarav & Riya</h3>
                <p className="font-playfair text-2xl mb-2">10 Years of Love</p>
                <div className="w-24 h-1 bg-gradient-to-r from-gold to-soft-gold mx-auto rounded-full"></div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-gold to-soft-gold rounded-full flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <p className="font-sans text-sm text-white/80">With Love</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-gold to-gold rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-lg">✨</span>
                  </div>
                  <p className="font-sans text-sm text-white/80">With Joy</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-soft-gold to-deep-gold rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white text-lg">🕊️</span>
                  </div>
                  <p className="font-sans text-sm text-white/80">With Peace</p>
                </div>
              </div>
              
              <div className="border-t border-gold/30 pt-8">
                <p className="font-sans text-base text-white/90 mb-2">
                  Thank you for being part of our journey.
                </p>
                <p className="font-dancing text-xl text-gold">
                  We can't wait to celebrate with you! 💕
                </p>
              </div>
            </div>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Index;
