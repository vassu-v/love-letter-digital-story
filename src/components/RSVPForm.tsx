
import React, { useState } from 'react';
import { Heart, Send, User, Mail, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const RSVPForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: '',
    guests: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('RSVP Form Data:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div id="rsvp" className="py-20 bg-gradient-to-br from-warm-cream to-ivory">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gold/10">
            <div className="w-16 h-16 bg-gradient-to-br from-gold to-soft-gold rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-playfair text-3xl text-dark-brown mb-4">Thank You!</h2>
            <p className="font-sans text-lg text-dark-brown/70 mb-6">
              We've received your RSVP and can't wait to celebrate with you!
            </p>
            <p className="font-sans text-dark-brown/60">
              You should receive a confirmation email shortly with all the details.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="rsvp" className="py-20 bg-gradient-to-br from-warm-cream to-ivory">
      <div className="max-w-2xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-playfair text-4xl md:text-5xl text-dark-brown mb-4">
            RSVP
          </h2>
          <p className="font-sans text-lg text-dark-brown/70">
            Please let us know if you'll be joining us for this special celebration.
          </p>
          <div className="w-24 h-0.5 bg-gold mx-auto mt-6"></div>
        </div>

        {/* RSVP Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gold/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block font-playfair text-dark-brown mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name *
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full border-gold/20 focus:border-gold focus:ring-gold/20"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-playfair text-dark-brown mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address *
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full border-gold/20 focus:border-gold focus:ring-gold/20"
                placeholder="Enter your email address"
              />
            </div>

            {/* Attendance */}
            <div>
              <label className="block font-playfair text-dark-brown mb-2">
                Will you be attending? *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={formData.attending === 'yes'}
                    onChange={handleInputChange}
                    className="mr-2 text-gold focus:ring-gold"
                    required
                  />
                  <span className="font-sans">Yes, I'll be there! 🎉</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={formData.attending === 'no'}
                    onChange={handleInputChange}
                    className="mr-2 text-gold focus:ring-gold"
                    required
                  />
                  <span className="font-sans">Sorry, can't make it</span>
                </label>
              </div>
            </div>

            {/* Number of Guests */}
            {formData.attending === 'yes' && (
              <div>
                <label className="block font-playfair text-dark-brown mb-2">
                  Number of guests (including yourself)
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  className="w-full border border-gold/20 rounded-md px-3 py-2 focus:border-gold focus:ring-gold/20"
                >
                  <option value="">Select number of guests</option>
                  <option value="1">1 person</option>
                  <option value="2">2 people</option>
                  <option value="3">3 people</option>
                  <option value="4">4 people</option>
                  <option value="5">5+ people</option>
                </select>
              </div>
            )}

            {/* Message */}
            <div>
              <label className="block font-playfair text-dark-brown mb-2">
                <MessageSquare className="w-4 h-4 inline mr-2" />
                Special Message (Optional)
              </label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full border-gold/20 focus:border-gold focus:ring-gold/20"
                placeholder="Share a special memory or message for Sarah & Michael..."
              />
            </div>

            {/* Submit Button */}
            <Button 
              type="submit"
              className="w-full bg-gradient-to-r from-gold to-soft-gold hover:from-deep-gold hover:to-gold text-white font-semibold py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Send className="w-5 h-5 mr-2" />
              Send RSVP
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RSVPForm;
