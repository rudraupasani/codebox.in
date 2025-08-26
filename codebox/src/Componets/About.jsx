import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "framer-motion";

const About = () => {
  return (
    <>
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col justify-start items-center min-h-screen w-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6 gap-20 pt-28"
      >
        {/* Small Tagline */}
        <motion.span
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="px-4 py-1 text-sm font-medium rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30"
        >
          🚀 Powered by AI Innovation
        </motion.span>

        {/* Heading */}
        <motion.h1
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white text-4xl md:text-6xl font-extrabold tracking-wide text-center"
        >
          About <span className="text-blue-500">CodeBox AI</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-gray-300 text-lg md:text-xl text-center max-w-4xl leading-relaxed"
        >
          CodeBox AI is your intelligent coding partner.  
          We empower developers, startups, and businesses with AI-driven tools 
          that accelerate productivity, simplify workflows, and spark innovation.  
          From generating high-quality code to providing smart insights, our mission 
          is to help you build the future faster and smarter.
        </motion.p>

        {/* Vision / Mission / Values */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="grid md:grid-cols-3 gap-8 w-full max-w-6xl"
        >
          {[
            {
              title: "Our Vision",
              text: "To make AI the ultimate coding companion for developers worldwide, bridging creativity and efficiency."
            },
            {
              title: "Our Mission",
              text: "To deliver AI-powered solutions that reduce repetitive tasks and free developers to focus on innovation."
            },
            {
              title: "Our Values",
              text: "We value innovation, speed, and trust—ensuring AI enhances creativity without replacing the human touch."
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-gray-800/60 p-6 rounded-2xl shadow-xl backdrop-blur-md hover:shadow-blue-500/20 transition"
            >
              <h2 className="text-white text-2xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-400">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        >
          {[
            { number: "1K+", label: "Code Snippets Generated" },
            { number: "100+", label: "Happy Developers" },
            { number: "100+", label: "Projects Boosted" },
            { number: "24/7", label: "AI Assistance" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.1 }}
              className="bg-gray-800/50 backdrop-blur-md p-4 rounded-xl shadow-md"
            >
              <h3 className="text-blue-400 text-3xl font-bold">{stat.number}</h3>
              <p className="text-gray-400 text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          whileHover={{ scale: 1.02 }}
          className="w-full max-w-4xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 rounded-2xl shadow-xl text-center"
        >
          <h2 className="text-white text-2xl md:text-3xl font-bold">
            Ready to supercharge your coding?
          </h2>
          <p className="text-blue-100 mt-2">
            Start using CodeBox AI today and experience the future of development.
          </p>
          <button className="mt-4 px-6 py-2 bg-white text-blue-600 font-semibold rounded-full shadow hover:bg-gray-100 transition">
            Get Started
          </button>
        </motion.div>
      </motion.div>
      <Footer />
    </>
  );
};

export default About;
