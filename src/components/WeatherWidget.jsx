import React from 'react';
import { MapPin, Loader, Droplets, Wind, AlertCircle } from 'lucide-react';
import useWeather from '../hooks/useWeather';

const WeatherWidget = ({ city = 'Surakarta' }) => {
  const { weather, loading, error } = useWeather(city);

  // Loading State
  if (loading) {
    return (
      <div className="bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-center h-32">
          <Loader className="animate-spin mr-2" size={24} />
          <span className="font-medium">Loading weather...</span>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-800 dark:text-red-200 p-6 rounded-lg">
        <div className="flex items-center">
          <AlertCircle className="mr-2" size={24} />
          <div>
            <p className="font-semibold">Weather Unavailable</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Weather Icon Component
  const getWeatherIcon = (condition) => {
    const iconMap = {
      'Sunny': '☀️',
      'Clear': '🌤️',
      'Cloudy': '☁️',
      'Partly Cloudy': '⛅',
      'Rainy': '🌧️',
      'Stormy': '⛈️',
      'Snowy': '❄️'
    };
    return iconMap[condition] || '🌤️';
  };

  return (
    <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <MapPin size={20} className="mr-2" />
          <span className="text-lg font-semibold">{weather?.city}</span>
        </div>
        <div className="text-4xl">
          {getWeatherIcon(weather?.condition)}
        </div>
      </div>

      {/* Temperature */}
      <div className="mb-4">
        <div className="text-6xl font-bold mb-1">
          {weather?.temp}°
        </div>
        <div className="text-xl opacity-90 font-medium">
          {weather?.condition}
        </div>
      </div>

      {/* Details */}
      <div className="pt-4 border-t border-white/20 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Droplets size={18} className="mr-2 opacity-80" />
            <span className="text-sm font-medium">Humidity</span>
          </div>
          <span className="text-sm font-semibold">{weather?.humidity}%</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Wind size={18} className="mr-2 opacity-80" />
            <span className="text-sm font-medium">Wind Speed</span>
          </div>
          <span className="text-sm font-semibold">{weather?.wind} km/h</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-white/20 text-xs opacity-75 text-center">
        Real-time weather data
      </div>
    </div>
  );
};

export default WeatherWidget;