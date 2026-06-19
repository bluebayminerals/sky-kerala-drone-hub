import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';
import { OnboardingFormData } from '../types';

export const ArtistOnboarding: React.FC = () => {
  const [formData, setFormData] = useState<OnboardingFormData>({
    stageName: '',
    subGenres: '',
    soundcloudLink: '',
    technicalRider: '',
    minFee: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof OnboardingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        stageName: '',
        subGenres: '',
        soundcloudLink: '',
        technicalRider: '',
        minFee: '',
      });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const isFormValid =
    formData.stageName.trim() !== '' &&
    formData.subGenres.trim() !== '' &&
    formData.soundcloudLink.trim() !== '' &&
    formData.minFee.trim() !== '';

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="text-white">ELEVATE YOUR SOUND.</span><br />
            <span className="text-acid-green">COMMAND YOUR VALUE.</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            We aren't a generic talent agency. We represent the finest local and touring electronic minds in South India. If you are ready to play premium curated spaces and scale your career with transparent, high-value bookings, submit your kit below.
          </p>
        </div>

        {/* Form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="bg-industrial-gray border border-industrial-gray-light rounded-lg p-8 space-y-6">
            {/* Stage Name */}
            <div>
              <label className="block text-sm font-bold text-acid-green mb-2">
                STAGE NAME *
              </label>
              <input
                type="text"
                value={formData.stageName}
                onChange={(e) => handleChange('stageName', e.target.value)}
                placeholder="e.g., VEXA, KRYPTON, LUNA_NOIR"
                className="w-full"
              />
            </div>

            {/* Sub-Genres */}
            <div>
              <label className="block text-sm font-bold text-acid-green mb-2">
                PRIMARY SUB-GENRES *
              </label>
              <input
                type="text"
                value={formData.subGenres}
                onChange={(e) => handleChange('subGenres', e.target.value)}
                placeholder="e.g., Melodic Techno, Deep House, EBM"
                className="w-full"
              />
            </div>

            {/* Mixcloud/SoundCloud */}
            <div>
              <label className="block text-sm font-bold text-acid-green mb-2">
                MIXCLOUD / SOUNDCLOUD LINK *
              </label>
              <input
                type="url"
                value={formData.soundcloudLink}
                onChange={(e) => handleChange('soundcloudLink', e.target.value)}
                placeholder="https://soundcloud.com/yourprofile or https://mixcloud.com/yourprofile"
                className="w-full"
              />
            </div>

            {/* Technical Rider */}
            <div>
              <label className="block text-sm font-bold text-acid-green mb-2">
                TECHNICAL RIDER REQUIREMENTS
              </label>
              <textarea
                value={formData.technicalRider}
                onChange={(e) => handleChange('technicalRider', e.target.value)}
                placeholder="Equipment, setup preferences, sound system requirements, technical specifications..."
                className="w-full min-h-32 resize-none"
              />
            </div>

            {/* Minimum Fee */}
            <div>
              <label className="block text-sm font-bold text-acid-green mb-2">
                MINIMUM BOOKING FEE (₹) *
              </label>
              <input
                type="number"
                value={formData.minFee}
                onChange={(e) => handleChange('minFee', e.target.value)}
                placeholder="e.g., 35000"
                className="w-full"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`w-full py-3 px-4 font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${
                isFormValid
                  ? 'bg-acid-green text-black hover:shadow-neon-green-lg'
                  : 'bg-industrial-gray-light text-gray-500 cursor-not-allowed'
              } ${
                isSubmitting ? 'opacity-75' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit Your Kit
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 text-center">
              By submitting, you agree to our roster terms and commission structure. We'll review your profile and get back within 48 hours.
            </p>
          </form>
        ) : (
          /* Success State */
          <div className="bg-industrial-gray border-2 border-acid-green rounded-lg p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-acid-green text-black rounded-full mb-6">
              <Check size={32} className="font-bold" />
            </div>
            <h2 className="text-3xl font-bold text-acid-green mb-3">WELCOME TO SUB-KULTR</h2>
            <p className="text-gray-300 text-lg mb-6">
              Your submission has been received. Our team will review your profile and reach out within 48 hours to discuss premium booking opportunities, rates, and exclusive events.
            </p>
            <p className="text-gray-400 text-sm">
              In the meantime, follow us on social media for upcoming underground events and artist announcements.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
