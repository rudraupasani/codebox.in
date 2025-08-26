import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-gray-300 pt-12 pb-6 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white">CODEBOX.AI</h2>
          <p className="mt-3 text-sm text-gray-400 leading-relaxed">
            Your AI-powered coding assistant.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link
            onClick={() => window.scrollTo(0, 0)}
            to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link
            onClick={() => window.scrollTo(0, 0)}
            to="/chatbox" className="hover:text-white transition">Chat</Link></li>
            <li><Link
            onClick={() => window.scrollTo(0, 0)}
            to="/features" className="hover:text-white transition">Features</Link></li>
            <li><Link
            onClick={() => window.scrollTo(0, 0)}
            to="/contact" className="hover:text-white transition">API</Link></li>
            <li><Link
            onClick={() => window.scrollTo(0, 0)}
            to="/about" className="hover:text-white transition">About</Link></li>
          </ul>
        </div>

        {/* Newsletter + Social */}
        <div>
          <h3 className="text-white font-semibold mb-3">Stay Updated</h3>
          <p className="text-sm text-gray-400 mb-3">Subscribe to get the latest updates and AI insights.</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-3 py-2 w-full rounded-l-md bg-neutral-900 text-sm border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-r-md transition"
            >
              Subscribe
            </button>
          </form>
          <div className="flex space-x-4 mt-4">
            <a href="https://facebook.com/optivex" target="_blank" rel="noopener noreferrer"><Facebook className="w-5 h-5 hover:text-white transition" /></a>
            <a href="https://twitter.com/optivex" target="_blank" rel="noopener noreferrer"><Twitter className="w-5 h-5 hover:text-white transition" /></a>
            <a href="https://instagram.com/optivex" target="_blank" rel="noopener noreferrer"><Instagram className="w-5 h-5 hover:text-white transition" /></a>
            <a href="https://linkedin.com/company/optivex" target="_blank" rel="noopener noreferrer"><Linkedin className="w-5 h-5 hover:text-white transition" /></a>
            <a href="https://github.com/optivex" target="_blank" rel="noopener noreferrer"><Github className="w-5 h-5 hover:text-white transition" /></a>
            <a href="mailto:hello@optivex.tech"><Mail className="w-5 h-5 hover:text-white transition" /></a>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-10 text-center text-xs text-gray-500 border-t border-gray-800 pt-4">
        © {new Date().getFullYear()} CODEBOX.AI. All rights reserved.
        <span className="block mt-1">Built with ❤️ by <a className="text-blue-900 underline" href="">optivex.tech</a></span>
      </div>
    </footer>
  );
};

export default Footer;
