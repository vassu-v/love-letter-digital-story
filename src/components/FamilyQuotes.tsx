
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface FamilyQuote {
  quote: string;
  author: string;
  relationship: string;
}

const defaultQuotes: FamilyQuote[] = [
  {
    quote: "Watching you two together has shown me what true love really looks like. Your bond is an inspiration to us all.",
    author: "Margaret Johnson",
    relationship: "Sarah's Mother"
  },
  {
    quote: "25 years ago, I gained not just a son-in-law, but a true friend. Thank you for loving our daughter so completely.",
    author: "Robert Chen",
    relationship: "Sarah's Father"
  },
  {
    quote: "You've created such a beautiful family together. Your love story gives me hope for my own future.",
    author: "Emma Thompson",
    relationship: "Family Friend"
  },
  {
    quote: "Growing up with parents like you has taught me that love is patient, kind, and enduring. Thank you for the example.",
    author: "David & Michael Jr.",
    relationship: "Your Children"
  }
];

interface FamilyQuotesProps {
  quotes?: FamilyQuote[];
}

const FamilyQuotes: React.FC<FamilyQuotesProps> = ({ quotes = defaultQuotes }) => {
  const [currentQuote, setCurrentQuote] = useState(0);

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  return (
    <div className="py-20 bg-gradient-to-br from-warm-cream to-ivory">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-dark-brown mb-4">
            Words from the Heart
          </h2>
          <p className="font-sans text-lg text-dark-brown/70">
            Loving messages from family and friends who've watched your journey unfold.
          </p>
          <div className="w-24 h-0.5 bg-gold mx-auto mt-6"></div>
        </div>

        {/* Quote Carousel */}
        <div className="relative">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gold/10">
            {/* Quote Icon */}
            <div className="flex justify-center mb-6">
              <Quote className="w-12 h-12 text-gold" />
            </div>

            {/* Quote Text */}
            <div className="text-center mb-8">
              <p className="font-playfair text-xl md:text-2xl text-dark-brown leading-relaxed mb-6 italic">
                "{quotes[currentQuote].quote}"
              </p>
              
              {/* Author */}
              <div className="border-t border-gold/20 pt-6">
                <p className="font-dancing text-2xl text-gold mb-1">
                  {quotes[currentQuote].author}
                </p>
                <p className="font-sans text-sm text-dark-brown/70">
                  {quotes[currentQuote].relationship}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              <button 
                onClick={prevQuote}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 hover:bg-gold/20 transition-colors group"
                disabled={quotes.length <= 1}
              >
                <ChevronLeft className="w-6 h-6 text-gold group-hover:text-deep-gold transition-colors" />
              </button>

              {/* Dots Indicator */}
              <div className="flex gap-2">
                {quotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuote(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentQuote === index ? 'bg-gold' : 'bg-gold/30 hover:bg-gold/50'
                    }`}
                  />
                ))}
              </div>

              <button 
                onClick={nextQuote}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 hover:bg-gold/20 transition-colors group"
                disabled={quotes.length <= 1}
              >
                <ChevronRight className="w-6 h-6 text-gold group-hover:text-deep-gold transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyQuotes;
