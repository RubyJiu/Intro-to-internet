import { useState, useEffect } from 'react';

const useWeather = (city = 'Surakarta') => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true); // Set initial loading to true
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);

      try {
        const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

        if (!API_KEY) {
          throw new Error('OpenWeather API key not found. Please add it to your .env file.');
        }

        // Real API call to OpenWeather
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch weather data');
        }

        const data = await response.json();
        
        setWeather({
          temp: Math.round(data.main.temp),
          condition: data.weather[0].main,
          city: data.name,
          humidity: data.main.humidity,
          wind: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
          icon: data.weather[0].icon
        });

      } catch (err) {
        console.error('Weather API Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return { weather, loading, error };
};

export default useWeather;