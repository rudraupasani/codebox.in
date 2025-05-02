import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Header & Navbar */}
      <motion.header
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 1.5 }}
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-2xl bg-white/1 text-white shadow-md"
      >
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="text-3xl font-extrabold tracking-wide">
            CODE<span className="text-blue-400">BOX</span>
          </div>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center space-x-8 font-medium">
            <li>
              <Link to="/" className="hover:text-blue-400 transition duration-300">Home</Link>
            </li>
            <li>
              <Link to="/chatbox" className="hover:text-blue-400 transition duration-300">Chatbox</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-400 transition duration-300">About</Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-400 transition duration-300">Contact</Link>
            </li>
            <li>
              <Link to="https://www.instagram.com/rudraupasani.in/" className="hover:text-blue-400 py-3 px-10 rounded-xl bg-gray-900 text-white transition duration-300">Join US</Link>
            </li>
          </ul>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Dropdown */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 , autoReverse: true }}
          className="z-10 absolute top-16 left-0 w-full bg-white/10 text-white shadow-md p-4 md:hidden backdrop-blur-md"
        >
          <ul className="flex flex-col items-center space-y-4 font-medium">
            <li>
              <Link to="/"  className="hover:text-blue-400 transition">Home</Link>
            </li>
            <li>
              <Link to="/chatbox" className="hover:text-blue-400 transition">Chatbox</Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-blue-400 transition">About</Link>
            </li>
            <li>
              <Link to="/contact"  className="hover:text-blue-400 transition">Contact</Link>
            </li>
            <li>
              <Link to="/login"  className="hover:text-blue-400 transition">Join US</Link>
            </li>
          </ul>
        </motion.div>
      )}
    </>
  );
};

export default Navbar;
