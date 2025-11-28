import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Cloud,
  Sun,
  Moon,
  Droplets,
  Wind,
  Shirt,
  MapPin,
  ThermometerSun,
  CloudRain,
  Loader,
  Sparkles,
  ArrowLeft,
} from "lucide-react";

export default function WeatherWearApp() {
  const [darkMode, setDarkMode] = useState(false);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [outfitRecommendation, setOutfitRecommendation] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const GEMINI_API_KEY = "AIzaSyAarODVkPdc1PbAiqKtKmp33H89U1oX8RE"; // Ganti dengan API key Anda
  const OPENWEATHER_API_KEY = "70138a1007ee5fe086070f5cfc222de8"; // Ganti dengan API key Anda

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setLoading(true);
    setError("");
    setWeatherData(null);
    setOutfitRecommendation(null);

    try {
      // Fetch weather data from OpenWeather API
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${OPENWEATHER_API_KEY}`
      );

      if (!weatherResponse.ok) {
        throw new Error("City not found. Please check the city name and try again.");
      }

      const weather = await weatherResponse.json();
      setWeatherData(weather);

      // Prepare prompt for Gemini
      const prompt = `Create outfit recommendations based on the following weather conditions:

City: ${weather.name}
Temperature: ${weather.main.temp}°C
Weather: ${weather.weather[0].main} (${weather.weather[0].description})
Humidity: ${weather.main.humidity}%
Wind: ${weather.wind.speed} m/s

Provide the recommendations in the following format:
1. Outfit Recommendations (3-4 items)
2. Items to Bring (2-3 items)

Answer in English with a casual and friendly tone.`;

      // Call Gemini API
      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const geminiData = await geminiResponse.json();
      const recommendation = geminiData.candidates[0].content.parts[0].text;

      setOutfitRecommendation(recommendation);
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (main) => {
    switch (main?.toLowerCase()) {
      case "clear":
        return <Sun className="w-20 h-20 text-yellow-400" />;
      case "clouds":
        return <Cloud className="w-20 h-20 text-gray-400" />;
      case "rain":
      case "drizzle":
        return <CloudRain className="w-20 h-20 text-blue-400" />;
      default:
        return <Cloud className="w-20 h-20 text-gray-400" />;
    }
  };

  const sanitizeAndRenderText = (text) => {
    // Split by newlines to preserve paragraph structure
    const lines = text.split('\n');
    
    return lines.map((line, lineIndex) => {
      if (!line.trim()) {
        return <br key={lineIndex} />;
      }

      // Process bold text (**text**)
      const parts = [];
      let lastIndex = 0;
      const boldRegex = /\*\*(.*?)\*\*/g;
      let match;

      while ((match = boldRegex.exec(line)) !== null) {
        // Add text before bold
        if (match.index > lastIndex) {
          parts.push(line.substring(lastIndex, match.index));
        }
        // Add bold text
        parts.push(<strong key={`${lineIndex}-${match.index}`}>{match[1]}</strong>);
        lastIndex = match.index + match[0].length;
      }
      
      // Add remaining text
      if (lastIndex < line.length) {
        parts.push(line.substring(lastIndex));
      }

      return (
        <div key={lineIndex} className="mb-2">
          {parts.length > 0 ? parts : line}
        </div>
      );
    });
  };

  const resetApp = () => {
    setCity("");
    setWeatherData(null);
    setOutfitRecommendation(null);
    setError("");
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900 text-gray-900 dark:text-white min-h-screen">
        {/* Navigation */}
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Cloud className="w-8 h-8 text-purple-700 dark:text-purple-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-purple-900 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
              WeatherWear
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 px-4 py-2 text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
            {weatherData && (
              <button
                onClick={resetApp}
                className="flex items-center space-x-2 px-4 py-2 text-purple-700 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Search Again</span>
              </button>
            )}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/30 hover:bg-purple-200 dark:hover:bg-purple-800/50 transition-colors"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-purple-700" />
              )}
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <section className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Search Box */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 mb-8">
              <h2 className="text-3xl font-bold mb-6 text-center">
                {weatherData ? "Search Results" : "Check Weather & Outfit"}
              </h2>

              {!weatherData && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && fetchWeather()}
                      placeholder="Input city name, e.g., London"
                      className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-purple-200 dark:border-purple-700 bg-white dark:bg-gray-700 focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none text-lg"
                    />
                  </div>

                  <button
                    onClick={fetchWeather}
                    disabled={loading}
                    className="px-8 py-4 bg-gradient-to-r from-purple-700 to-purple-900 dark:from-purple-600 dark:to-purple-800 text-white rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {loading ? (
                      <>
                        <Loader className="w-5 h-5 animate-spin" />
                        <span>Loading...</span>
                      </>
                    ) : (
                      <>
                        <span>Check Now</span>
                        <Sparkles className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              )}

              {error && (
                <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg text-red-700 dark:text-red-300 text-center">
                  {error}
                </div>
              )}
            </div>

            {/* Weather Display */}
            {weatherData && (
              <div className="grid md:grid-cols-2 gap-8">
                {/* Weather Info Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
                  <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                    <Cloud className="w-6 h-6 text-purple-700 dark:text-purple-400" />
                    <span>Today's Weather</span>
                  </h3>

                  <div className="text-center mb-6">
                    <h4 className="text-3xl font-bold mb-4">
                      {weatherData.name}, {weatherData.sys.country}
                    </h4>
                    <div className="flex justify-center mb-4">
                      {getWeatherIcon(weatherData.weather[0].main)}
                    </div>
                    <div className="text-6xl font-bold mb-2">
                      {Math.round(weatherData.main.temp)}°C
                    </div>
                    <div className="text-xl text-gray-600 dark:text-gray-400 capitalize">
                      {weatherData.weather[0].description}
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-6">
                    <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <ThermometerSun className="w-5 h-5 text-orange-500" />
                        <span className="text-gray-600 dark:text-gray-400">
                          Feels Like
                        </span>
                      </div>
                      <span className="font-semibold text-lg">
                        {Math.round(weatherData.main.feels_like)}°C
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Droplets className="w-5 h-5 text-blue-500" />
                        <span className="text-gray-600 dark:text-gray-400">
                          Humidity
                        </span>
                      </div>
                      <span className="font-semibold text-lg">
                        {weatherData.main.humidity}%
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Wind className="w-5 h-5 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">
                          Wind Speed
                        </span>
                      </div>
                      <span className="font-semibold text-lg">
                        {weatherData.wind.speed} m/s
                      </span>
                    </div>
                  </div>
                </div>

                {/* Outfit Recommendation Card */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow">
                  <h3 className="text-2xl font-bold mb-6 flex items-center space-x-2">
                    <Shirt className="w-6 h-6 text-purple-700 dark:text-purple-400" />
                    <span>Outfit Recommendations</span>
                  </h3>

                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Loader className="w-12 h-12 animate-spin text-purple-700 dark:text-purple-400 mb-4" />
                      <p className="text-gray-600 dark:text-gray-400">
                        Loading outfit recommendations...
                      </p>
                    </div>
                  ) : outfitRecommendation ? (
                    <div className="prose dark:prose-invert max-w-none">
                      <div className="text-gray-700 dark:text-gray-300 leading-relaxed bg-purple-50 dark:bg-purple-900/20 p-6 rounded-xl">
                        {sanitizeAndRenderText(outfitRecommendation)}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                      <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Outfit recommendations will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Empty State */}
            {!weatherData && !loading && !error && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-12 text-center">
                <Cloud className="w-24 h-24 mx-auto mb-6 text-purple-300 dark:text-purple-700" />
                <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
                  Enter a city name to get outfit recommendations
                  based on today's weather
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Example: London, New York, Tokyo, Paris
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-purple-200 dark:border-purple-900 py-8 mt-12">
          <div className="container mx-auto px-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              © 2025 WeatherWear. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}