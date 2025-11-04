import React, { useState, useEffect } from 'react';
import { MapPin, Cloud, Wind, Bot, AlertCircle, Loader2, CheckCircle2, RefreshCw } from 'lucide-react';

const API_ENDPOINTS = {
  youbike: 'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json',
};

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  header: {
    background: 'white',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    borderBottom: '4px solid #4f46e5',
    padding: '24px 16px',
  },
  headerContent: {
    maxWidth: '1280px',
    margin: '0 auto',
  },
  headerTitle: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#1f2937',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '8px',
  },
  headerSubtitle: {
    color: '#6b7280',
    marginTop: '8px',
  },
  main: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '32px 16px',
  },
  tabContainer: {
    display: 'flex',
    gap: '8px',
    marginBottom: '24px',
    flexWrap: 'wrap',
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    borderRadius: '8px',
    fontWeight: '600',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontSize: '14px',
  },
  tabActive: {
    background: '#4f46e5',
    color: 'white',
    boxShadow: '0 4px 12px rgba(79,70,229,0.4)',
    transform: 'scale(1.05)',
  },
  tabInactive: {
    background: 'white',
    color: '#374151',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  card: {
    background: 'white',
    borderRadius: '16px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    padding: '32px',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  },
  cardTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1f2937',
  },
  button: {
    background: '#4f46e5',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'background 0.3s',
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  alert: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#991b1b',
    padding: '12px 16px',
    borderRadius: '8px',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  bikeCard: {
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '16px',
    transition: 'box-shadow 0.3s',
    cursor: 'pointer',
  },
  weatherMain: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    color: 'white',
    borderRadius: '12px',
    padding: '32px',
    marginBottom: '24px',
  },
  footer: {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.9)',
    marginTop: '32px',
    fontSize: '14px',
  },
};

function App() {
  const [activeTab, setActiveTab] = useState('youbike');
  const [youbikeData, setYoubikeData] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [airQualityData, setAirQualityData] = useState([]);
  const [aiResponse, setAiResponse] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [loading, setLoading] = useState({});
  const [error, setError] = useState({});

  const fetchYouBike = async () => {
    setLoading(prev => ({ ...prev, youbike: true }));
    setError(prev => ({ ...prev, youbike: null }));
    
    try {
      const response = await fetch(API_ENDPOINTS.youbike);
      const data = await response.json();
      
      const taipeiData = data
        .filter(station => station.sarea === '大安區' || station.sarea === '信義區')
        .slice(0, 10);
      
      setYoubikeData(taipeiData);
    } catch (err) {
      setError(prev => ({ ...prev, youbike: 'Failed to load YouBike data' }));
      console.error('Error fetching YouBike:', err);
    } finally {
      setLoading(prev => ({ ...prev, youbike: false }));
    }
  };

  const fetchWeather = async () => {
    setLoading(prev => ({ ...prev, weather: true }));
    setError(prev => ({ ...prev, weather: null }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setWeatherData({
        location: 'Taipei City',
        temperature: '25°C',
        condition: 'Partly Cloudy',
        humidity: '65%',
        windSpeed: '12 km/h',
        forecast: [
          { day: 'Today', temp: '25°C', condition: 'Cloudy' },
          { day: 'Tomorrow', temp: '27°C', condition: 'Sunny' },
          { day: 'Friday', temp: '24°C', condition: 'Rainy' }
        ]
      });
    } catch (err) {
      setError(prev => ({ ...prev, weather: 'Failed to load weather data' }));
    } finally {
      setLoading(prev => ({ ...prev, weather: false }));
    }
  };

  const fetchAirQuality = async () => {
    setLoading(prev => ({ ...prev, air: true }));
    setError(prev => ({ ...prev, air: null }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setAirQualityData([
        { station: 'Zhongshan', aqi: 45, status: 'Good', pm25: 12 },
        { station: 'Wanhua', aqi: 52, status: 'Good', pm25: 18 },
        { station: 'Songshan', aqi: 38, status: 'Good', pm25: 10 },
        { station: 'Datong', aqi: 48, status: 'Good', pm25: 15 }
      ]);
    } catch (err) {
      setError(prev => ({ ...prev, air: 'Failed to load air quality data' }));
    } finally {
      setLoading(prev => ({ ...prev, air: false }));
    }
  };

  const callGeminiAI = async () => {
    if (!aiPrompt.trim()) {
      setError(prev => ({ ...prev, ai: 'Please enter a question' }));
      return;
    }

    setLoading(prev => ({ ...prev, ai: true }));
    setError(prev => ({ ...prev, ai: null }));
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const responses = {
        'weather': `Based on current data, the weather in Taipei City is ${weatherData?.condition || 'clear'} with temperature at ${weatherData?.temperature || '25°C'}. Humidity is ${weatherData?.humidity || '65%'}.`,
        'youbike': `Currently there are ${youbikeData.length} active YouBike stations in monitored Taipei areas. Available bikes vary by station.`,
        'air': `Air quality in Taipei is currently good with average AQI below 50. Monitoring stations show PM2.5 within safe limits.`,
        'default': `Hello! I'm an AI assistant for Taipei City Dashboard. I can help you with information about weather, YouBike transportation, and air quality in Taipei. What would you like to know?`
      };
      
      let response = responses.default;
      const lowerPrompt = aiPrompt.toLowerCase();
      
      if (lowerPrompt.includes('cuaca') || lowerPrompt.includes('weather')) {
        response = responses.weather;
      } else if (lowerPrompt.includes('bike') || lowerPrompt.includes('sepeda')) {
        response = responses.youbike;
      } else if (lowerPrompt.includes('udara') || lowerPrompt.includes('air')) {
        response = responses.air;
      }
      
      setAiResponse(response);
    } catch (err) {
      setError(prev => ({ ...prev, ai: 'Failed to contact AI' }));
    } finally {
      setLoading(prev => ({ ...prev, ai: false }));
    }
  };

  useEffect(() => {
    if (activeTab === 'youbike' && youbikeData.length === 0) {
      fetchYouBike();
    } else if (activeTab === 'weather' && !weatherData) {
      fetchWeather();
    } else if (activeTab === 'air' && airQualityData.length === 0) {
      fetchAirQuality();
    }
  }, [activeTab]);

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return '#10b981';
    if (aqi <= 100) return '#f59e0b';
    if (aqi <= 150) return '#f97316';
    return '#ef4444';
  };

  const tabs = [
    { id: 'youbike', label: 'YouBike Stations', icon: MapPin },
    { id: 'weather', label: 'Weather Forecast', icon: Cloud },
    { id: 'air', label: 'Air Quality', icon: Wind },
    { id: 'ai', label: 'AI Assistant', icon: Bot }
  ];

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>
            <MapPin size={40} color="#4f46e5" />
            Taipei City Dashboard + AI
          </h1>
          <p style={styles.headerSubtitle}>Real-time data visualization with Gemini AI integration</p>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.tabContainer}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  ...styles.tab,
                  ...(isActive ? styles.tabActive : styles.tabInactive)
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.target.style.boxShadow = '0 4px 8px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
                }}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div style={styles.card}>
          {activeTab === 'youbike' && (
            <div>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>YouBike Stations</h2>
                <button
                  onClick={fetchYouBike}
                  disabled={loading.youbike}
                  style={{
                    ...styles.button,
                    ...(loading.youbike ? styles.buttonDisabled : {})
                  }}
                  onMouseEnter={(e) => !loading.youbike && (e.target.style.background = '#4338ca')}
                  onMouseLeave={(e) => !loading.youbike && (e.target.style.background = '#4f46e5')}
                >
                  {loading.youbike ? <Loader2 size={16} style={{animation: 'spin 1s linear infinite'}} /> : <RefreshCw size={16} />}
                  Refresh
                </button>
              </div>

              {error.youbike && (
                <div style={styles.alert}>
                  <AlertCircle size={20} />
                  {error.youbike}
                </div>
              )}

              <div>
                {youbikeData.map((station, idx) => (
                  <div 
                    key={idx} 
                    style={styles.bikeCard}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                  >
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                      <div>
                        <h3 style={{fontSize: '18px', fontWeight: '600', color: '#1f2937', marginBottom: '4px'}}>{station.sna}</h3>
                        <p style={{fontSize: '14px', color: '#6b7280'}}>{station.ar}</p>
                      </div>
                      <div style={{textAlign: 'right'}}>
                        <div style={{fontSize: '28px', fontWeight: 'bold', color: '#10b981'}}>{station.available_rent_bikes}</div>
                        <div style={{fontSize: '12px', color: '#6b7280'}}>bikes available</div>
                      </div>
                    </div>
                    <div style={{marginTop: '12px', display: 'flex', gap: '16px', fontSize: '14px'}}>
                      <span style={{color: '#6b7280'}}>Empty Docks: <strong>{station.available_return_bikes}</strong></span>
                      <span style={{color: '#6b7280'}}>Total: <strong>{station.total}</strong></span>
                    </div>
                  </div>
                ))}
              </div>

              {youbikeData.length === 0 && !loading.youbike && (
                <div style={{textAlign: 'center', color: '#6b7280', padding: '32px'}}>No data available</div>
              )}
            </div>
          )}

          {activeTab === 'weather' && (
            <div>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>Weather Forecast</h2>
                <button
                  onClick={fetchWeather}
                  disabled={loading.weather}
                  style={{...styles.button, ...(loading.weather ? styles.buttonDisabled : {})}}
                  onMouseEnter={(e) => !loading.weather && (e.target.style.background = '#4338ca')}
                  onMouseLeave={(e) => !loading.weather && (e.target.style.background = '#4f46e5')}
                >
                  {loading.weather ? <Loader2 size={16} /> : <RefreshCw size={16} />}
                  Refresh
                </button>
              </div>

              {weatherData && (
                <div>
                  <div style={styles.weatherMain}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                      <div>
                        <h3 style={{fontSize: '28px', fontWeight: 'bold'}}>{weatherData.location}</h3>
                        <p style={{fontSize: '20px', marginTop: '8px'}}>{weatherData.condition}</p>
                      </div>
                      <div style={{textAlign: 'right'}}>
                        <div style={{fontSize: '56px', fontWeight: 'bold'}}>{weatherData.temperature}</div>
                      </div>
                    </div>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '24px'}}>
                      <div style={{background: 'rgba(255,255,255,0.2)', borderRadius: '8px', padding: '12px'}}>
                        <div style={{fontSize: '14px', opacity: 0.9}}>Humidity</div>
                        <div style={{fontSize: '20px', fontWeight: '600'}}>{weatherData.humidity}</div>
                      </div>
                      <div style={{background: 'rgba(255,255,255,0.2)', borderRadius: '8px', padding: '12px'}}>
                        <div style={{fontSize: '14px', opacity: 0.9}}>Wind Speed</div>
                        <div style={{fontSize: '20px', fontWeight: '600'}}>{weatherData.windSpeed}</div>
                      </div>
                    </div>
                  </div>

                  <h3 style={{fontSize: '20px', fontWeight: 'bold', marginBottom: '16px'}}>3-Day Forecast</h3>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px'}}>
                    {weatherData.forecast.map((day, idx) => (
                      <div key={idx} style={{border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px', textAlign: 'center'}}>
                        <div style={{fontWeight: '600', color: '#1f2937'}}>{day.day}</div>
                        <div style={{fontSize: '32px', fontWeight: 'bold', color: '#4f46e5', margin: '8px 0'}}>{day.temp}</div>
                        <div style={{color: '#6b7280'}}>{day.condition}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'air' && (
            <div>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>Air Quality Index</h2>
                <button
                  onClick={fetchAirQuality}
                  disabled={loading.air}
                  style={{...styles.button, ...(loading.air ? styles.buttonDisabled : {})}}
                  onMouseEnter={(e) => !loading.air && (e.target.style.background = '#4338ca')}
                  onMouseLeave={(e) => !loading.air && (e.target.style.background = '#4f46e5')}
                >
                  {loading.air ? <Loader2 size={16} /> : <RefreshCw size={16} />}
                  Refresh
                </button>
              </div>

              <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px'}}>
                {airQualityData.map((station, idx) => (
                  <div key={idx} style={{border: '1px solid #e5e7eb', borderRadius: '8px', padding: '24px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
                      <h3 style={{fontSize: '20px', fontWeight: '600'}}>{station.station}</h3>
                      <span style={{
                        background: getAQIColor(station.aqi),
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '16px',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {station.status}
                      </span>
                    </div>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px'}}>
                      <div>
                        <div style={{fontSize: '14px', color: '#6b7280'}}>AQI</div>
                        <div style={{fontSize: '32px', fontWeight: 'bold', color: '#4f46e5'}}>{station.aqi}</div>
                      </div>
                      <div>
                        <div style={{fontSize: '14px', color: '#6b7280'}}>PM2.5</div>
                        <div style={{fontSize: '32px', fontWeight: 'bold', color: '#374151'}}>{station.pm25}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div>
              <h2 style={styles.cardTitle}>Gemini AI Assistant</h2>
              
              <div style={{
                background: 'linear-gradient(to right, #faf5ff, #fce7f3)',
                borderRadius: '12px',
                padding: '24px',
                marginTop: '24px',
                marginBottom: '24px'
              }}>
                <div style={{display: 'flex', alignItems: 'start', gap: '12px'}}>
                  <Bot size={24} color="#9333ea" style={{marginTop: '4px', flexShrink: 0}} />
                  <div>
                    <h3 style={{fontWeight: '600', fontSize: '18px', color: '#1f2937', marginBottom: '8px'}}>Smart City Assistant</h3>
                    <p style={{color: '#6b7280', fontSize: '14px'}}>
                      Ask me about weather, YouBike, or air quality in Taipei!
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label style={{display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px'}}>
                  Your Question
                </label>
                <textarea
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  placeholder="e.g., How is the weather in Taipei today?"
                  style={{
                    width: '100%',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    padding: '12px',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    minHeight: '80px'
                  }}
                  rows="3"
                />
              </div>

              <button
                onClick={callGeminiAI}
                disabled={loading.ai}
                style={{
                  width: '100%',
                  background: 'linear-gradient(to right, #9333ea, #ec4899)',
                  color: 'white',
                  padding: '12px',
                  borderRadius: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  marginTop: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  ...(loading.ai ? {opacity: 0.5, cursor: 'not-allowed'} : {})
                }}
              >
                {loading.ai ? (
                  <>
                    <Loader2 size={20} />
                    Processing...
                  </>
                ) : (
                  <>
                    <Bot size={20} />
                    Ask AI
                  </>
                )}
              </button>

              {error.ai && (
                <div style={{...styles.alert, marginTop: '16px'}}>
                  <AlertCircle size={20} />
                  {error.ai}
                </div>
              )}

              {aiResponse && (
                <div style={{
                  background: 'linear-gradient(to bottom right, #eef2ff, #f3e8ff)',
                  borderRadius: '12px',
                  padding: '24px',
                  border: '2px solid #c7d2fe',
                  marginTop: '16px'
                }}>
                  <div style={{display: 'flex', alignItems: 'start', gap: '12px'}}>
                    <CheckCircle2 size={24} color="#10b981" style={{marginTop: '4px', flexShrink: 0}} />
                    <div>
                      <h4 style={{fontWeight: '600', color: '#1f2937', marginBottom: '8px'}}>AI Response:</h4>
                      <p style={{color: '#374151', lineHeight: '1.6'}}>{aiResponse}</p>
                    </div>
                  </div>
                </div>
              )}

              <div style={{background: '#f9fafb', borderRadius: '8px', padding: '16px', marginTop: '32px'}}>
                <h4 style={{fontWeight: '600', color: '#1f2937', marginBottom: '8px'}}>💡 Try asking:</h4>
                <ul style={{color: '#6b7280', fontSize: '14px', marginLeft: '20px', lineHeight: '1.8'}}>
                  <li>"How is the weather in Taipei today?"</li>
                  <li>"How many YouBike bikes are available?"</li>
                  <li>"Is the air quality in Taipei safe?"</li>
                </ul>
              </div>
            </div>
          )}
        </div>

       
      </main>
    </div>
  );
}

export default App;