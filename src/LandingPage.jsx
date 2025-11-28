import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Cloud,
  Sun,
  Moon,
  Droplets,
  Wind,
  Shirt,
  Briefcase,
  Sparkles,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function LandingPage() {
  const [darkMode, setDarkMode] = useState(() => {
    // Cek preferensi user dari localStorage
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    // Simpan preferensi ke localStorage
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    if (darkMode) {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    }
  }, [darkMode]);

  const features = [
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Real-time Weather",
      description: "Accurate weather data from OpenWeather API",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI Recommendations",
      description: "Smart outfit suggestions from Google Gemini",
    },
    {
      icon: <Shirt className="w-6 h-6" />,
      title: "Outfit Suggestions",
      description: "Outfit recommendations based on today's weather",
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Item Checklist",
      description: "List of items to bring",
    },
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Enter City",
      description:
        "Type the name of the city you want to check the weather for",
    },
    {
      step: "2",
      title: "Real-time Weather Data",
      description:
        "The system retrieves current weather data from OpenWeather API",
    },
    {
      step: "3",
      title: "AI Processing",
      description:
        "Gemini AI analyzes the weather conditions to provide the best recommendations",
    },
    {
      step: "4",
      title: "Get Recommendations",
      description:
        "Receive outfit suggestions along with items you should bring",
    },
  ];

  return (
    <div
      className={`min-h-screen transition-colors duration-300 w-full ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="bg-gradient-to-br from-purple-50 via-white to-purple-100 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900 text-gray-900 dark:text-white">
        {/* Navigation */}
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Cloud className="w-8 h-8 text-purple-700 dark:text-purple-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-700 to-purple-900 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
              WeatherWear
            </span>
          </div>

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
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-purple-100 dark:bg-purple-900/30 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-purple-700 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Powered by OpenWeather & Google Gemini
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Clear Weather,
              <br />
              <span className="bg-gradient-to-r from-purple-700 to-purple-900 dark:from-purple-400 dark:to-purple-600 bg-clip-text text-transparent">
                Perfect Outfit
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Get the perfect outfit recommendations based on real-time weather
              conditions with cutting-edge AI technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/app"
                className="group px-8 py-4 bg-gradient-to-r from-purple-700 to-purple-900 dark:from-purple-600 dark:to-purple-800 text-white rounded-xl font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <span className="text-white">Start Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-white" />
              </Link>

              <button className="px-8 py-4 bg-white dark:bg-gray-800 text-purple-700 dark:text-purple-400 rounded-xl font-semibold border-2 border-purple-200 dark:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="mt-16 relative">
            <div className="flex justify-center items-center space-x-8 opacity-20">
              <Cloud className="w-24 h-24 text-purple-400 animate-pulse" />
              <Sun
                className="w-20 h-20 text-yellow-400 animate-spin"
                style={{ animationDuration: "20s" }}
              />
              <Droplets className="w-16 h-16 text-blue-400 animate-bounce" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Features</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Advanced technology for the best experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-purple-100 dark:border-purple-900"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/50 rounded-xl flex items-center justify-center mb-4 text-purple-700 dark:text-purple-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-purple-900 dark:bg-purple-950 text-white py-20">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-purple-200 text-lg">
                Easy and fast in 4 steps
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold mb-4">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-purple-200">{item.description}</p>
                  </div>
                  {idx < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-purple-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">
              Technology Behind the Scenes
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-12">
              Powered by industry-leading APIs and AI
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 p-8 rounded-2xl border border-blue-200 dark:border-blue-800">
                <Cloud className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-blue-900 dark:text-blue-100">
                  OpenWeather API
                </h3>
                <p className="text-blue-700 dark:text-blue-300">
                  Accurate real-time weather data from around the world
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 p-8 rounded-2xl border border-purple-200 dark:border-purple-800">
                <Sparkles className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2 text-purple-900 dark:text-purple-100">
                  Google Gemini AI
                </h3>
                <p className="text-purple-700 dark:text-purple-300">
                  Smart outfit recommendations with the latest AI
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-6 py-20">
          <div className="bg-gradient-to-r from-purple-700 to-purple-900 dark:from-purple-800 dark:to-purple-950 rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Look Perfect?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Start getting outfit recommendations that match today's weather
            </p>
            <Link
              to="/app"
              className="group px-10 py-5 bg-white text-purple-700 rounded-xl font-bold text-lg hover:bg-purple-50 hover:scale-105 transition-all duration-300 flex items-center space-x-2 mx-auto shadow-xl"
            >
              <span className="text-purple-700">Try Now for Free</span>
              <ArrowRight className="w-5 h-5 text-purple-700 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-purple-200 dark:border-purple-900 py-12">
          <div className="container mx-auto px-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Cloud className="w-6 h-6 text-purple-700 dark:text-purple-400" />
              <span className="text-xl font-bold text-purple-700 dark:text-purple-400">
                WeatherWear
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              © 2025 WeatherWear. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
