import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, CheckCircle } from "lucide-react";

const Footer = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Simulate a successful subscription
    setIsSubscribed(true);
    setTimeout(() => {
      setIsSubscribed(false);
    }, 3000); // Reset the state after 3 seconds
  };

  return (
    <footer className="relative bg-neutral-950 text-gray-300 pt-16 pb-8 overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-t from-transparent to-neutral-900 pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand and Description */}
        <div className="flex flex-col items-start md:items-start">
          <h2 className="text-3xl font-extrabold text-white animate-fade-in-down">
            CODEBOX.AI
          </h2>
          <p className="mt-3 text-sm text-gray-400 max-w-sm leading-relaxed animate-fade-in delay-100">
            Your AI-powered coding assistant, designed to make development faster and more intuitive.
          </p>
        </div>

        {/* Quick Links */}
        <div className="md:justify-self-center">
          <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="text-gray-400 hover:text-blue-500 transition-colors duration-300 transform hover:translate-x-1 inline-block">Home</Link>
            </li>
            <li>
              <Link to="/chatbox" className="text-gray-400 hover:text-blue-500 transition-colors duration-300 transform hover:translate-x-1 inline-block">Chat</Link>
            </li>
            <li>
              <a href="#features" className="text-gray-400 hover:text-blue-500 transition-colors duration-300 transform hover:translate-x-1 inline-block">Features</a>
            </li>
            <li>
              <Link to="#about" className="text-gray-400 hover:text-blue-500 transition-colors duration-300 transform hover:translate-x-1 inline-block">About</Link>
            </li>
          </ul>
        </div>

        {/* Newsletter + Social */}
        <div className="md:justify-self-end">
          <h3 className="text-white font-semibold mb-4 text-lg">Stay Updated</h3>
          <p className="text-sm text-gray-400 mb-4">Subscribe for the latest AI insights and product updates.</p>
          <form className="flex items-center space-x-2" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 w-full rounded-md bg-neutral-800 text-sm border border-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300"
            />
            <button
              type="submit"
              className={`px-6 py-2 rounded-md transition-all duration-300 ${
                isSubscribed
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isSubscribed ? <CheckCircle className="w-5 h-5" /> : "Subscribe"}
            </button>
          </form>

          <div className="flex space-x-5 mt-6">
            <a href="https://facebook.com/optivex" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-transform duration-300 hover:scale-110">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="https://twitter.com/optivex" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-transform duration-300 hover:scale-110">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="https://instagram.com/optivex" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-transform duration-300 hover:scale-110">
              <Instagram className="w-6 h-6" />
            </a>
            <a href="https://linkedin.com/company/optivex" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-transform duration-300 hover:scale-110">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:hello@rudraupasani7@gmail.com" className="text-gray-400 hover:text-blue-500 transition-transform duration-300 hover:scale-110">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Note and Copyright */}
      <div className="mt-14 text-center text-xs text-gray-500 border-t border-gray-800 pt-6">
        <p className="tracking-wide">
          © {new Date().getFullYear()} CODEBOX.AI. All rights reserved.
        </p>
        <span className="block mt-1">
          Built with <span className="text-red-500">❤️</span> by{" "}
          <a
            className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
            href="https://optivex.tech"
            target="_blank"
            rel="noopener noreferrer"
          >
            optivex.tech
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;