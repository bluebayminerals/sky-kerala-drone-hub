import React, { useState, useEffect } from 'react';
import { Plus, MapPin, Loader } from 'lucide-react';
import { SavedLocation } from '../types';
import { savedLocationsStorage } from '../utils/storageHelpers';
import { SearchCity } from './SearchCity';

interface LocationManagerProps {
  onSelectLocation: (city: string) => void;
  isLoading: boolean;
}

export const LocationManager: React.FC<LocationManagerProps> = ({ onSelectLocation, isLoading }) => {
  const [locations, setLocations] = useState<SavedLocation[]>([]);

  useEffect(() => {
    setLocations(savedLocationsStorage.get());
  }, []);

  const addLocation = (city: string) => {
    const newLocation: SavedLocation = {
      id: Date.now().toString(),
      name: city,
      country: 'Unknown',
      lat: 0,
      lon: 0,
      addedAt: Date.now(),
    };
    savedLocationsStorage.add(newLocation);
    setLocations(savedLocationsStorage.get());
    onSelectLocation(city);
  };

  const removeLocation = (id: string) => {
    savedLocationsStorage.remove(id);
    setLocations(savedLocationsStorage.get());
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div>
        <h3 className="text-lg font-bold text-storm-gray mb-3">Add New Location</h3>
        <SearchCity onSelect={addLocation} isLoading={isLoading} />
      </div>

      {/* Saved Locations */}
      <div>
        <h3 className="text-lg font-bold text-storm-gray mb-3">Saved Locations</h3>
        {locations.length === 0 ? (
          <div className="weather-card text-center text-slate-500">
            <MapPin className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>No saved locations yet. Add one above!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {locations.map((location) => (
              <button
                key={location.id}
                onClick={() => onSelectLocation(location.name)}
                disabled={isLoading}
                className="weather-card text-left hover:border-sky-blue hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-storm-gray group-hover:text-sky-blue transition-colors">
                      {location.name}
                    </p>
                    <p className="text-sm text-slate-500">{location.country}</p>
                  </div>
                  {isLoading && <Loader className="w-5 h-5 text-sky-blue animate-spin" />}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
