import React from 'react';
import { Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#ai-chat', label: 'AI Chat' },
    { href: '#contact', label: 'Contact' }
  ];

  const socialLinks = [
    { icon: <Github size={20} />, url: 'https://github.com/yourusername', label: 'GitHub' },
    { icon: <Linkedin size={20} />, url: 'https://linkedin.com/in/yourprofile', label: 'LinkedIn' },
    { icon: <Mail size={20} />, url: 'mailto:your@email.com', label: 'Email' }
  ];

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 relative">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              MyPortfolio
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Building modern web experiences with passion and precision. 
              Specializing in React, AI integration, and full-stack development.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm flex items-center"
                  >
                    <span className="mr-2">→</span>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Built With</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                React 18
              </p>
              <p className="flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                Gemini AI API
              </p>
              <p className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                GitHub API
              </p>
              <p className="flex items-center">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                OpenWeather API
              </p>
              <p className="flex items-center">
                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                Tailwind CSS
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mb-6"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p className="mb-4 md:mb-0 flex items-center">
            © {currentYear} MyPortfolio. Made with{' '}
            <Heart size={14} className="mx-1 text-red-500 fill-current animate-pulse" />
            and React
          </p>
          
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/yourusername/my-portfolio-react"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              View Source Code
            </a>
            <span className="text-gray-600">|</span>
            <a
              href="#home"
              className="hover:text-blue-400 transition-colors duration-200"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </footer>
  );
};

export default Footer;