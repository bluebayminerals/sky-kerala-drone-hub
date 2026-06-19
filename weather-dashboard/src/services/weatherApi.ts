import axios from 'axios';
import { WeatherData, ForecastData } from '../types';

const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY || 'demo';

const weatherClient = axios.create({
  baseURL: API_BASE_URL,
  params: {
    appid: API_KEY,
  },
});

export const weatherApi = {
  // Get current weather by city name
  getCurrentWeatherByCity: async (city: string, units: string = 'metric'): Promise<WeatherData> => {
    const response = await weatherClient.get('/weather', {
      params: {
        q: city,
        units,
      },
    });
    return response.data;
  },

  // Get current weather by coordinates
  getCurrentWeatherByCoords: async (
    lat: number,
    lon: number,
    units: string = 'metric'
  ): Promise<WeatherData> => {
    const response = await weatherClient.get('/weather', {
      params: {
        lat,
        lon,
        units,
      },
    });
    return response.data;
  },

  // Get 5-day forecast by city name
  getForecastByCity: async (city: string, units: string = 'metric'): Promise<ForecastData> => {
    const response = await weatherClient.get('/forecast', {
      params: {
        q: city,
        units,
      },
    });
    return response.data;
  },

  // Get 5-day forecast by coordinates
  getForecastByCoords: async (
    lat: number,
    lon: number,
    units: string = 'metric'
  ): Promise<ForecastData> => {
    const response = await weatherClient.get('/forecast', {
      params: {
        lat,
        lon,
        units,
      },
    });
    return response.data;
  },

  // Search cities (mock implementation for autocomplete)
  searchCities: async (query: string): Promise<Array<{ name: string; country: string; lat: number; lon: number }>> => {
    // Mock data for demo - in production, use OpenWeatherMap Geo API
    const mockCities = [
      { name: 'London', country: 'GB', lat: 51.5074, lon: -0.1278 },
      { name: 'New York', country: 'US', lat: 40.7128, lon: -74.006 },
      { name: 'Tokyo', country: 'JP', lat: 35.6762, lon: 139.6503 },
      { name: 'Paris', country: 'FR', lat: 48.8566, lon: 2.3522 },
      { name: 'Sydney', country: 'AU', lat: -33.8688, lon: 151.2093 },
      { name: 'Dubai', country: 'AE', lat: 25.2048, lon: 55.2708 },
      { name: 'Singapore', country: 'SG', lat: 1.3521, lon: 103.8198 },
      { name: 'Hong Kong', country: 'HK', lat: 22.3193, lon: 114.1694 },
      { name: 'Bangkok', country: 'TH', lat: 13.7563, lon: 100.5018 },
      { name: 'Mumbai', country: 'IN', lat: 19.0760, lon: 72.8777 },
      { name: 'Kochi', country: 'IN', lat: 9.9312, lon: 76.2673 },
      { name: 'Delhi', country: 'IN', lat: 28.7041, lon: 77.1025 },
      { name: 'Toronto', country: 'CA', lat: 43.6532, lon: -79.3832 },
      { name: 'Berlin', country: 'DE', lat: 52.52, lon: 13.405 },
      { name: 'Madrid', country: 'ES', lat: 40.4168, lon: -3.7038 },
    ];

    return mockCities.filter(
      (city) =>
        city.name.toLowerCase().includes(query.toLowerCase()) ||
        city.country.toLowerCase().includes(query.toLowerCase())
    );
  },
};
