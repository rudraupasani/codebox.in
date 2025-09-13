import React from "react";
import { motion } from "framer-motion";

// Main component for the website section
const App = () => {
  return (
    // Main container with a dark background and overflow hidden to contain the scrolling text
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center py-20">

      {/* First Scrolling Background Text Slider */}
      <div className="absolute top-1/3 left-0 w-full flex items-center justify-center overflow-hidden -rotate-3 z-0">
        <motion.div
          // Animate the text from left to right, creating a seamless loop
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            duration: 30, // Longer duration for a slower scroll
            repeat: Infinity,
            ease: "linear"
          }}
          className="text-[8rem] md:text-[10rem] font-black text-white/25 whitespace-nowrap"
        >
          {"CODEBOX.AI Students Favorite Ai - ".repeat(10)}
        </motion.div>
      </div>

      {/* Second Scrolling Background Text Slider */}
      <div className="absolute top-2/3 left-0 w-full flex items-center justify-center overflow-hidden rotate-3 z-0">
        <motion.div
          // Animate the text from right to left, creating a seamless loop
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            duration: 30, // Longer duration for a slower scroll
            repeat: Infinity,
            ease: "linear"
          }}
          className="text-[8rem] md:text-[10rem] font-black text-white/25 whitespace-nowrap"
        >
          {"CODEBOX.AI Students Favorite Ai - ".repeat(10)}
        </motion.div>
      </div>

      {/* Main Content Area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative z-10 py-20 px-6 max-w-7xl mx-auto"
      >
        <div className="space-y-16">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="text-center space-y-4"
          >
            <span className="inline-block px-4 py-2 bg-blue-600/20 rounded-full text-blue-300 text-sm font-medium">
              How It Works
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white">
              One Prompt, Multiple Perspectives
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Compare how different AI models respond to the same prompt and
              discover which one works best for your specific needs.
            </p>
          </motion.div>

          {/* Clean Image Showcase */}
          <div className="relative w-full flex justify-center">
            <motion.img
              // Using a placeholder image with a transparent background
              src="image1.png"
              alt="How it works illustration"
              className="max-w-4xl w-full rounded-2xl shadow-xl object-contain bg-transparent"
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      </motion.div>
      
    </div>
  );
};

export default App;
