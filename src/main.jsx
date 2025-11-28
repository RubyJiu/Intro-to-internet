import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage.jsx'
import WeatherWearApp from './WeatherWearApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<WeatherWearApp />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
