import React, { useState, useEffect } from 'react';
import { Search, MapPin, Loader } from 'lucide-react';
import { weatherApi } from '../services/weatherApi';

interface SearchCityProps {
  onSelect: (city: string) => void;
  isLoading: boolean;
}

export const SearchCity: React.FC<SearchCityProps> = ({ onSelect, isLoading }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    setSearchLoading(true);
    weatherApi
      .searchCities(query)
      .then((results) => {
        setSuggestions(results);
        setShowSuggestions(true);
      })
      .catch(() => setSuggestions([]))
      .finally(() => setSearchLoading(false));
  }, [query]);

  const handleSelect = (city: string) => {
    onSelect(city);
    setQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-3.5 text-slate-400" size={20} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim().length >= 2 && setShowSuggestions(true)}
          placeholder="Search for a city..."
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-blue"
          disabled={isLoading}
        />
        {searchLoading && <Loader className="absolute right-3 top-3.5 text-sky-blue animate-spin" size={20} />}
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
          {suggestions.map((city, index) => (
            <button
              key={index}
              onClick={() => handleSelect(city.name)}
              className="w-full text-left px-4 py-3 hover:bg-sky-light transition-colors flex items-center gap-2 border-b border-slate-100 last:border-b-0"
            >
              <MapPin size={16} className="text-sky-blue" />
              <div>
                <p className="font-medium text-storm-gray">{city.name}</p>
                <p className="text-xs text-slate-500">{city.country}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {query.trim().length >= 2 && !searchLoading && suggestions.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-lg shadow-lg p-4 text-center text-slate-500">
          No cities found
        </div>
      )}
    </div>
  );
};
