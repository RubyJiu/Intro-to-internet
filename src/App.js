import React, { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Projects from "./components/Projects.jsx";
import AIChat from "./components/AIChat.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Check for saved theme preference or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      setDarkMode(true);
    }
  }, []);

  // Update theme when darkMode changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark" : ""
      } transition-colors duration-300`}
    >
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
        {/* Header/Navigation */}
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Main Sections */}
        <main>
          <Hero />
          <About />
          <Projects />
          <AIChat />
          <Contact />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

export default App;
