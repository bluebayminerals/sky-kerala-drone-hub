import React, { useState } from 'react';
import { X, Calendar, MapPin, Send } from 'lucide-react';
import { artists } from '../../data/mockData';
import { BookingFormData } from '../../types';

interface BookingModalProps {
  artistId: string;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ artistId, onClose }) => {
  const artist = artists.find((a) => a.id === artistId);
  const [formData, setFormData] = useState<BookingFormData>({
    eventName: '',
    date: '',
    venueType: 'Warehouse',
    proposedFee: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!artist) return null;

  const handleChange = (field: keyof BookingFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const isFormValid =
    formData.eventName.trim() !== '' &&
    formData.date !== '' &&
    formData.proposedFee.trim() !== '';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-industrial-gray border border-industrial-gray-light rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-industrial-gray border-b border-industrial-gray-light px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Request Availability</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-acid-green transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!submitted ? (
            <>
              {/* Artist Info */}
              <div className="mb-6 pb-6 border-b border-industrial-gray-light">
                <h3 className="text-lg font-bold text-acid-green mb-2">{artist.stageName}</h3>
                <p className="text-sm text-gray-400">
                  Min. Fee: <span className="text-acid-green font-mono">₹{artist.minFee.toLocaleString()}</span>
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Event Name */}
                <div>
                  <label className="block text-sm font-bold text-acid-green mb-2">
                    Event Name *
                  </label>
                  <input
                    type="text"
                    value={formData.eventName}
                    onChange={(e) => handleChange('eventName', e.target.value)}
                    placeholder="e.g., Sunset Villa Session"
                    className="w-full"
                  />
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-bold text-acid-green mb-2 flex items-center gap-2">
                    <Calendar size={16} />
                    Event Date *
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleChange('date', e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Venue Type */}
                <div>
                  <label className="block text-sm font-bold text-acid-green mb-2 flex items-center gap-2">
                    <MapPin size={16} />
                    Venue Type
                  </label>
                  <select
                    value={formData.venueType}
                    onChange={(e) => handleChange('venueType', e.target.value)}
                    className="w-full"
                  >
                    <option>Warehouse</option>
                    <option>Secret Villa</option>
                    <option>Private Club</option>
                    <option>Open Air</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Proposed Fee */}
                <div>
                  <label className="block text-sm font-bold text-acid-green mb-2">
                    Proposed Fee (₹) *
                  </label>
                  <input
                    type="number"
                    value={formData.proposedFee}
                    onChange={(e) => handleChange('proposedFee', e.target.value)}
                    placeholder={`Min: ₹${artist.minFee.toLocaleString()}`}
                    className="w-full"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Minimum fee: ₹{artist.minFee.toLocaleString()}
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`w-full py-3 font-bold rounded-lg flex items-center justify-center gap-2 transition-all mt-6 ${
                    isFormValid
                      ? 'bg-acid-green text-black hover:shadow-neon-green-lg'
                      : 'bg-industrial-gray-light text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Send size={18} />
                  Send Request
                </button>
              </form>
            </>
          ) : (
            /* Success */
            <div className="text-center py-6">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-acid-green text-black rounded-full mb-4">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-acid-green mb-2">Request Sent!</h3>
              <p className="text-gray-400">
                {artist.stageName} has been notified. Expect a response within 24 hours.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
