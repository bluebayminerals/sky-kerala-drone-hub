import React, { useState, useMemo } from 'react';
import { Search, Play, Pause, Heart } from 'lucide-react';
import { artists, genres, durations } from '../data/mockData';
import { BookingModal } from './modals/BookingModal';

export const ArtistRoster: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedDurations, setSelectedDurations] = useState<string[]>([]);
  const [playingArtistId, setPlayingArtistId] = useState<string | null>(null);
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [likedArtists, setLikedArtists] = useState<Set<string>>(new Set());

  const filteredArtists = useMemo(() => {
    return artists.filter((artist) => {
      const matchesSearch =
        artist.stageName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artist.soundSignature.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesGenres =
        selectedGenres.length === 0 ||
        selectedGenres.some((genre) => artist.subGenres.includes(genre));

      const matchesDuration =
        selectedDurations.length === 0 ||
        selectedDurations.includes(artist.setDuration);

      return matchesSearch && matchesGenres && matchesDuration;
    });
  }, [searchTerm, selectedGenres, selectedDurations]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const toggleDuration = (duration: string) => {
    setSelectedDurations((prev) =>
      prev.includes(duration) ? prev.filter((d) => d !== duration) : [...prev, duration]
    );
  };

  const openBookingModal = (artistId: string) => {
    setSelectedArtistId(artistId);
    setBookingModalOpen(true);
  };

  const toggleLike = (artistId: string) => {
    setLikedArtists((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(artistId)) {
        newSet.delete(artistId);
      } else {
        newSet.add(artistId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            <span className="text-acid-green">HIGHEST-PAID</span> <span className="text-white">TECHNO DJs</span>
          </h1>
          <p className="text-gray-400 text-lg">Join our team. Premium artists. Premium spaces. Premium experience.</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-acid-green" size={20} />
            <input
              type="text"
              placeholder="Search artists, sounds, vibes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-industrial-gray border border-industrial-gray-light rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-acid-green"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-12">
          {/* Genre Filter */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-acid-green mb-3">GENRES</h3>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedGenres.includes(genre)
                      ? 'bg-acid-green text-black'
                      : 'bg-industrial-gray-light text-white hover:border-acid-green border border-transparent'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>

          {/* Duration Filter */}
          <div>
            <h3 className="text-sm font-bold text-acid-green mb-3">SET DURATION</h3>
            <div className="flex flex-wrap gap-2">
              {durations.map((duration) => (
                <button
                  key={duration}
                  onClick={() => toggleDuration(duration)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedDurations.includes(duration)
                      ? 'bg-acid-green text-black'
                      : 'bg-industrial-gray-light text-white hover:border-acid-green border border-transparent'
                  }`}
                >
                  {duration}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Artist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtists.map((artist) => (
            <div
              key={artist.id}
              className="group bg-industrial-gray border border-industrial-gray-light rounded-lg overflow-hidden hover:border-acid-green transition-all hover:shadow-neon-green"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden bg-industrial-gray-light">
                <img
                  src={artist.profileImage}
                  alt={artist.stageName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-0 transition-opacity" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-acid-green mb-1">{artist.stageName}</h3>
                <p className="text-sm text-gray-400 mb-3 flex flex-wrap gap-1">
                  {artist.subGenres.map((genre, i) => (
                    <span key={genre}>
                      {genre}{i < artist.subGenres.length - 1 ? ',' : ''}
                    </span>
                  ))}
                </p>

                <p className="text-sm text-gray-300 mb-4 leading-relaxed">{artist.soundSignature}</p>

                {/* Audio Player */}
                <div className="mb-4 p-3 bg-black rounded-lg border border-industrial-gray-light">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() =>
                        setPlayingArtistId(playingArtistId === artist.id ? null : artist.id)
                      }
                      className="bg-acid-green text-black p-2 rounded hover:shadow-neon-green"
                    >
                      {playingArtistId === artist.id ? (
                        <Pause size={16} />
                      ) : (
                        <Play size={16} />
                      )}
                    </button>
                    <span className="text-xs text-gray-400">Preview Track</span>
                    <span className="text-xs text-acid-green font-mono">3:45</span>
                  </div>
                  {playingArtistId === artist.id && (
                    <div className="mt-2 w-full h-1 bg-industrial-gray-light rounded-full overflow-hidden">
                      <div className="h-full w-1/3 bg-acid-green" />
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="mb-4 text-sm text-gray-400 space-y-1">
                  <p>Set Duration: <span className="text-acid-green">{artist.setDuration}</span></p>
                  <p>Min. Fee: <span className="text-acid-green">₹{artist.minFee.toLocaleString()}</span></p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button
                    onClick={() => openBookingModal(artist.id)}
                    className="flex-1 px-4 py-2 bg-acid-green text-black font-bold rounded hover:shadow-neon-green-lg transition-all"
                  >
                    Request Availability
                  </button>
                  <button
                    onClick={() => toggleLike(artist.id)}
                    className={`px-4 py-2 rounded border transition-all ${
                      likedArtists.has(artist.id)
                        ? 'bg-acid-green border-acid-green text-black'
                        : 'border-industrial-gray-light hover:border-acid-green'
                    }`}
                  >
                    <Heart
                      size={18}
                      fill={likedArtists.has(artist.id) ? 'currentColor' : 'none'}
                    />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredArtists.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No artists match your criteria. Adjust your filters and try again.</p>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {bookingModalOpen && selectedArtistId && (
        <BookingModal
          artistId={selectedArtistId}
          onClose={() => setBookingModalOpen(false)}
        />
      )}
    </div>
  );
};
