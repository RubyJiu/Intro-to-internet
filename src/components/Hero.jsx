import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="pt-32 pb-20 px-6 min-h-screen flex items-center">
      <div className="container mx-auto text-center">
        <div className="animate-fade-in">
          {/* Avatar */}
          <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white text-4xl font-bold shadow-2xl hover:scale-110 transition-transform duration-300">
            JD
          </div>

          {/* Name */}
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-slide-in-left">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              RubyJiu
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-4 animate-slide-in-right">
            Full Stack Developer & AI Enthusiast
          </p>

          <p className="text-base md:text-lg text-gray-500 dark:text-gray-500 mb-8 max-w-2xl mx-auto">
            Crafting beautiful, functional web experiences with modern technologies. 
            Passionate about React, AI integration, and creating intuitive user interfaces.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in">
            <a
              href="#contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-medium"
            >
              Get In Touch
            </a>
            <a
              href="#projects"
              className="border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-8 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 font-medium"
            >
              View Projects
            </a>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 animate-bounce">
            <svg
              className="w-6 h-6 mx-auto text-gray-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;