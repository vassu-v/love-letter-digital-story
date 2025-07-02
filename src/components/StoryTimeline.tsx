
import React from 'react';
import { Calendar, Heart, Home, Baby, Plane, Star, Camera, Gift, Music } from 'lucide-react';

interface StoryEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  memoryNote?: string;
}

const defaultStoryEvents: StoryEvent[] = [
  {
    year: "1999",
    title: "First Meeting",
    description: "A chance encounter at the local coffee shop that changed everything forever.",
    icon: <Heart className="w-6 h-6" />,
    memoryNote: "You spilled coffee on my book, and I knew you were the one!"
  },
  {
    year: "2001",
    title: "The Proposal",
    description: "Under the stars at our favorite spot by the lake, with tears of joy and a resounding 'Yes!'",
    icon: <Star className="w-6 h-6" />,
    memoryNote: "The ring was hidden in the picnic basket for three hours!"
  },
  {
    year: "2002",
    title: "Wedding Day",
    description: "Surrounded by family and friends, we promised to love each other for all eternity.",
    icon: <Calendar className="w-6 h-6" />,
    memoryNote: "Our first dance song still makes us cry happy tears."
  },
  {
    year: "2005",
    title: "First Home",
    description: "Building our nest together in the little blue house on Maple Street.",
    icon: <Home className="w-6 h-6" />,
    memoryNote: "We painted every room together, even though we're terrible painters!"
  },
  {
    year: "2008",
    title: "Family Grows",
    description: "Our hearts expanded as we welcomed our first child into the world.",
    icon: <Baby className="w-6 h-6" />,
    memoryNote: "3 AM feedings became our special bonding time."
  },
  {
    year: "2012",
    title: "Adventures Begin",
    description: "Started our tradition of annual family adventures to new places.",
    icon: <Camera className="w-6 h-6" />,
    memoryNote: "Our photo albums are filled with silly faces and happy moments."
  },
  {
    year: "2015",
    title: "European Journey",
    description: "That magical trip to Europe where we fell in love all over again.",
    icon: <Plane className="w-6 h-6" />,
    memoryNote: "Getting lost in Venice led to our most romantic evening ever."
  },
  {
    year: "2018",
    title: "Milestone Celebrations",
    description: "Learning to celebrate the small victories and everyday magic together.",
    icon: <Gift className="w-6 h-6" />,
    memoryNote: "Tuesday night pizza dates became our favorite tradition."
  },
  {
    year: "2020",
    title: "Growing Stronger",
    description: "Through challenges and changes, our love became our anchor and strength.",
    icon: <Music className="w-6 h-6" />,
    memoryNote: "Kitchen dance parties got us through the tough times."
  }
];

interface StoryTimelineProps {
  events?: StoryEvent[];
}

const StoryTimeline: React.FC<StoryTimelineProps> = ({ events = defaultStoryEvents }) => {
  return (
    <div className="py-20 bg-gradient-to-b from-ivory to-warm-cream">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-dark-brown mb-4">
            Our Journey Through Time
          </h2>
          <p className="font-sans text-lg text-dark-brown/70 max-w-2xl mx-auto">
            Every great love story is a collection of beautiful moments and cherished memories. Here are some of ours.
          </p>
          <div className="w-24 h-0.5 bg-gold mx-auto mt-6"></div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-gold to-soft-gold hidden md:block"></div>

          {/* Timeline Events */}
          <div className="space-y-12 md:space-y-16">
            {events.map((event, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                {/* Content */}
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'}`}>
                  <div className="bg-white rounded-lg shadow-lg p-6 border border-gold/10 hover:shadow-xl transition-shadow duration-300 group">
                    <div className="flex items-center gap-3 mb-3 md:justify-start">
                      <div className="w-12 h-12 bg-gradient-to-br from-gold to-soft-gold rounded-full flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
                        {event.icon}
                      </div>
                      <span className="font-dancing text-2xl text-gold">{event.year}</span>
                    </div>
                    <h3 className="font-playfair text-xl text-dark-brown mb-2">{event.title}</h3>
                    <p className="font-sans text-dark-brown/70 leading-relaxed mb-3">{event.description}</p>
                    
                    {/* Memory Note */}
                    {event.memoryNote && (
                      <div className="mt-4 p-3 bg-gradient-to-r from-warm-cream/50 to-ivory/50 rounded-md border-l-4 border-gold/30">
                        <p className="font-dancing text-lg text-gold/80 italic">
                          💭 "{event.memoryNote}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Timeline Dot (Hidden on mobile) */}
                <div className="hidden md:flex w-2/12 justify-center">
                  <div className="w-4 h-4 bg-gold rounded-full border-4 border-white shadow-lg group-hover:scale-125 transition-transform duration-300"></div>
                </div>

                {/* Spacer */}
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryTimeline;
