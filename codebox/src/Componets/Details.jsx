// Modern Navbar Component for CODEBOX.AI
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
            <motion.span
              className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium"
            >
              How It Works
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              One Prompt, Multiple Perspectives
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Compare how different AI models respond to the same prompt and discover which one works best for your specific needs.
            </p>
          </motion.div>

          {/* Process Steps */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.2 }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {[
              {
                step: "01",
                title: "Enter Your Prompt",
                description: "Type your question, request, or prompt once",
                icon: "✍️",
                color: "from-blue-500 to-cyan-500"
              },
              {
                step: "02",
                title: "AI Models Process",
                description: "Multiple AI models generate responses simultaneously",
                icon: "🧠",
                color: "from-purple-500 to-pink-500"
              },
              {
                step: "03",
                title: "Compare Results",
                description: "View all responses side-by-side and choose the best one",
                icon: "⚖️",
                color: "from-green-500 to-emerald-500"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.4 + (index * 0.2) }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 h-full hover:border-blue-500/50 transition-all duration-300">
                  <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {step.icon}
                  </div>
                  <div className="text-sm font-bold text-blue-400 mb-2">STEP {step.step}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>

                {/* Connecting Line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-gray-600 to-transparent"></div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Interactive Demo Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.8 }}
            className="bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl"
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">Live Comparison Example</h3>
              <p className="text-gray-400">See how different AI models respond to the same prompt</p>
            </div>

            {/* Mock Prompt Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 3 }}
              className="bg-gray-800/60 border border-gray-600 rounded-xl p-4 mb-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-400">Sample Prompt</span>
              </div>
              <p className="text-white">
                "Explain quantum computing in simple terms for a beginner"
              </p>
            </motion.div>

            {/* Mock AI Responses Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  model: "Claude",
                  provider: "Anthropic",
                  color: "from-orange-500 to-red-500",
                  response: "Quantum computing is like having a coin that can be heads, tails, or spinning in the air all at once..."
                },
                {
                  model: "ChatGPT",
                  provider: "OpenAI",
                  color: "from-green-500 to-emerald-500",
                  response: "Think of quantum computing as a revolutionary way of processing information using the strange behavior of tiny particles..."
                },
                {
                  model: "Gemini",
                  provider: "Google",
                  color: "from-blue-500 to-cyan-500",
                  response: "Quantum computing leverages quantum mechanics principles to solve complex problems exponentially faster..."
                }
              ].map((ai, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 3.2 + (index * 0.1) }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-800/40 border border-gray-600/50 rounded-xl p-5 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 bg-gradient-to-r ${ai.color} rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                      {ai.model.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">{ai.model}</div>
                      <div className="text-gray-400 text-xs">{ai.provider}</div>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {ai.response}
                  </p>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, delay: 3.5 + (index * 0.3) }}
                    className="mt-4 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3.5 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: "⚡",
                title: "Lightning Fast",
                description: "Get responses from all AI models in under 3 seconds",
                color: "from-yellow-500 to-orange-500"
              },
              {
                icon: "🔒",
                title: "Secure & Private",
                description: "Your prompts are processed securely and never stored",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: "📊",
                title: "Quality Scoring",
                description: "AI-powered quality metrics for each response",
                color: "from-blue-500 to-purple-500"
              },
              {
                icon: "💾",
                title: "Export Results",
                description: "Save and export comparison results for later use",
                color: "from-purple-500 to-pink-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 3.7 + (index * 0.1) }}
                whileHover={{ scale: 1.05 }}
                className="text-center group"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h4 className="font-bold text-white text-lg mb-2">{feature.title}</h4>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default Details;