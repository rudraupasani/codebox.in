import React from "react";
import { motion } from "framer-motion";
import { Bot, Code, Layers, BrainCircuit, Globe, TerminalSquare } from "lucide-react";

const newFeatures = [
  {
    icon: <Bot className="w-8 h-8 text-indigo-400" />,
    title: "AI Pair Programmer",
    desc: "Collaborate with an AI that helps you write, refactor, and optimize your code in real-time.",
  },
  {
    icon: <TerminalSquare className="w-8 h-8 text-emerald-400" />,
    title: "Multi-Language Support",
    desc: "Seamlessly switch between JavaScript, Python, Java, C++, and more without setup hassles.",
  },
  {
    icon: <Layers className="w-8 h-8 text-amber-400" />,
    title: "Project Scaffolding",
    desc: "Generate complete boilerplates and architectures instantly for React, Node, and Next.js apps.",
  },
  {
    icon: <BrainCircuit className="w-8 h-8 text-pink-400" />,
    title: "Context-Aware Debugging",
    desc: "Automatically identify bugs and suggest fixes with smart context-based recommendations.",
  },
  {
    icon: <Globe className="w-8 h-8 text-sky-400" />,
    title: "Cloud Sync",
    desc: "Access your code, prompts, and history from anywhere with secure cloud synchronization.",
  },
  {
    icon: <Code className="w-8 h-8 text-violet-400" />,
    title: "One-Click Deploy",
    desc: "Push projects directly to platforms like Vercel, Netlify, or your custom server.",
  },
];

const NewFeatures = () => {
  return (
    <div
      id="new-features"
      className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white flex flex-col items-center py-20 px-6"
    >
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-300"
      >
        Next-Gen Features
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-gray-300 text-lg max-w-2xl text-center mb-16"
      >
        Unlock the future of coding with{" "}
        <span className="text-purple-400 font-semibold">Codebox AI</span> — built
        for developers, by developers.
      </motion.p>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
        {newFeatures.map((f, i) => (
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
  );
};

export default NewFeatures;
