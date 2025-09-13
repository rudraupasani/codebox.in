// Modern Navbar Component for CODEBOX.AI
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      {/* Main Content with proper top padding for fixed navbar */}
      <div className="pt-24 px-4 pb-4 min-h-screen flex flex-col items-center justify-center">
        {/* Modern Hero Header Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative text-center py-16 px-6 overflow-hidden"
        >
          {/* Animated Grid Background */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px),
                  linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />

            {/* Floating Particles */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  scale: [0.5, 1, 0.5],
                  x: [0, Math.sin(i) * 100, 0],
                  y: [0, Math.cos(i) * 80, 0]
                }}
                transition={{
                  duration: 6 + i,
                  repeat: Infinity,
                  delay: i * 0.7,
                  ease: "easeInOut"
                }}
                className={`absolute w-24 h-24 rounded-full ${i % 4 === 0 ? 'bg-blue-500/20' :
                  i % 4 === 1 ? 'bg-purple-500/20' :
                    i % 4 === 2 ? 'bg-pink-500/20' : 'bg-cyan-500/20'
                  } blur-lg`}
                style={{
                  left: `${10 + (i * 10)}%`,
                  top: `${15 + (i * 7)}%`,
                }}
              />
            ))}
          </div>

          {/* Main Content */}
          <div className="relative z-10 space-y-8 max-w-6xl mx-auto">
            {/* Main Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-2 leading-tight text-white">
                <motion.span
                  className="block"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Build Smarter
                </motion.span>
                <motion.span
                  className="block text-blue-400"
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  With CODEBOX.AI
                </motion.span>
              </h1>
            </motion.div>

            {/* Enhanced Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="space-y-6"
            >
              <p className="text-md md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Transform your development workflow with intelligent code assistance,
                real-time collaboration, and <span className="text-blue-400 font-semibold">next-generation AI tools</span>.
              </p>
            </motion.div>
            {/* Enhanced CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex flex-col lg:flex-row gap-6 justify-center items-center mt-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigate("/chatbox");
                }}
                className="px-8 py-3 bg-purple-600/50 cursor-pointer border-2 border-purple-600/50 text-purple-300 hover:text-white hover:border-purple-400 font-bold rounded-2xl text-lg transition-all duration-300"
              >
                Try Demo
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="w-full flex items-center justify-center text-center p-2 md:p-2 md:max-w-xl lg:p-2 lg:max-w-4xl border-2 border-gray-700 rounded-xl shadow-xl bg-gray-900 relative overflow-hidden"
          animate={{ y: [0, -20, 0] }} // smooth floating animation
          transition={{ duration: 4, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
        >
          <img
            className="w-full  h-auto object-contain"
            src="screen.png"
            alt="Floating illustration"
          />
        </motion.div>
      </div>

    </div>
  );
};

export default Home;
