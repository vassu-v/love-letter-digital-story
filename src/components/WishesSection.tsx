
import React, { useState } from 'react';
import { Heart, Send, MessageCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface WishesSectionProps {
  coupleNames?: string;
}

const WishesSection: React.FC<WishesSectionProps> = ({ 
  coupleNames = "Aarav & Riya" 
}) => {
  const [wishText, setWishText] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmitWish = () => {
    if (wishText.trim()) {
      console.log('Wish submitted:', wishText);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setWishText('');
      }, 3000);
    }
  };

  return (
    <div className="py-20 bg-gradient-to-br from-rose-50 to-warm-cream">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Heart className="w-8 h-8 text-rose-400" />
            <h2 className="font-playfair text-4xl md:text-5xl text-dark-brown">
              Share Your Wishes
            </h2>
            <Heart className="w-8 h-8 text-rose-400" />
          </div>
          <p className="font-sans text-lg text-dark-brown/70 max-w-2xl mx-auto">
            Your heartfelt messages mean the world to us. Share your wishes, memories, or blessings for {coupleNames}.
          </p>
          <div className="w-24 h-0.5 bg-rose-400 mx-auto mt-6"></div>
        </div>

        {/* Wishes Form */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-rose-200">
          {!isSubmitted ? (
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 font-playfair text-lg text-dark-brown mb-3">
                  <MessageCircle className="w-5 h-5 text-rose-400" />
                  Your Message
                </label>
                <Textarea
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  placeholder="Share your wishes, favorite memories, or blessings for the happy couple..."
                  className="min-h-32 border-rose-200 focus:border-rose-400 focus:ring-rose-400 resize-none font-sans text-dark-brown"
                />
                <p className="text-sm text-dark-brown/60 mt-2">
                  {wishText.length}/500 characters
                </p>
              </div>

              <Button 
                onClick={handleSubmitWish}
                disabled={!wishText.trim()}
                className="w-full bg-gradient-to-r from-rose-400 via-gold to-rose-500 hover:from-rose-500 hover:via-deep-gold hover:to-rose-600 text-white font-semibold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5 mr-2" />
                Send Your Wishes
              </Button>
            </div>
          ) : (
            <div className="text-center py-8 animate-fade-in">
              <div className="w-16 h-16 bg-gradient-to-br from-rose-400 to-gold rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white animate-pulse" />
              </div>
              <h3 className="font-playfair text-2xl text-dark-brown mb-2">
                Thank You! 💕
              </h3>
              <p className="font-sans text-dark-brown/70">
                Your beautiful wishes have been received with love and gratitude.
              </p>
            </div>
          )}
        </div>

        {/* Sample Wishes Display */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-rose-100">
            <div className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-rose-400 mt-1 flex-shrink-0" />
              <div>
                <p className="font-sans text-dark-brown/80 italic">
                  "Wishing you both endless love, laughter, and beautiful memories for the next decade and beyond!"
                </p>
                <p className="font-dancing text-lg text-gold mt-2">- The Johnson Family</p>
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-rose-100">
            <div className="flex items-start gap-3">
              <Heart className="w-5 h-5 text-rose-400 mt-1 flex-shrink-0" />
              <div>
                <p className="font-sans text-dark-brown/80 italic">
                  "Your love story continues to inspire us all. Here's to many more years of happiness together!"
                </p>
                <p className="font-dancing text-lg text-gold mt-2">- Sarah & Mike</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishesSection;
