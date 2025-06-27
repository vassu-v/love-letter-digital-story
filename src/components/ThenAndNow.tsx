
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

interface ThenAndNowProps {
  thenImage?: string;
  nowImage?: string;
  thenCaption?: string;
  nowCaption?: string;
}

const ThenAndNow: React.FC<ThenAndNowProps> = ({
  thenImage = "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1000",
  nowImage = "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1000",
  thenCaption = "1999 - Young and in love",
  nowCaption = "2024 - Still crazy about each other"
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    { image: thenImage, caption: thenCaption, label: "Then" },
    { image: nowImage, caption: nowCaption, label: "Now" }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-dark-brown mb-4">
            Then & Now
          </h2>
          <p className="font-sans text-lg text-dark-brown/70 max-w-2xl mx-auto">
            Some things change, but our love only grows stronger with each passing year.
          </p>
          <div className="w-24 h-0.5 bg-gold mx-auto mt-6"></div>
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {slides.map((slide, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="relative aspect-square">
                      <img 
                        src={slide.image} 
                        alt={slide.caption}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                      <div className="absolute bottom-6 left-6 right-6 text-white">
                        <div className="inline-block bg-gold px-4 py-2 rounded-full mb-3">
                          <span className="font-dancing text-lg">{slide.label}</span>
                        </div>
                        <p className="font-playfair text-lg">{slide.caption}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button 
              onClick={() => setActiveSlide(activeSlide === 0 ? 1 : 0)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-dark-brown" />
            </button>
            <button 
              onClick={() => setActiveSlide(activeSlide === 0 ? 1 : 0)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-dark-brown" />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    activeSlide === index ? 'bg-gold' : 'bg-gold/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Split View */}
        <div className="hidden md:block">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Then */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src={thenImage} 
                  alt={thenCaption}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <div className="bg-gold px-6 py-3 rounded-full">
                    <span className="font-dancing text-xl text-white">Then</span>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="font-playfair text-xl leading-relaxed">{thenCaption}</p>
                </div>
              </div>
            </div>

            {/* Now */}
            <div className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src={nowImage} 
                  alt={nowCaption}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <div className="bg-gold px-6 py-3 rounded-full">
                    <span className="font-dancing text-xl text-white">Now</span>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="font-playfair text-xl leading-relaxed">{nowCaption}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center Heart */}
          <div className="flex justify-center -mt-12 relative z-10">
            <div className="bg-white rounded-full p-4 shadow-lg border-4 border-gold/20">
              <Heart className="w-8 h-8 text-gold animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThenAndNow;
