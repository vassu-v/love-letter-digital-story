
import React, { useState } from 'react';
import { Heart, Check, Users } from 'lucide-react';
import { Button } from "@/components/ui/button";

const SimpleRSVP: React.FC = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleRSVP = () => {
    setIsConfirmed(true);
    console.log('RSVP confirmed: We will be there!');
    
    // Optional: Add analytics or API call here
    setTimeout(() => {
      // Could redirect or show additional options
    }, 2000);
  };

  return (
    <div className="py-20 bg-gradient-to-br from-warm-cream to-ivory">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Users className="w-8 h-8 text-gold" />
            <h2 className="font-playfair text-4xl md:text-5xl text-dark-brown">
              Join Our Celebration
            </h2>
            <Users className="w-8 h-8 text-gold" />
          </div>
          <p className="font-sans text-lg text-dark-brown/70 max-w-2xl mx-auto">
            We would be honored to have you celebrate this special milestone with us.
          </p>
          <div className="w-24 h-0.5 bg-gold mx-auto mt-6"></div>
        </div>

        {/* RSVP Button */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-gold/20">
          {!isConfirmed ? (
            <div className="space-y-6">
              <div className="mb-8">
                <h3 className="font-playfair text-2xl text-dark-brown mb-4">
                  Will you be joining us?
                </h3>
                <p className="font-sans text-dark-brown/70">
                  Your presence would make our celebration complete.
                </p>
              </div>

              <Button 
                onClick={handleRSVP}
                className="bg-gradient-to-r from-gold via-soft-gold to-deep-gold hover:from-deep-gold hover:via-gold hover:to-soft-gold text-white font-bold py-8 px-12 text-2xl rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <Heart className="w-6 h-6 mr-3 animate-pulse" />
                We Will Be There!
                <Heart className="w-6 h-6 ml-3 animate-pulse" />
              </Button>

              <p className="font-sans text-sm text-dark-brown/60 mt-4">
                Click to confirm your attendance
              </p>
            </div>
          ) : (
            <div className="animate-fade-in-up">
              <div className="w-20 h-20 bg-gradient-to-br from-gold to-deep-gold rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-white animate-pulse" />
              </div>
              
              <h3 className="font-playfair text-3xl text-dark-brown mb-4">
                Wonderful! 🎉
              </h3>
              
              <p className="font-sans text-lg text-dark-brown/80 mb-6">
                We're thrilled you'll be joining us for this special day!
              </p>
              
              <div className="bg-gradient-to-r from-warm-cream to-ivory rounded-xl p-6 border border-gold/20">
                <p className="font-dancing text-xl text-gold mb-2">
                  Thank you for being part of our journey
                </p>
                <p className="font-sans text-sm text-dark-brown/70">
                  We'll send you more details soon. Can't wait to celebrate with you!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="font-sans text-sm text-dark-brown/60">
            Questions? Contact us at celebrate@aaravandriya.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default SimpleRSVP;
