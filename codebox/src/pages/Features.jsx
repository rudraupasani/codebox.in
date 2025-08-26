"use client";
import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap, Shield, Code2, Cpu, Workflow } from "lucide-react";
import Footer from "../Componets/Footer";
import Navbar from "../Componets/Navbar";

const features = [
  {
    icon: <Zap className="w-8 h-8 text-blue-400" />,
    title: "Lightning Fast",
    desc: "Experience real-time responses powered by Gemini AI with no delays.",
  },
  {
    icon: <Shield className="w-8 h-8 text-green-400" />,
    title: "Secure & Reliable",
    desc: "Your data is protected with enterprise-grade security standards.",
  },
  {
    icon: <Code2 className="w-8 h-8 text-purple-400" />,
    title: "Code Understanding",
    desc: "Parse, explain, and debug code instantly across multiple languages.",
  },
  {
    icon: <Cpu className="w-8 h-8 text-pink-400" />,
    title: "Smart AI Engine",
    desc: "Built on advanced AI models for accurate and meaningful answers.",
  },
  {
    icon: <Workflow className="w-8 h-8 text-yellow-400" />,
    title: "Workflow Automation",
    desc: "Boost productivity with automated coding, docs, and testing.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-cyan-400" />,
    title: "Modern UI/UX",
    desc: "Enjoy a sleek, glassmorphic interface with smooth animations.",
  },
];

const Features = () => {
  return (
    <>
    <Navbar />
    <div className="min-h-screen mt-5 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white flex flex-col items-center py-20 px-6">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300"
      >
         Features
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-gray-300 text-lg max-w-2xl text-center mb-16"
      >
        Discover the powerful tools that make{" "}
        <span className="text-blue-400 font-semibold">Codebox AI</span> your
        perfect coding companion.
      </motion.p>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="p-6 bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-700 hover:scale-105 transition-transform duration-300"
          >
            <div className="mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-400">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Features;
