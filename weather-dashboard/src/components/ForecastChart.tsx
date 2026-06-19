import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ForecastData } from '../types';
import { formatDate } from '../utils/weatherHelpers';

interface ForecastChartProps {
  forecast: ForecastData;
  units: 'C' | 'F';
}

export const ForecastChart: React.FC<ForecastChartProps> = ({ forecast, units }) => {
  // Group forecast data by day and get daily highs/lows
  const dailyData = forecast.list
    .filter((item) => item.dt_txt.includes('12:00:00'))
    .map((item) => ({
      date: formatDate(item.dt),
      temp: Math.round(item.main.temp),
      humidity: item.main.humidity,
      windSpeed: item.wind.speed,
      description: item.weather[0].main,
    }));

  // Hourly data (next 24 hours)
  const hourlyData = forecast.list.slice(0, 8).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }),
    temp: Math.round(item.main.temp),
    humidity: item.main.humidity,
  }));

  return (
    <div className="space-y-8">
      {/* 5-Day Temperature Forecast */}
      <div className="weather-card">
        <h3 className="text-lg font-bold text-storm-gray mb-4">5-Day Temperature Forecast</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
              }}
              formatter={(value: any) => [`${value}°${units}`, 'Temperature']}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#0284c7"
              strokeWidth={3}
              dot={{ fill: '#0284c7', r: 5 }}
              activeDot={{ r: 7 }}
              name="Temperature"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Humidity & Wind Speed */}
      <div className="weather-card">
        <h3 className="text-lg font-bold text-storm-gray mb-4">5-Day Humidity & Wind</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
              }}
            />
            <Legend />
            <Bar dataKey="humidity" fill="#06b6d4" name="Humidity (%)" radius={[8, 8, 0, 0]} />
            <Bar dataKey="windSpeed" fill="#f59e0b" name="Wind Speed (m/s)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 24-Hour Temperature Trend */}
      <div className="weather-card">
        <h3 className="text-lg font-bold text-storm-gray mb-4">Next 24 Hours</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={hourlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="time" stroke="#64748b" />
            <YAxis stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
              }}
              formatter={(value: any) => [`${value}°${units}`, 'Temperature']}
            />
            <Line
              type="monotone"
              dataKey="temp"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ fill: '#8b5cf6', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
