import React from 'react';
import { Cloud, Droplets, Wind, Eye, Gauge } from 'lucide-react';
import { WeatherData } from '../types';
import { getWeatherIcon, getWeatherGradient, getWindDirection } from '../utils/weatherHelpers';

interface WeatherCardProps {
  data: WeatherData;
  units: 'C' | 'F';
  onRemove?: () => void;
  clickable?: boolean;
  onClick?: () => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  data,
  units,
  onRemove,
  clickable = false,
  onClick,
}) => {
  const tempUnit = units === 'C' ? '°C' : '°F';
  const gradient = getWeatherGradient(data.weather[0].main);
  const windDir = getWindDirection(data.wind.deg);

  return (
    <div
      className={`weather-card relative overflow-hidden ${
        clickable ? 'cursor-pointer hover:shadow-xl' : ''
      }`}
      onClick={onClick}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 ${gradient} opacity-10 -z-10 rounded-2xl`} />

      {/* Header with City and Remove Button */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-storm-gray">
            {data.name}, {data.sys.country}
          </h2>
          <p className="text-sm text-slate-500 capitalize">{data.weather[0].description}</p>
        </div>
        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 text-sm font-medium transition-colors"
          >
            Remove
          </button>
        )}
      </div>

      {/* Temperature and Icon */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-5xl font-bold text-sky-blue">
            {Math.round(data.main.temp)}
            <span className="text-3xl">{tempUnit}</span>
          </div>
          <p className="text-slate-600 mt-1">
            Feels like {Math.round(data.main.feels_like)}{tempUnit}
          </p>
        </div>
        <img
          src={getWeatherIcon(data.weather[0].icon)}
          alt={data.weather[0].main}
          className="w-24 h-24"
        />
      </div>

      {/* Temperature Range */}
      <div className="mb-6 pb-6 border-b border-slate-200">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">
            High: <span className="font-bold text-storm-gray">{Math.round(data.main.temp_max)}{tempUnit}</span>
          </span>
          <span className="text-slate-600">
            Low: <span className="font-bold text-storm-gray">{Math.round(data.main.temp_min)}{tempUnit}</span>
          </span>
        </div>
      </div>

      {/* Detailed Metrics Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Humidity */}
        <div className="bg-sky-light rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Droplets size={16} className="text-sky-blue" />
            <span className="text-xs font-medium text-slate-600">Humidity</span>
          </div>
          <p className="text-lg font-bold text-storm-gray">{data.main.humidity}%</p>
        </div>

        {/* Wind Speed */}
        <div className="bg-sky-light rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Wind size={16} className="text-sky-blue" />
            <span className="text-xs font-medium text-slate-600">Wind</span>
          </div>
          <p className="text-lg font-bold text-storm-gray">{data.wind.speed} m/s</p>
          <p className="text-xs text-slate-600">{windDir}</p>
        </div>

        {/* Visibility */}
        <div className="bg-sky-light rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Eye size={16} className="text-sky-blue" />
            <span className="text-xs font-medium text-slate-600">Visibility</span>
          </div>
          <p className="text-lg font-bold text-storm-gray">{(data.visibility / 1000).toFixed(1)} km</p>
        </div>

        {/* Pressure */}
        <div className="bg-sky-light rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Gauge size={16} className="text-sky-blue" />
            <span className="text-xs font-medium text-slate-600">Pressure</span>
          </div>
          <p className="text-lg font-bold text-storm-gray">{data.main.pressure} mb</p>
        </div>

        {/* Cloud Coverage */}
        <div className="bg-sky-light rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Cloud size={16} className="text-sky-blue" />
            <span className="text-xs font-medium text-slate-600">Clouds</span>
          </div>
          <p className="text-lg font-bold text-storm-gray">{data.clouds.all}%</p>
        </div>

        {/* Sunrise/Sunset */}
        <div className="bg-sky-light rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Sun size={16} className="text-sky-blue" />
            <span className="text-xs font-medium text-slate-600">Sunrise/Sunset</span>
          </div>
          <p className="text-xs font-bold text-storm-gray">
            {new Date(data.sys.sunrise * 1000).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })} / {new Date(data.sys.sunset * 1000).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

// Icon for sunrise/sunset
const Sun = ({ size, className }: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
);
