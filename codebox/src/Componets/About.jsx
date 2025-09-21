import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";

const About = () => {
  // Animation variants for staggered, elegant entry
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // This staggers animations for direct children
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <>
      <Navbar /> {/* Assuming Navbar is needed on this page */}
      <motion.div
        id="about"
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-col justify-center items-center min-h-screen w-full bg-neutral-950 p-6 sm:p-12 md:p-20 pt-28 gap-12 sm:gap-16 relative overflow-hidden"
      >
        {/* Subtle background gradient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[150px] animate-pulse-slow"></div>

        {/* Small Tagline */}
        <motion.span
          variants={itemVariants}
          className="px-4 py-1 text-sm font-medium rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 backdrop-blur-sm shadow-md"
        >
          🚀 Empowering Developers with AI
        </motion.span>

        {/* Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-white text-4xl md:text-6xl font-extrabold tracking-wide text-center max-w-5xl leading-tight"
        >
          Unleash Your Potential with <span className="text-blue-500">CodeBox AI</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-gray-400 text-lg md:text-xl text-center max-w-4xl leading-relaxed font-light"
        >
          CodeBox AI is more than just a tool; it's your intelligent coding partner. We provide **AI-driven solutions** that streamline workflows, reduce repetitive tasks, and help you innovate at the speed of thought. Our mission is to enhance human creativity by building the future of development, **together**.
        </motion.p>

        {/* Core Values Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mt-8"
        >
          {[
            {
              title: "Our Vision",
              text: "To make AI an indispensable companion for developers worldwide, seamlessly blending creativity and efficiency.",
            },
            {
              title: "Our Mission",
              text: "To build cutting-edge AI tools that automate tedious tasks, allowing developers to focus on the projects they love.",
            },
            {
              title: "Our Values",
              text: "We champion innovation, trust, and speed, ensuring our AI amplifies human potential without replacing it.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-neutral-800/50 p-6 rounded-3xl shadow-2xl border border-neutral-700 backdrop-blur-md hover:border-blue-500/50 transition-all duration-300"
            >
              <h2 className="text-white text-2xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-400 font-light">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl text-center mt-12"
        >
          {[
            { number: "1K+", label: "Code Snippets Generated" },
            { number: "100+", label: "Happy Developers" },
            { number: "15+", label: "Integrated Languages" },
            { number: "24/7", label: "AI Assistance" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-neutral-800/40 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-neutral-700"
            >
              <h3 className="text-blue-400 text-4xl font-extrabold">{stat.number}</h3>
              <p className="text-gray-400 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-4xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 rounded-3xl shadow-xl text-center mt-12"
        >
          <h2 className="text-white text-2xl md:text-3xl font-bold">
            Ready to supercharge your coding?
          </h2>
          <p className="text-blue-100 font-light mt-2">
            Start a chat with CodeBox AI today and redefine your workflow.
          </p>
          <button className="mt-6 px-8 py-3 bg-white text-blue-600 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-transform hover:scale-105">
            Get Started
          </button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default About;