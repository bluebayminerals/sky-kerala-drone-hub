import React, { useState } from 'react';
import { Loader, AlertCircle } from 'lucide-react';
import { Navigation } from './components/Navigation';
import { WeatherCard } from './components/WeatherCard';
import { SearchCity } from './components/SearchCity';
import { ForecastChart } from './components/ForecastChart';
import { LocationManager } from './components/LocationManager';
import { Settings } from './components/Settings';
import { useWeather } from './hooks/useWeather';
import { savedLocationsStorage } from './utils/storageHelpers';

function App() {
  const { currentWeather, forecast, loading, error, fetchWeather, fetchWeatherByCoords } = useWeather();
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [showSettings, setShowSettings] = useState(false);
  const [savedLocations, setSavedLocations] = useState(savedLocationsStorage.get());

  const handleSearch = (city: string) => {
    fetchWeather(city);
    setSavedLocations(savedLocationsStorage.get());
  };

  const handleAddLocation = (city: string) => {
    const newLocation = {
      id: Date.now().toString(),
      name: city,
      country: 'Unknown',
      lat: 0,
      lon: 0,
      addedAt: Date.now(),
    };
    savedLocationsStorage.add(newLocation);
    setSavedLocations(savedLocationsStorage.get());
    fetchWeather(city);
  };

  const handleRemoveLocation = (id: string) => {
    savedLocationsStorage.remove(id);
    setSavedLocations(savedLocationsStorage.get());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-light to-cloud-white">
      <Navigation
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
      />

      <Settings isOpen={showSettings} onClose={() => setShowSettings(false)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Tab */}
        {currentTab === 'dashboard' && (
          <div className="space-y-6">
            {loading && !currentWeather && (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader className="w-12 h-12 text-sky-blue animate-spin mb-4" />
                <p className="text-slate-600 font-medium">Loading weather data...</p>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0" size={20} />
                <div>
                  <p className="font-bold text-red-900">Error</p>
                  <p className="text-red-800">{error}</p>
                </div>
              </div>
            )}

            {currentWeather && (
              <>
                <WeatherCard data={currentWeather} units="C" />
                {forecast && <ForecastChart forecast={forecast} units="C" />}
              </>
            )}
          </div>
        )}

        {/* Search Tab */}
        {currentTab === 'search' && (
          <div className="max-w-2xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-storm-gray mb-2">Search Weather</h1>
              <p className="text-slate-600">Find weather information for any city in the world</p>
            </div>
            <div className="weather-card">
              <SearchCity onSelect={handleSearch} isLoading={loading} />
            </div>
          </div>
        )}

        {/* My Locations Tab */}
        {currentTab === 'locations' && (
          <div className="max-w-2xl">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-storm-gray mb-2">My Locations</h1>
              <p className="text-slate-600">Manage your saved locations and quick access</p>
            </div>
            <LocationManager onSelectLocation={handleAddLocation} isLoading={loading} />
          </div>
        )}

        {/* Forecast Tab */}
        {currentTab === 'forecast' && (
          <div>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-storm-gray mb-2">Extended Forecast</h1>
              <p className="text-slate-600">
                {currentWeather
                  ? `5-day forecast for ${currentWeather.name}, ${currentWeather.sys.country}`
                  : 'Select a location to view the forecast'}
              </p>
            </div>
            {forecast ? (
              <ForecastChart forecast={forecast} units="C" />
            ) : (
              <div className="weather-card text-center text-slate-500 py-12">
                <AlertCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>No forecast data available. Search for a location first.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
