
import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Heart } from 'lucide-react';

interface Photo {
  src: string;
  alt: string;
  caption?: string;
}

const defaultPhotos: Photo[] = [
  { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800", alt: "Wedding day", caption: "Our wedding day - June 15, 1999" },
  { src: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800", alt: "Anniversary celebration", caption: "10th Anniversary celebration" },
  { src: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=800", alt: "Family photo", caption: "Family vacation in Tuscany" },
  { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800", alt: "Romantic dinner", caption: "Anniversary dinner at our favorite restaurant" },
  { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800", alt: "Beach vacation", caption: "25 years of adventures together" },
  { src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=80&w=800", alt: "Dancing", caption: "Still dancing after all these years" }
];

interface PhotoGalleryProps {
  photos?: Photo[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos = defaultPhotos }) => {
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedPhoto(index);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const nextPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto + 1) % photos.length);
    }
  };

  const prevPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto((selectedPhoto - 1 + photos.length) % photos.length);
    }
  };

  return (
    <div className="py-20 bg-gradient-to-b from-ivory to-warm-cream">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-4xl md:text-5xl text-dark-brown mb-4">
            Memory Lane
          </h2>
          <p className="font-sans text-lg text-dark-brown/70">
            A collection of precious moments from our 25-year journey together.
          </p>
          <div className="w-24 h-0.5 bg-gold mx-auto mt-6"></div>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <div 
              key={index}
              className="group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => openLightbox(index)}
            >
              <div className="relative aspect-square">
                <img 
                  src={photo.src} 
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-4">
                    <Heart className="w-6 h-6 text-gold" />
                  </div>
                </div>
                {photo.caption && (
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-medium bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
                      {photo.caption}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedPhoto !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            {/* Close Button */}
            <button 
              onClick={closeLightbox}
              className="absolute top-6 right-6 bg-white/10 backdrop-blur-sm rounded-full p-3 hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation Buttons */}
            <button 
              onClick={prevPhoto}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full p-3 hover:bg-white/20 transition-colors z-10"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button 
              onClick={nextPhoto}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-sm rounded-full p-3 hover:bg-white/20 transition-colors z-10"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Photo */}
            <div className="max-w-4xl max-h-full">
              <img 
                src={photos[selectedPhoto].src} 
                alt={photos[selectedPhoto].alt}
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              {photos[selectedPhoto].caption && (
                <div className="text-center mt-4">
                  <p className="text-white text-lg font-playfair">
                    {photos[selectedPhoto].caption}
                  </p>
                </div>
              )}
            </div>

            {/* Photo Counter */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <p className="text-white text-sm">
                {selectedPhoto + 1} of {photos.length}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoGallery;
