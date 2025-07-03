
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
    <div className="min-h-screen">
      {/* Intro Card Section */}
      {currentSection === 'intro' && (
        <IntroCard guestName={guestName} onCardOpen={handleCardOpen} />
      )}

      {/* Main Content - Only show after card is opened */}
      {currentSection !== 'intro' && (
        <>
          {/* Pigeon Hero Section */}
          <PigeonHero 
            coupleNames="Aarav & Riya"
            heroMessage="A decade of love, a lifetime to go... Join us as we celebrate 10 beautiful years of laughter, adventures, and endless love."
            onScrollToNext={handleScrollToNext}
          />

          {/* Story Timeline (Merged with Memory Lane) */}
          <div id="story">
            <StoryTimeline />
          </div>

          {/* Then & Now */}
          <ThenAndNow />


          {/* Event Details */}
          <EventDetails />

          {/* Wishes Section (Moved from heart section) */}
          <WishesSection coupleNames="Aarav & Riya" />


          {/* Simple RSVP */}
          <SimpleRSVP />

          {/* Footer */}
          <footer className="bg-dark-brown text-white py-12">
            <div className="max-w-4xl mx-auto px-6 text-center">
              <div className="mb-6">
                <h3 className="font-dancing text-3xl text-gold mb-2">Aarav & Riya</h3>
                <p className="font-playfair text-lg">10 Years of Love</p>
              </div>
              <div className="border-t border-gold/20 pt-6">
                <p className="font-sans text-sm text-white/70">
                  Thank you for being part of our journey. We can't wait to celebrate with you!
                </p>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default Index;
