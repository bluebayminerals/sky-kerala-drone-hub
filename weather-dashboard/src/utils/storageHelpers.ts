import { SavedLocation, UnitPreferences } from '../types';

const LOCATIONS_KEY = 'weather_saved_locations';
const UNITS_KEY = 'weather_unit_preferences';
const THEME_KEY = 'weather_theme';

export const savedLocationsStorage = {
  get: (): SavedLocation[] => {
    try {
      const data = localStorage.getItem(LOCATIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  save: (locations: SavedLocation[]): void => {
    localStorage.setItem(LOCATIONS_KEY, JSON.stringify(locations));
  },
  add: (location: SavedLocation): void => {
    const locations = savedLocationsStorage.get();
    if (!locations.find((l) => l.id === location.id)) {
      locations.push(location);
      savedLocationsStorage.save(locations);
    }
  },
  remove: (id: string): void => {
    const locations = savedLocationsStorage.get();
    savedLocationsStorage.save(locations.filter((l) => l.id !== id));
  },
};

export const unitPreferencesStorage = {
  get: (): UnitPreferences => {
    try {
      const data = localStorage.getItem(UNITS_KEY);
      return data ? JSON.parse(data) : { temperature: 'C', speed: 'ms', pressure: 'mb' };
    } catch {
      return { temperature: 'C', speed: 'ms', pressure: 'mb' };
    }
  },
  save: (preferences: UnitPreferences): void => {
    localStorage.setItem(UNITS_KEY, JSON.stringify(preferences));
  },
};

export const themeStorage = {
  get: (): 'light' | 'dark' => {
    try {
      const data = localStorage.getItem(THEME_KEY);
      return (data as 'light' | 'dark') || 'light';
    } catch {
      return 'light';
    }
  },
  save: (theme: 'light' | 'dark'): void => {
    localStorage.setItem(THEME_KEY, theme);
  },
};
