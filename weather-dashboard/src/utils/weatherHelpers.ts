export const getWeatherIcon = (iconCode: string): string => {
  const baseUrl = 'https://openweathermap.org/img/wn';
  return `${baseUrl}/${iconCode}@4x.png`;
};

export const getWeatherGradient = (weatherMain: string): string => {
  const mainWeather = weatherMain.toLowerCase();
  const gradients: { [key: string]: string } = {
    clear: 'gradient-day',
    clouds: 'bg-gradient-to-br from-slate-300 to-slate-400',
    rain: 'bg-gradient-to-br from-slate-500 to-slate-700',
    drizzle: 'bg-gradient-to-br from-slate-400 to-slate-600',
    thunderstorm: 'bg-gradient-to-br from-purple-900 to-slate-900',
    snow: 'bg-gradient-to-br from-blue-100 to-blue-200',
    mist: 'bg-gradient-to-br from-slate-300 to-slate-500',
    smoke: 'bg-gradient-to-br from-amber-500 to-orange-600',
    haze: 'bg-gradient-to-br from-amber-300 to-orange-400',
    dust: 'bg-gradient-to-br from-amber-400 to-orange-500',
    fog: 'bg-gradient-to-br from-slate-300 to-slate-500',
    sand: 'bg-gradient-to-br from-amber-500 to-yellow-500',
    ash: 'bg-gradient-to-br from-slate-600 to-slate-800',
    squall: 'bg-gradient-to-br from-slate-700 to-slate-900',
    tornado: 'bg-gradient-to-br from-slate-800 to-black',
  };
  return gradients[mainWeather] || 'gradient-day';
};

export const convertTemperature = (temp: number, from: 'C' | 'F' | 'K', to: 'C' | 'F' | 'K'): number => {
  let celsius = temp;
  
  // Convert to Celsius first
  if (from === 'F') {
    celsius = (temp - 32) * 5/9;
  } else if (from === 'K') {
    celsius = temp - 273.15;
  }
  
  // Convert from Celsius to target unit
  if (to === 'F') {
    return celsius * 9/5 + 32;
  } else if (to === 'K') {
    return celsius + 273.15;
  }
  
  return celsius;
};

export const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

export const formatDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
};

export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

export const getUVIndexCategory = (uvi: number): string => {
  if (uvi < 3) return 'Low';
  if (uvi < 6) return 'Moderate';
  if (uvi < 8) return 'High';
  if (uvi < 11) return 'Very High';
  return 'Extreme';
};
