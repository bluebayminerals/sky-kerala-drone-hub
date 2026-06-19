# Weather Dashboard

A comprehensive, real-time weather dashboard application that fetches data from OpenWeatherMap API. Built with React, TypeScript, Tailwind CSS, and Recharts.

## Features

### Core Features
- 🌍 **Real-time Weather Data** - Current conditions from OpenWeatherMap API
- 🔍 **City Search** - Search and discover weather for any location globally
- 📍 **Geolocation** - Automatic local weather detection on first load
- 💾 **Saved Locations** - Persistent storage of favorite locations (localStorage)
- 📊 **Interactive Forecasts** - 5-day and 24-hour forecast visualizations
- 🌡️ **Comprehensive Metrics** - Temperature, humidity, wind, pressure, visibility, UV index
- ⚙️ **Unit Preferences** - Customizable temperature, speed, and pressure units
- 📱 **Responsive Design** - Mobile-optimized interface

### Views

1. **Dashboard** - Primary weather view with detailed metrics and charts
2. **Search** - Find weather for any city worldwide
3. **My Locations** - Manage saved locations with quick-access cards
4. **Forecast** - Extended weather predictions with interactive graphs

## Technical Stack

- **Frontend**: React 18.2 with Hooks
- **Language**: TypeScript 5.2
- **Styling**: Tailwind CSS 3.3
- **Charts**: Recharts 2.10 for data visualization
- **API**: Axios with OpenWeatherMap API
- **Icons**: Lucide React
- **Build**: Vite 5.0

## Project Structure

```
src/
├── components/
│   ├── Navigation.tsx          # Header with tab navigation
│   ├── WeatherCard.tsx         # Current weather display
│   ├── SearchCity.tsx          # City search with suggestions
│   ├── ForecastChart.tsx       # Recharts visualizations
│   ├── LocationManager.tsx     # Save/manage locations
│   └── Settings.tsx            # Unit preferences modal
├── hooks/
│   └── useWeather.ts           # Custom weather hook
├── services/
│   └── weatherApi.ts           # API integration layer
├── utils/
│   ├── weatherHelpers.ts       # Helper functions (icons, temp conversion, etc.)
│   └── storageHelpers.ts       # localStorage utilities
├── types.ts                     # TypeScript interfaces
├── App.tsx                      # Main app component
├── main.tsx                     # React entry point
└── index.css                    # Global styles
```

## Installation

1. **Install dependencies**
```bash
npm install
```

2. **Set up OpenWeatherMap API**
   - Get a free API key at [openweathermap.org](https://openweathermap.org/api)
   - Create a `.env.local` file:
   ```env
   REACT_APP_OPENWEATHER_API_KEY=your_api_key_here
   ```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

## API Integration

The application uses OpenWeatherMap's free tier with the following endpoints:

- `/weather` - Current weather data
- `/forecast` - 5-day forecast (3-hour intervals)

**Mock Data**: City search uses mock data for demo purposes. Replace `weatherApi.searchCities()` with the Geo API for production.

## Features in Detail

### Current Weather Card
- Temperature with "feels like" indicator
- 5-day temperature range
- Weather condition icon
- 6 detailed metrics:
  - Humidity with droplet icon
  - Wind speed with direction indicator
  - Visibility range
  - Atmospheric pressure
  - Cloud coverage percentage
  - Sunrise/Sunset times

### Forecast Charts
- **Line Chart**: 5-day temperature trend
- **Bar Chart**: Humidity and wind speed comparison
- **24-Hour Chart**: Next 24 hours temperature trend
- Interactive tooltips and legends

### Location Management
- Search from 15+ major cities
- Add unlimited saved locations
- One-click access to any saved location
- Remove locations individually

### Settings Panel
- Temperature: Celsius, Fahrenheit, Kelvin
- Wind Speed: m/s, km/h, mph
- Pressure: Millibars, Hectopascals
- Persistent storage of preferences

## Responsive Design

- Mobile-first approach
- Hamburger menu on small screens
- Touch-friendly buttons and inputs
- Optimized grid layouts
- Adaptive image sizing

## Color Scheme

- **Primary Blue**: `#0284c7` (Sky Blue)
- **Light Background**: `#e0f2fe` (Sky Light)
- **Dark Text**: `#1e293b` (Storm Gray)
- **Card Background**: `#f8fafc` (Cloud White)

## Error Handling

- API error messages displayed to users
- Fallback to London if geolocation fails
- Graceful loading states
- Validation for city search

## Browser Support

Modern browsers with:
- ES2020+ support
- Geolocation API
- localStorage API

## Environment Variables

```env
REACT_APP_OPENWEATHER_API_KEY=your_key_here
```

## Future Enhancements

- [ ] Weather alerts and notifications
- [ ] Air quality index (AQI)
- [ ] Severe weather warnings
- [ ] Historical weather data
- [ ] Weather maps and satellite view
- [ ] Share weather information
- [ ] Dark mode toggle
- [ ] Weather animations based on conditions

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For issues or feature requests, please create an issue in the repository.
