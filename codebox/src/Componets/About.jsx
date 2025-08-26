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
        className="flex flex-col justify-start items-center min-h-screen w-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black p-6 gap-16 pt-32"
      >
        {/* Heading */}
        <motion.h1
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-white text-4xl md:text-5xl font-extrabold tracking-wide text-center"
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
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800/60 p-6 rounded-2xl shadow-xl backdrop-blur-md hover:shadow-blue-500/20 transition"
          >
            <h2 className="text-white text-2xl font-semibold mb-2">Our Vision</h2>
            <p className="text-gray-400">
              To make AI the ultimate coding companion for developers worldwide,
              bridging creativity and efficiency.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800/60 p-6 rounded-2xl shadow-xl backdrop-blur-md hover:shadow-blue-500/20 transition"
          >
            <h2 className="text-white text-2xl font-semibold mb-2">Our Mission</h2>
            <p className="text-gray-400">
              To deliver AI-powered solutions that reduce repetitive tasks and
              free developers to focus on innovation.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800/60 p-6 rounded-2xl shadow-xl backdrop-blur-md hover:shadow-blue-500/20 transition"
          >
            <h2 className="text-white text-2xl font-semibold mb-2">Our Values</h2>
            <p className="text-gray-400">
              We value innovation, speed, and trust—ensuring AI enhances
              creativity without replacing the human touch.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
      <Footer />
    </>
  );
};

export default About;
