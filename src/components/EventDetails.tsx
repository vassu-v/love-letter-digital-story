
import React from 'react';
import { Calendar, Clock, MapPin, Download, Heart } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface EventDetailsProps {
  eventDate?: string;
  eventTime?: string;
  venueName?: string;
  venueAddress?: string;
  rsvpUrl?: string;
}

const EventDetails: React.FC<EventDetailsProps> = ({
  eventDate = "Saturday, June 15th, 2024",
  eventTime = "6:00 PM - 11:00 PM",
  venueName = "The Grand Ballroom at Riverside Manor",
  venueAddress = "123 Celebration Lane, Riverside, CA 92501",
  rsvpUrl = "#rsvp"
}) => {
  const handleRSVP = () => {
    if (rsvpUrl.startsWith('#')) {
      // Scroll to RSVP section
      document.getElementById('rsvp')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Open external URL
      window.open(rsvpUrl, '_blank');
    }
  };

  const handleAddToCalendar = () => {
    // Create calendar event
    const eventTitle = "Sarah & Michael's 25th Anniversary Celebration";
    const eventDetails = `Join us for a special celebration at ${venueName}`;
    const startDate = "20240615T180000";
    const endDate = "20240615T230000";
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(eventDetails)}&location=${encodeURIComponent(venueAddress)}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <div className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-dark-brown mb-4">
            Celebration Details
          </h2>
          <p className="font-sans text-lg text-dark-brown/70">
            We can't wait to celebrate this milestone with you!
          </p>
          <div className="w-24 h-0.5 bg-gold mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Event Information */}
          <div className="space-y-8">
            {/* Date & Time */}
            <div className="bg-gradient-to-br from-warm-cream to-ivory rounded-2xl p-8 border border-gold/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gold to-soft-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-playfair text-xl text-dark-brown mb-2">When</h3>
                  <p className="font-sans text-dark-brown/80 text-lg mb-1">{eventDate}</p>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gold" />
                    <p className="font-sans text-dark-brown/70">{eventTime}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-gradient-to-br from-warm-cream to-ivory rounded-2xl p-8 border border-gold/10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-gold to-soft-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-playfair text-xl text-dark-brown mb-2">Where</h3>
                  <p className="font-sans text-dark-brown/80 text-lg mb-1">{venueName}</p>
                  <p className="font-sans text-dark-brown/70">{venueAddress}</p>
                  <button className="text-gold hover:text-deep-gold transition-colors text-sm mt-2 font-medium">
                    View on Google Maps →
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleRSVP}
                className="flex-1 bg-gradient-to-r from-gold to-soft-gold hover:from-deep-gold hover:to-gold text-white font-semibold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Heart className="w-5 h-5 mr-2" />
                RSVP Now
              </Button>
              
              <Button 
                onClick={handleAddToCalendar}
                variant="outline"
                className="flex-1 border-2 border-gold text-gold hover:bg-gold hover:text-white font-semibold py-6 text-lg rounded-xl transition-all duration-300"
              >
                <Download className="w-5 h-5 mr-2" />
                Add to Calendar
              </Button>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-gradient-to-br from-ivory to-warm-cream rounded-2xl p-8 border border-gold/10 h-96 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-gold mx-auto mb-4" />
                <h3 className="font-playfair text-xl text-dark-brown mb-2">Interactive Map</h3>
                <p className="font-sans text-dark-brown/70 mb-4">
                  Get directions to the venue
                </p>
                <button className="text-gold hover:text-deep-gold transition-colors font-medium">
                  Open in Google Maps →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
