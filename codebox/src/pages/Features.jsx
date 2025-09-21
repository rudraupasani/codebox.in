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
  // Variants for a staggered entry animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <div
      id="new-features"
      className="relative min-h-screen bg-neutral-950 text-white flex flex-col items-center py-20 px-6 overflow-hidden"
    >
      {/* Subtle radial gradient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-[150px] animate-pulse-slow"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center max-w-7xl mx-auto"
      >
        {/* Title and Subtitle */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl font-extrabold mb-4 text-center tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500"
        >
          Next-Gen Features
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-gray-400 text-lg max-w-2xl text-center mb-16 font-light"
        >
          Unlock the future of coding with{" "}
          <span className="text-blue-400 font-semibold">Codebox AI</span> — built
          for developers, by developers.
        </motion.p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {newFeatures.map((f, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="p-8 bg-neutral-800/50 backdrop-blur-md rounded-3xl shadow-2xl border border-neutral-700 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="text-xl md:text-2xl font-semibold mb-2 text-white">{f.title}</h3>
              <p className="text-gray-400 font-light leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default NewFeatures;