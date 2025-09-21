import React from "react";
import { motion } from "framer-motion";

// Main component for the website section
const App = () => {
  // Variants for staggered entry animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    // Main container with a dark background and overflow hidden to contain the scrolling text
    <div className="relative min-h-screen bg-neutral-950 overflow-hidden flex flex-col items-center justify-center py-20 px-4">

      {/* First Scrolling Background Text Slider - Rotated and scaled for a dynamic effect */}
      <div className="absolute top-[25%] left-0 w-full flex items-center justify-center overflow-hidden -rotate-3 z-0 scale-[1.3]">
        <motion.div
          // Animate the text from left to right, creating a seamless loop
          animate={{ x: ["-100%", "0%"] }}
          transition={{
            duration: 40, // Slower duration for a more subtle scroll
            repeat: Infinity,
            ease: "linear",
          }}
          className="text-[8rem] md:text-[10rem] font-black text-white/10 whitespace-nowrap"
        >
          {"CODEBOX.AI STUDENTS FAVORITE AI - ".repeat(10)}
        </motion.div>
      </div>

      {/* Second Scrolling Background Text Slider - Rotated and scaled in the opposite direction */}
      <div className="absolute top-[65%] left-0 w-full flex items-center justify-center overflow-hidden rotate-3 z-0 scale-[1.3]">
        <motion.div
          // Animate the text from right to left, creating a seamless loop
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            duration: 40, // Slower duration for a more subtle scroll
            repeat: Infinity,
            ease: "linear",
          }}
          className="text-[8rem] md:text-[10rem] font-black text-white/10 whitespace-nowrap"
        >
          {"AI-DRIVEN PRODUCTIVITY - BUILD FASTER - ".repeat(10)}
        </motion.div>
      </div>

      {/* Main Content Area */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 py-20 px-6 max-w-7xl mx-auto"
      >
        <div className="space-y-16">
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center space-y-4"
          >
            <span className="inline-block px-4 py-2 bg-blue-600/20 rounded-full text-blue-300 text-sm font-medium backdrop-blur-sm shadow-md border border-blue-500/30">
              How It Works
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
              One Prompt, Multiple Perspectives
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              Experience the power of multiple AI models responding to a single prompt.
              Compare and contrast their output to find the perfect solution for your needs.
            </p>
          </motion.div>

          {/* Clean Image Showcase - Replaced with a placeholder div with a gradient
              and animation for a more modern, consistent look */}
          <motion.div
            variants={itemVariants}
            className="relative w-full flex justify-center mt-12"
          >
            <div
              className="max-w-4xl w-full h-[300px] md:h-[400px] rounded-3xl shadow-2xl overflow-hidden
                         bg-gradient-to-br from-blue-600/20 to-indigo-700/20 border border-neutral-700 backdrop-blur-sm flex items-center justify-center p-8"
            >
              <h3 className="text-white/40 text-lg font-light text-center">
                Your app screenshot would go here
              </h3>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default App;