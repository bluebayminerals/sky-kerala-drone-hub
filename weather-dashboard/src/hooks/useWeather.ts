import { useState, useEffect, useCallback } from 'react';
import { WeatherData, ForecastData } from '../types';
import { weatherApi } from '../services/weatherApi';

export const useWeather = () => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [units, setUnits] = useState<'metric' | 'imperial'>('metric');

  const fetchWeather = useCallback(
    async (city: string) => {
      setLoading(true);
      setError(null);
      try {
        const weather = await weatherApi.getCurrentWeatherByCity(city, units === 'metric' ? 'metric' : 'imperial');
        const forecast = await weatherApi.getForecastByCity(city, units === 'metric' ? 'metric' : 'imperial');
        setCurrentWeather(weather);
        setForecast(forecast);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch weather data');
        setCurrentWeather(null);
        setForecast(null);
      } finally {
        setLoading(false);
      }
    },
    [units]
  );

  const fetchWeatherByCoords = useCallback(
    async (lat: number, lon: number) => {
      setLoading(true);
      setError(null);
      try {
        const weather = await weatherApi.getCurrentWeatherByCoords(
          lat,
          lon,
          units === 'metric' ? 'metric' : 'imperial'
        );
        const forecast = await weatherApi.getForecastByCoords(
          lat,
          lon,
          units === 'metric' ? 'metric' : 'imperial'
        );
        setCurrentWeather(weather);
        setForecast(forecast);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch weather data');
        setCurrentWeather(null);
        setForecast(null);
      } finally {
        setLoading(false);
      }
    },
    [units]
  );

  // Get user's geolocation on mount
  useEffect(() => {
    if (navigator.geolocation && !currentWeather) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        () => {
          // Default to London if geolocation fails
          fetchWeather('London');
        }
      );
    }
  }, []);

  return {
    currentWeather,
    forecast,
    loading,
    error,
    units,
    setUnits,
    fetchWeather,
    fetchWeatherByCoords,
  };
};
