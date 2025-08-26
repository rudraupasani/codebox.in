// Modern Navbar Component for CODEBOX.AI
import React from "react";
import { motion } from "framer-motion";

const Details = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="relative py-20 px-6 overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                radial-gradient(circle at 20% 20%, rgba(59,130,246,0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(147,51,234,0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 60%, rgba(236,72,153,0.2) 0%, transparent 50%)
              `,
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto space-y-16">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="text-center space-y-4"
          >
            <motion.span className="inline-block px-4 py-2 bg-blue-600/10 backdrop-blur-sm border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium">
              How It Works
            </motion.span>
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
              src="image1.png"
              alt="How it works illustration"
              className="max-w-4xl w-full rounded-2xl shadow-xl object-contain"
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

export default Details;
